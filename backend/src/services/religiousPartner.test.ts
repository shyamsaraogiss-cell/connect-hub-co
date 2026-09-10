import assert from "node:assert/strict";
import test from "node:test";
import { prisma } from "../lib/prisma";
import * as controller from "../controllers/religiousPartner.controller";
import * as service from "./religiousPartner.service";

const partner = { id: "profile-1", fullName: "Applicant", category: "Purohit", mobile: "9999999999", userId: null };

function prismaError(code: string) {
  const error = new Error(`Prisma ${code}`);
  error.name = "PrismaClientKnownRequestError";
  return Object.assign(error, { code, clientVersion: "test" });
}

function responseDouble() {
  const state = { status: 200, body: undefined as any };
  const response = { status(code: number) { state.status = code; return response; }, json(body: unknown) { state.body = body; return response; } };
  return { response: response as any, state };
}

function request(body: any = {}, id = "profile-1") { return { body, params: { id } } as any; }

async function replace<T extends object, K extends keyof T>(object: T, key: K, value: T[K], action: () => Promise<void>) {
  const original = object[key]; object[key] = value;
  try { await action(); } finally { object[key] = original; }
}

test("public registration accepts applicant fields and forces management defaults", { concurrency: false }, async () => {
  await replace(prisma.religiousPartner, "create", (async ({ data }: any) => {
    assert.equal(data.identityVerified, false); assert.equal(data.status, "Pending"); assert.equal(data.remarks, undefined); return partner;
  }) as any, async () => {
    const { response, state } = responseDouble();
    await controller.createReligiousPartner(request({ fullName: "Applicant", category: "Purohit", mobile: "9999999999", city: "Gaya" }), response);
    assert.equal(state.status, 201);
  });
});

test("public registration rejects management-controlled and unknown fields", { concurrency: false }, async () => {
  for (const extra of [{ status: "Active" }, { identityVerified: true }, { unknown: "value" }]) {
    const { response, state } = responseDouble();
    await controller.createReligiousPartner(request({ fullName: "Applicant", category: "Purohit", mobile: "9999999999", ...extra }), response);
    assert.equal(state.status, 400);
  }
});

test("Founder/Admin list service returns partners", { concurrency: false }, async () => {
  await replace(prisma.religiousPartner, "findMany", (async () => [partner]) as any, async () => assert.deepEqual(await service.getReligiousPartners(), [partner]));
});

test("detail succeeds and controller maps missing partner to 404", { concurrency: false }, async () => {
  await replace(prisma.religiousPartner, "findUnique", (async () => partner) as any, async () => {
    const { response, state } = responseDouble(); await controller.getReligiousPartner(request(), response); assert.equal(state.body.data.id, partner.id);
  });
  await replace(prisma.religiousPartner, "findUnique", (async () => null) as any, async () => {
    const { response, state } = responseDouble(); await controller.getReligiousPartner(request(), response); assert.equal(state.status, 404);
  });
});

test("management update accepts allowlisted fields and rejects unknown fields", { concurrency: false }, async () => {
  await replace(prisma.religiousPartner, "update", (async ({ data }: any) => ({ ...partner, ...data })) as any, async () => {
    const { response, state } = responseDouble(); await controller.updateReligiousPartner(request({ status: "Active", remarks: "Approved" }), response); assert.equal(state.body.data.status, "Active");
  });
  const { response, state } = responseDouble(); await controller.updateReligiousPartner(request({ userId: "forbidden" }), response); assert.equal(state.status, 400);
});

test("update maps missing partner to 404", { concurrency: false }, async () => {
  await replace(prisma.religiousPartner, "update", (async () => { throw prismaError("P2025"); }) as any, async () => {
    const { response, state } = responseDouble(); await controller.updateReligiousPartner(request({ status: "Active" }), response); assert.equal(state.status, 404);
  });
});

