'use client';

import React from 'react';
import { SharedInquiryForm } from '../SharedInquiryForm';
import type { VahiRecordsInquiryInput } from '../types';
import { submitUnifiedInquiry } from '@/services/inquiry.api';
import styles from '../InquiryStyles.module.css';

const defaultValues: VahiRecordsInquiryInput = {
  fullName: '',
  phone: '',
  email: '',
  contactPreference: 'WHATSAPP',
  city: '',
  state: '',
  country: 'India',
  isNRI: false,
  ancestorFullName: '',
  nativePlace: '',
  gotra: '',
  knownPriestReference: '',
  serviceMode: 'REMOTE',
  languagePreference: 'Hindi',
  specialNotes: '',
};

export function VahiRecordsInquiryForm() {
  return (
    <SharedInquiryForm<VahiRecordsInquiryInput>
      category="vahi-records"
      eyebrow="VAHI RECORDS INQUIRY"
      title="Organize Family Lineage & Ledger Inquiry"
      subtitle="Provide known ancestor details, native place, and Gotra for initial completeness review and coordinator guidance with relevant record custodians."
      initialValues={defaultValues}
      onSubmitInquiry={(data) => submitUnifiedInquiry('vahi-records', data)}
      renderCustomFields={(values, handleChange) => (
        <>
          <div className={styles.fieldGroup}>
            <label htmlFor="vahi-ancestorFullName">Ancestor Full Name (Known) *</label>
            <input
              id="vahi-ancestorFullName"
              name="ancestorFullName"
              type="text"
              className={styles.fieldInput}
              value={values.ancestorFullName}
              onChange={handleChange}
              placeholder="Name of grandfather, great-grandfather, etc."
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="vahi-nativePlace">Native Place / Ancestral Village *</label>
            <input
              id="vahi-nativePlace"
              name="nativePlace"
              type="text"
              className={styles.fieldInput}
              value={values.nativePlace}
              onChange={handleChange}
              placeholder="Village, Town, District, State"
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="vahi-gotra">Family Gotra *</label>
            <input
              id="vahi-gotra"
              name="gotra"
              type="text"
              className={styles.fieldInput}
              value={values.gotra}
              onChange={handleChange}
              placeholder="e.g. Kashyap, Bhardwaj, Vashishtha"
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="vahi-serviceMode">Preferred Inquiry Mode</label>
            <select
              id="vahi-serviceMode"
              name="serviceMode"
              className={styles.fieldSelect}
              value={values.serviceMode}
              onChange={handleChange}
            >
              <option value="REMOTE">Remote Guidance (NRI & Digital Coordination)</option>
              <option value="ON_SITE">On-Site Visit Assistance</option>
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="vahi-knownPriestReference">Known Panda / Family Contact Reference (Optional)</label>
            <input
              id="vahi-knownPriestReference"
              name="knownPriestReference"
              type="text"
              className={styles.fieldInput}
              value={values.knownPriestReference || ''}
              onChange={handleChange}
              placeholder="Panda name, ledger reference, or previous visit details"
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="vahi-languagePreference">Language Preference</label>
            <select
              id="vahi-languagePreference"
              name="languagePreference"
              className={styles.fieldSelect}
              value={values.languagePreference}
              onChange={handleChange}
            >
              <option value="Hindi">Hindi</option>
              <option value="English">English</option>
              <option value="Bengali">Bengali</option>
              <option value="Gujarati">Gujarati</option>
              <option value="Marathi">Marathi</option>
            </select>
          </div>

          <div className={styles.fullWidth}>
            <div className={styles.fieldGroup}>
              <label htmlFor="vahi-specialNotes">Special Clarification Notes & Lineage Information</label>
              <textarea
                id="vahi-specialNotes"
                name="specialNotes"
                className={styles.fieldTextarea}
                rows={3}
                value={values.specialNotes || ''}
                onChange={handleChange}
                placeholder="Mention any old notes, photographs, or family branch details that may assist in initial review"
              />
            </div>
          </div>
        </>
      )}
    />
  );
}
