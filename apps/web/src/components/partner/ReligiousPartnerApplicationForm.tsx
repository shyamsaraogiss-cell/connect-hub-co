"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { createUniversalRequest } from "@/services/urms.api";
import { QuestionCircleIcon } from "@/features/public-shell/components/PublicHeroSidebar";

const inputClass = "mt-1 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-orange-600 disabled:bg-stone-100";
const sectionClass = "grid gap-4 rounded-2xl border border-stone-200 p-5";
const labelClass = "text-xs font-semibold uppercase tracking-wider text-stone-700";
const checkboxClass = "flex items-start gap-3 text-sm text-stone-700";
const serviceOptions = ["Ancestral Rites", "Vedic Puja / Homam", "Temple Services", "Life-Cycle Ceremonies", "Religious Guidance", "Online / Remote Ritual Services", "Other"] as const;

function ServiceChecklist({ name }: { name: string }) {
  return <div className="grid gap-3 rounded-xl border border-stone-200 bg-stone-50 p-4 sm:grid-cols-2">{serviceOptions.map((service) => <label className="flex items-center gap-2 text-sm text-stone-700" key={service}><input name={name} type="checkbox" value={service} />{service}</label>)}</div>;
}

export function ReligiousPartnerApplicationForm() {
  const [submissionPending, setSubmissionPending] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (data.getAll("serviceInterest").length === 0) {
      setValidationError("Select at least one service in Service Interest.");
      setSubmissionPending(false);
      return;
    }
    setValidationError(null);
    setSubmissionPending(true);
    try {
      const firstName = String(data.get("firstName") || "").trim();
      const middleName = String(data.get("middleName") || "").trim();
      const lastName = String(data.get("lastName") || "").trim();
      const applicationData: Record<string, string | string[]> = {};
      for (const [key, value] of data.entries()) {
        if (value instanceof File || key.endsWith("Document") || key === "profilePhotograph" || key === "institutionCredential" || key === "addressProof") continue;
        const text = String(value);
        const current = applicationData[key];
        applicationData[key] = current === undefined ? text : Array.isArray(current) ? [...current, text] : [current, text];
      }
      const record = await createUniversalRequest({
        requestType: "PARTNER_REGISTRATION",
        relatedService: "religious-partners",
        guestName: [firstName, middleName, lastName].filter(Boolean).join(" "),
        guestPhone: String(data.get("mobileNumber") || "").trim(),
        guestEmail: String(data.get("email") || "").trim(),
        title: `Priest Registration: ${String(data.get("professionalTitle") || "Applicant")}`,
        description: String(data.get("professionalBackground") || "Priest Registration application").trim(),
        sourceChannel: "WEBSITE_FORM",
        metadata: { ...applicationData, documentStorageAvailable: false },
      });
      setReferenceId(record.referenceId);
      form.reset();
    } catch (reason) {
      setValidationError(reason instanceof Error ? reason.message : "Unable to submit the Priest Application.");
    } finally {
      setSubmissionPending(false);
    }
  }

  if (referenceId) return <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-8 text-center" role="status"><h2 className="font-serif text-2xl font-bold text-stone-900">Priest Application submitted</h2><p className="mt-3 text-sm text-stone-700">Keep this Priest Registration Reference ID for tracking and future communication.</p><strong className="mt-4 block font-mono text-2xl text-emerald-800">{referenceId}</strong><Link className="mt-5 inline-block rounded-xl bg-orange-900 px-5 py-2.5 font-semibold text-white" href="/tracking?type=partner">Track Registration ID</Link></div>;

  return (
    <>
      <section className="mb-6 flex items-center gap-5 rounded-xl border border-[#D4AF37] bg-[#075E63] p-5" aria-label="Priest Application information">
        <div className="min-w-0 flex-1">
          <h2 className="text-[14px] font-bold uppercase tracking-widest text-orange-200">Priest Registration Application</h2>
          <p className="mt-2 text-sm leading-6 text-white">
            Tell us about your religious background, experience, and service capabilities so we can review your application appropriately.
          </p>
          <p className="mt-3 text-sm text-white">
            <span className="font-semibold text-[#FFD84D]">PLEASE MAKE SURE -</span> No immediate payment required. Fields marked * are mandatory.
          </p>
          <p className="mt-2 text-sm text-white">
            After successful application submission, the system auto-generates your Priest Registration Reference ID. Please keep this ID for tracking and future communication.
          </p>
        </div>
        <Link href="/contact?topic=inquiry" className="flex w-[96px] shrink-0 flex-col items-center justify-center rounded-xl border border-[#D4AF37] bg-[#B79A68] px-2 py-2.5 text-center shadow-inner" aria-label="Raise Inquiry">
          <span className="flex h-[54px] w-[54px] items-center justify-center rounded-lg border border-[#E8C85A] bg-[#064E59] [&>svg]:h-[35px] [&>svg]:w-[35px]">
            <QuestionCircleIcon />
          </span>
          <span className="mt-1.5 text-[11px] font-semibold leading-4 text-[#2D2416]">Raise Inquiry</span>
        </Link>
      </section>

      <form className="grid gap-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8" onSubmit={submit}>

      <section className={sectionClass}>
        <h2 className="font-serif text-xl font-bold text-stone-900">1. Applicant Details</h2>
        <div className="grid gap-4 sm:grid-cols-[1fr_220px]">
          <label className={labelClass}>Application Type *<select className={inputClass} name="applicationType" required defaultValue=""><option value="" disabled>Select application type</option><option value="individual">Individual Practitioner</option><option value="organisation">Temple / Institution / Organisation</option></select></label>
          <label className={labelClass}>Application Date<input className={inputClass} name="applicationDate" type="date" /></label>
        </div>
        <div className="grid gap-4 sm:grid-cols-3"><label className={labelClass}>First Name *<input className={inputClass} name="firstName" placeholder="Enter first name" required /></label><label className={labelClass}>Middle Name<input className={inputClass} name="middleName" placeholder="Enter middle name" /></label><label className={labelClass}>Last Name *<input className={inputClass} name="lastName" placeholder="Enter last name" required /></label></div>
        <div className="grid gap-4 sm:grid-cols-2"><label className={labelClass}>Religious Title *<input className={inputClass} name="professionalTitle" placeholder="e.g. Pandit, Purohit, Acharya" required /></label><label className={labelClass}>Organisation / Institution Name<input className={inputClass} name="organisationName" placeholder="Temple / institution name, if applicable" /></label></div>
        <div className="grid gap-4 sm:grid-cols-2"><label className={labelClass}>Mobile Number *<input className={inputClass} name="mobileNumber" type="tel" placeholder="+91 9876543210" required /></label><label className={labelClass}>WhatsApp Number<input className={inputClass} name="whatsappNumber" type="tel" placeholder="WhatsApp number, if different" /></label><label className={labelClass}>Email Address *<input className={inputClass} name="email" type="email" placeholder="name@example.com" required /></label><label className={labelClass}>Date of Birth *<input className={inputClass} name="dateOfBirth" type="date" required /></label><label className={labelClass}>Gender *<select className={inputClass} name="gender" required defaultValue=""><option value="" disabled>Select gender</option><option>Male</option><option>Female</option><option>Other</option></select></label></div>
      </section>

      <section className={sectionClass}>
        <h2 className="font-serif text-xl font-bold text-stone-900">2. Address Details</h2>
        <h3 className="font-semibold text-stone-900">A. Permanent Address *</h3>
        <label className={labelClass}>Address *<textarea className={inputClass} name="permanentAddress" rows={3} placeholder="Enter complete address" required /></label>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><label className={labelClass}>City / Village *<input className={inputClass} name="permanentCityVillage" placeholder="City / Village" required /></label><label className={labelClass}>District *<input className={inputClass} name="permanentDistrict" placeholder="District" required /></label><label className={labelClass}>State *<input className={inputClass} name="permanentState" placeholder="State" required /></label><label className={labelClass}>PIN Code *<input className={inputClass} name="permanentPinCode" inputMode="numeric" placeholder="PIN Code" required /></label><label className={labelClass}>Country *<input className={inputClass} name="permanentCountry" placeholder="Country" required /></label></div>
        <div className="mt-2 border-t border-stone-200 pt-5"><h3 className="font-semibold text-stone-900">B. Present Service Base Address *</h3></div>
        <label className={labelClass}>Address *<textarea className={inputClass} name="currentAddress" rows={3} placeholder="Enter complete address" required /></label><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><label className={labelClass}>City / Village *<input className={inputClass} name="currentCityVillage" placeholder="City / Village" required /></label><label className={labelClass}>District *<input className={inputClass} name="currentDistrict" placeholder="District" required /></label><label className={labelClass}>State *<input className={inputClass} name="currentState" placeholder="State" required /></label><label className={labelClass}>PIN Code *<input className={inputClass} name="currentPinCode" inputMode="numeric" placeholder="PIN Code" required /></label><label className={labelClass}>Country *<input className={inputClass} name="currentCountry" placeholder="Country" required /></label></div>
      </section>

      <section className={sectionClass}>
        <h2 className="font-serif text-xl font-bold text-stone-900">3. Religious &amp; Professional Identity</h2>
        <div className="grid gap-4 sm:grid-cols-2"><label className={labelClass}>Practitioner Type *<select className={inputClass} name="practitionerType" required defaultValue=""><option value="" disabled>Select practitioner type</option>{["Pandit", "Purohit", "Panda", "Acharya", "Vaidik Scholar", "Ritual Specialist", "Other"].map((type) => <option key={type}>{type}</option>)}</select></label><label className={labelClass}>Tradition / Sampradaya *<input className={inputClass} name="tradition" placeholder="Enter tradition / sampradaya" required /></label><label className={labelClass}>Gotra<input className={inputClass} name="gotra" placeholder="Enter gotra, if applicable" /></label><label className={labelClass}>Temple / Institution Affiliation<input className={inputClass} name="institutionAffiliation" placeholder="Enter affiliation, if applicable" /></label><label className={labelClass}>Languages Spoken *<input className={inputClass} name="languagesSpoken" placeholder="e.g. Hindi, Sanskrit, English" required /></label></div>
        <label className={labelClass}>Guru / Lineage Information<textarea className={inputClass} name="lineageInformation" rows={3} placeholder="Enter guru / lineage details, if applicable" maxLength={1000} /></label>
      </section>

      <section className={sectionClass}>
        <h2 className="font-serif text-xl font-bold text-stone-900">4. Education cum Experience</h2>
        <div className="grid gap-4 sm:grid-cols-2"><label className={labelClass}>Practicing Since / Year Started *<input className={inputClass} name="practicingSince" type="number" min="1900" max="2100" placeholder="e.g. 2008" required /></label><label className={labelClass}>Total Years of Delivered Service Experience *<input className={inputClass} name="totalYearsExperience" type="number" min="0" placeholder="e.g. 12 years" required /></label></div>
        <label className={labelClass}>Qualification / Religious Education *<textarea className={inputClass} name="religiousEducation" rows={3} placeholder="Enter religious / academic qualification" required maxLength={1000} /></label>
        <label className={labelClass}>Qualification / Certification Details<textarea className={inputClass} name="qualificationDetails" rows={3} placeholder="Enter certification details, if applicable" maxLength={1000} /></label>
        <label className={labelClass}>Religious / Professional Background *<textarea className={inputClass} name="professionalBackground" rows={4} placeholder="Briefly describe your religious/professional background" required maxLength={1000} /></label>
      </section>

      <section className={sectionClass}>
        <h2 className="font-serif text-xl font-bold text-stone-900">5. Service Interested In</h2>
        <div className="grid gap-4 sm:grid-cols-2"><label className={labelClass}>Primary Specialisation *<input className={inputClass} name="primarySpecialisation" placeholder="Enter primary specialisation" required /></label><label className={labelClass}>Other Specialisations (optional)<input className={inputClass} name="otherSpecialisations" placeholder="Other specialisations, if applicable" /></label></div>
      </section>

      <section className={sectionClass}>
        <h2 className="font-serif text-xl font-bold text-stone-900">6. Service Interest</h2><p className="text-sm text-stone-600">Services the applicant is interested in accepting through Connect Hub Co.</p>
        <fieldset><legend className={labelClass}>Services / Rituals Interested in Accepting through Connect Hub Co. *</legend><ServiceChecklist name="serviceInterest" /></fieldset>
        <div className="grid gap-4 sm:grid-cols-3"><label className={labelClass}>Preferred Choice 1 *<input className={inputClass} name="preferredChoice1" placeholder="Enter first preference" required /></label><label className={labelClass}>Preferred Choice 2<input className={inputClass} name="preferredChoice2" placeholder="Enter second preference" /></label><label className={labelClass}>Preferred Choice 3<input className={inputClass} name="preferredChoice3" placeholder="Enter third preference" /></label></div>
      </section>

      <section className={sectionClass}>
        <h2 className="font-serif text-xl font-bold text-stone-900">7. Service Location &amp; Mobility</h2>
        <div className="grid gap-4 sm:grid-cols-2"><label className={labelClass}>Primary Service Location *<input className={inputClass} name="primaryServiceLocation" placeholder="City / District / State" required /></label><label className={labelClass}>Other Service Locations (optional)<input className={inputClass} name="otherServiceLocations" placeholder="Other locations, if applicable" /></label><label className={labelClass}>Service Mobility *<select className={inputClass} name="serviceMobility" required defaultValue=""><option value="" disabled>Select service mobility</option><option>Local Only</option><option>Outstation Only</option><option>Local + Outstation</option><option>Anywhere / Pan-India</option></select></label><label className={labelClass}>International / NRI Service Travel Willingness<select className={inputClass} name="internationalTravel" defaultValue=""><option value="" disabled>Select option</option><option>Yes</option><option>No</option></select></label><label className={labelClass}>Online / Remote Service Availability<select className={inputClass} name="remoteAvailability" defaultValue=""><option value="" disabled>Select availability</option><option>Yes</option><option>No</option><option>Where Applicable</option></select></label><label className={labelClass}>General Availability *<input className={inputClass} name="generalAvailability" placeholder="Enter available days / timings" required /></label></div>
      </section>

      <section className={sectionClass}>
        <h2 className="font-serif text-xl font-bold text-stone-900">8. Identity &amp; Verification</h2>
        <div className="grid gap-4 sm:grid-cols-2"><label className={labelClass}>Government ID Type *<select className={inputClass} name="governmentIdType" required defaultValue=""><option value="" disabled>Select ID type</option><option>Aadhaar Card</option><option>Passport</option><option>Driving Licence</option><option>Voter ID</option><option>Other Government ID</option></select></label><label className={labelClass}>Government ID Number *<input className={inputClass} name="governmentIdNumber" placeholder="Enter government ID number" required /></label><label className={labelClass}>Government ID Document<input className={inputClass} name="governmentIdDocument" type="file" /></label><label className={labelClass}><span className="normal-case">Proof Of Address</span><input className={inputClass} name="addressProof" type="file" /></label><label className={labelClass}>Profile Photograph<input className={inputClass} name="profilePhotograph" type="file" accept="image/*" /></label><label className={labelClass}>Qualification / Certification Document<input className={inputClass} name="qualificationDocument" type="file" /></label><label className={labelClass}>Temple / Institution Supporting Credential<input className={inputClass} name="institutionCredential" type="file" /></label></div>
        <p className="text-xs text-stone-500">Document fields are provided for application preparation. File-storage integration is not currently enabled.</p>
      </section>

      <section className={sectionClass}>
        <h2 className="font-serif text-xl font-bold text-stone-900">9. Operational Suitability</h2>
        <div className="grid gap-4 sm:grid-cols-2"><label className={labelClass}>Preferred Service Language(s) *<input className={inputClass} name="preferredServiceLanguages" placeholder="e.g. Hindi, Sanskrit, English" required /></label><label className={labelClass}>Availability / Preferred Service Schedule<input className={inputClass} name="preferredSchedule" placeholder="Enter preferred days / timings, if applicable" /></label></div>
        <label className={labelClass}>Accessibility / Travel Constraints (optional)<textarea className={inputClass} name="travelConstraints" rows={3} placeholder="Mention any constraints, if applicable" maxLength={1000} /></label><label className={labelClass}>Additional Remarks (optional)<textarea className={inputClass} name="additionalRemarks" rows={3} placeholder="Add any relevant information, if applicable" maxLength={1000} /></label>
      </section>

      <section className={sectionClass}>
        <h2 className="font-serif text-xl font-bold text-stone-900">10. Declaration &amp; Consent</h2>
        <label className={checkboxClass}><input className="mt-1" name="accuracyDeclaration" type="checkbox" required />I confirm that the information and documents provided in this application are accurate. *</label>
        <label className={checkboxClass}><input className="mt-1" name="verificationConsent" type="checkbox" required />I consent to verification of the information, identity, qualifications and documents submitted. *</label>
        <label className={checkboxClass}><input className="mt-1" name="policyConsent" type="checkbox" required />I agree to the <Link className="font-semibold text-orange-900 underline" href="/privacy-policy">Privacy Policy</Link> and <Link className="font-semibold text-orange-900 underline" href="/terms">Terms &amp; Conditions</Link>. *</label>
      </section>

      {validationError ? <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800" role="alert">{validationError}</p> : null}
      <label className={`${checkboxClass} rounded-xl border border-stone-300 p-4`}><input className="mt-1" name="applicationAcknowledgement" type="checkbox" required />I understand that submission is only an application and does not guarantee approval, activation, public listing, customer assignment, or service allocation. *</label>
      <button className="rounded-xl bg-orange-900 px-6 py-3 font-semibold text-white transition hover:bg-black disabled:opacity-50" disabled={submissionPending} type="submit">{submissionPending ? "Submitting Application..." : "Submit Priest Application"}</button>
      </form>
    </>
  );
}
