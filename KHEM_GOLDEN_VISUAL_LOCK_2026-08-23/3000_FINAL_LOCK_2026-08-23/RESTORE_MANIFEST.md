# Restore Manifest

State: **CURRENT VERIFIED 3000 - FINAL KHEM LOCK**
Captured: 2026-08-23
Git HEAD: 19026e1fe085b8cfbf62bbe4bcc4184f91d7a553

## Restore payload

- HEAD.bundle: Git object restore source for the captured HEAD.
- WORKTREE_FILES.tar.gz: exact snapshot of 349 present tracked files plus 18 relevant untracked files.
- RESTORE_FILES.txt: complete archive member inventory.
- DELETED_TRACKED_FILES.txt: 50 HEAD-tracked paths absent in the locked state; they must remain absent when restoring.
- WORKTREE.patch: binary-capable tracked working-tree delta for audit/replay.
- INDEX.patch: staged delta; empty when no staged changes exist.
- FILE_HASHES.sha256: SHA-256 for every archived working file, including routes, components, assets, and config.
- PAYLOAD_HASHES.sha256: integrity hashes for restore artifacts and lock evidence.

## Exact restoration procedure

1. Restore Git HEAD 19026e1fe085b8cfbf62bbe4bcc4184f91d7a553 from the repository or HEAD.bundle.
2. Extract WORKTREE_FILES.tar.gz at the repository root, preserving relative paths.
3. Ensure every path in DELETED_TRACKED_FILES.txt is absent.
4. Do not restore excluded dependency/cache material under untracked review/ or tools/; it is not required by the live implementation.
5. Verify all entries against FILE_HASHES.sha256.
6. Run npx tsc --noEmit and npm run build in apps/web, then verify localhost:3000.

## Scope captured

Tracked files, all live runtime sources, routes/navigation, Hero 1-5 components/data/assets, Explore, Core Services, inner/child pages, shared KHEM shell, Q&A/Knowledge boundaries, configuration, relevant backend source, and 18 non-cache untracked implementation/reference files.