test("link-user maps a Prisma uniqueness conflict to 409", { concurrency: false }, async () => {
  await linkFixture({ id: partner.id, userId: null }, { id: "user-1", role: "RELIGIOUS_PARTNER", isActive: true }, null, async () => {
    await replace(prisma.religiousPartner, "update", (async () => { throw prismaError("P2002"); }) as any, async () => {
      const { response, state } = responseDouble();
      await controller.linkReligiousPartnerUser(request({ userId: "user-1" }), response);
      assert.equal(state.status, 409);
    });
  });
});

test("unknown update errors are not translated as Prisma failures", { concurrency: false }, async () => {
  const unknownError = new Error("unexpected failure");
  await replace(prisma.religiousPartner, "update", (async () => { throw unknownError; }) as any, async () => {
    await replace(console, "error", (() => undefined) as any, async () => {
      const { response, state } = responseDouble();
      await controller.updateReligiousPartner(request({ status: "Active" }), response);
      assert.equal(state.status, 500);
      assert.equal(state.body.message, "Failed to update Verified Priest.");
    });
  });
});

test("deactivation keeps profile and account consistent in one transaction", { concurrency: false }, async () => {
  let profileUpdated = false; let userUpdated = false;
  await replace(prisma.religiousPartner, "findUnique", (async () => ({ id: partner.id, userId: "user-1" })) as any, async () => {
    await replace(prisma.universalRequest, "count", (async () => 0) as any, async () => {
      await replace(prisma, "$transaction", (async (callback: any) => callback({ religiousPartner: { update: async () => { profileUpdated = true; return partner; } }, user: { update: async () => { userUpdated = true; } } })) as any, async () => {
        await service.deactivateReligiousPartner(partner.id); assert.equal(profileUpdated && userUpdated, true);
      });
    });
  });
});

test("deactivation rejects active assignments before transaction", { concurrency: false }, async () => {
  await replace(prisma.religiousPartner, "findUnique", (async () => ({ id: partner.id, userId: "user-1" })) as any, async () => {
    await replace(prisma.universalRequest, "count", (async () => 1) as any, async () => {
      await assert.rejects(() => service.deactivateReligiousPartner(partner.id), /ACTIVE_ASSIGNMENTS_EXIST/);
    });
  });
});

async function linkFixture(profileValue: any, userValue: any, linkedValue: any, action: () => Promise<void>) {
  await replace(prisma.religiousPartner, "findUnique", (async ({ where }: any) => where.id ? profileValue : linkedValue) as any, async () => {
    await replace(prisma.user, "findUnique", (async () => userValue) as any, action);
  });
}

test("link-user succeeds for an active Religious Partner account", { concurrency: false }, async () => {
  await linkFixture({ id: partner.id, userId: null }, { id: "user-1", role: "RELIGIOUS_PARTNER", isActive: true }, null, async () => {
    await replace(prisma.religiousPartner, "update", (async ({ data }: any) => ({ ...partner, userId: data.userId })) as any, async () => assert.equal((await service.linkReligiousPartnerUser(partner.id, "user-1")).userId, "user-1"));
  });
});

test("link-user rejects nonexistent, wrong-role, and inactive users", { concurrency: false }, async () => {
  for (const user of [null, { id: "user-1", role: "CUSTOMER", isActive: true }, { id: "user-1", role: "RELIGIOUS_PARTNER", isActive: false }]) {
    await linkFixture({ id: partner.id, userId: null }, user, null, async () => await assert.rejects(() => service.linkReligiousPartnerUser(partner.id, "user-1")));
  }
});

test("link-user rejects already-linked user and partner conflicts", { concurrency: false }, async () => {
  const user = { id: "user-1", role: "RELIGIOUS_PARTNER", isActive: true };
  await linkFixture({ id: partner.id, userId: null }, user, { id: "other-profile" }, async () => await assert.rejects(() => service.linkReligiousPartnerUser(partner.id, "user-1"), /PARTNER_USER_ALREADY_LINKED/));
  await linkFixture({ id: partner.id, userId: "other-user" }, user, null, async () => await assert.rejects(() => service.linkReligiousPartnerUser(partner.id, "user-1"), /PARTNER_ALREADY_LINKED/));
});
