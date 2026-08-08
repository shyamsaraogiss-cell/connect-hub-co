'use client';

import React from 'react';
import { SharedInquiryForm } from '../SharedInquiryForm';
import type { ReligiousPartnersInquiryInput } from '../types';
import { submitUnifiedInquiry } from '@/services/inquiry.api';
import styles from '../InquiryStyles.module.css';

const defaultValues: ReligiousPartnersInquiryInput = {
  fullName: '',
  phone: '',
  email: '',
  contactPreference: 'WHATSAPP',
  city: '',
  state: '',
  country: 'India',
  isNRI: false,
  partnerTitle: 'PANDIT',
  partnerPathway: 'RITUAL_PUJA',
  primaryLocation: '',
  languagesSpoken: ['Hindi', 'Sanskrit'],
  yearsOfExperience: 5,
  preferredServiceMode: 'BOTH',
  specializations: [],
  identityProofProvided: true,
  notes: '',
};

export function ReligiousPartnersInquiryForm() {
  return (
    <SharedInquiryForm<ReligiousPartnersInquiryInput>
      category="religious-partners"
      eyebrow="RELIGIOUS PARTNER REGISTRATION"
      title="Apply to Join the Religious Partner Network"
      subtitle="Submit your profile, service expertise, operational location, and availability for administrative review and credential verification."
      initialValues={defaultValues}
      onSubmitInquiry={(data) => submitUnifiedInquiry('religious-partners', data)}
      renderCustomFields={(values, handleChange) => (
        <>
          <div className={styles.fieldGroup}>
            <label htmlFor="rpn-partnerTitle">Traditional Title / Professional Role *</label>
            <select
              id="rpn-partnerTitle"
              name="partnerTitle"
              className={styles.fieldSelect}
              value={values.partnerTitle}
              onChange={handleChange}
              required
            >
              <option value="PANDIT">Pandit Ji</option>
              <option value="PUROHIT">Purohit</option>
              <option value="PANDA">Traditional Panda (Ledger Custodian)</option>
              <option value="ACHARYA">Acharya / Vaidik Scholar</option>
              <option value="SCHOLAR">Vaidik Practitioner</option>
              <option value="ORGANIZATION">Religious Service Organization</option>
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="rpn-partnerPathway">Selected Partner Pathway *</label>
            <select
              id="rpn-partnerPathway"
              name="partnerPathway"
              className={styles.fieldSelect}
              value={values.partnerPathway}
              onChange={handleChange}
              required
            >
              <option value="RITUAL_PUJA">Path A: Ritual and Puja Partner</option>
              <option value="GAYA_PITRUMOKSHA">Path B: PitruMoksha Gaya Partner</option>
              <option value="LOCATION_BASED">Path C: Location-Based Religious Partner</option>
              <option value="ONLINE_RITUAL">Path D: Online Ritual Partner</option>
              <option value="VAHI_RECORDS">Path E: Vahi Records and Lineage Partner</option>
              <option value="LOCAL_COORDINATION">Path F: Travel and Local Coordination Partner</option>
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="rpn-primaryLocation">Primary Operating Base / City *</label>
            <input
              id="rpn-primaryLocation"
              name="primaryLocation"
              type="text"
              className={styles.fieldInput}
              value={values.primaryLocation}
              onChange={handleChange}
              placeholder="e.g. Gaya Ji, Varanasi, Delhi NCR, Mumbai"
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="rpn-yearsOfExperience">Years of Traditional Practice *</label>
            <input
              id="rpn-yearsOfExperience"
              name="yearsOfExperience"
              type="number"
              min={1}
              max={60}
              className={styles.fieldInput}
              value={values.yearsOfExperience}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="rpn-preferredServiceMode">Service Participation Format</label>
            <select
              id="rpn-preferredServiceMode"
              name="preferredServiceMode"
              className={styles.fieldSelect}
              value={values.preferredServiceMode}
              onChange={handleChange}
            >
              <option value="PHYSICAL">In-Person Physical Ceremonies Only</option>
              <option value="ONLINE_LIVE_STREAM">Online Live-Stream Ceremonies Only</option>
              <option value="BOTH">Both Physical & Online Live-Stream</option>
            </select>
          </div>

          <div className={styles.fullWidth}>
            <div className={styles.fieldGroup}>
              <label htmlFor="rpn-notes">Ritual Specializations & Gurukul / Reference Details</label>
              <textarea
                id="rpn-notes"
                name="notes"
                className={styles.fieldTextarea}
                rows={3}
                value={values.notes || ''}
                onChange={handleChange}
                placeholder="Mention specific pujas performed, traditional credentials, or reference priest contact information"
              />
            </div>
          </div>
        </>
      )}
    />
  );
}
