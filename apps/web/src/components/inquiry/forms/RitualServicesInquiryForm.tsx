'use client';

import React from 'react';
import { SharedInquiryForm } from '../SharedInquiryForm';
import type { RitualServicesInquiryInput } from '../types';
import { submitUnifiedInquiry } from '@/services/inquiry.api';
import styles from '../InquiryStyles.module.css';

const defaultValues: RitualServicesInquiryInput = {
  fullName: '',
  phone: '',
  email: '',
  contactPreference: 'WHATSAPP',
  city: '',
  state: '',
  country: 'India',
  isNRI: false,
  serviceDomain: 'COMPREHENSIVE_RITUALS',
  pujaType: 'Griha Pravesh / Housewarming',
  preferredDate: '',
  serviceMode: 'IN_PERSON',
  venueType: 'HOME',
  languagePreference: 'Hindi',
  samagriArrangement: 'BY_PRIEST',
  notes: '',
};

export function RitualServicesInquiryForm() {
  return (
    <SharedInquiryForm<RitualServicesInquiryInput>
      category="ritual-services"
      eyebrow="RITUAL SERVICES INQUIRY"
      title="Arrange Authentic Vaidik Rites & Home Pujas"
      subtitle="Connect with qualified Pandits for home ceremonies, Griha Pravesh, Havan, Dosha remedies, or virtual live-streamed pujas."
      initialValues={defaultValues}
      onSubmitInquiry={(data) => submitUnifiedInquiry('ritual-services', data)}
      renderCustomFields={(values, handleChange) => (
        <>
          <div className={styles.fieldGroup}>
            <label htmlFor="rit-pujaType">Type of Puja / Ceremony *</label>
            <select
              id="rit-pujaType"
              name="pujaType"
              className={styles.fieldSelect}
              value={values.pujaType}
              onChange={handleChange}
              required
            >
              <option value="Griha Pravesh / Housewarming">Griha Pravesh / Housewarming</option>
              <option value="Satyanarayan Katha">Satyanarayan Katha</option>
              <option value="Maha Mritunjay Havan">Maha Mritunjay Havan</option>
              <option value="Navagraha Shanti Puja">Navagraha Shanti Puja</option>
              <option value="Upanayan Sanskar">Upanayan / Sacred Thread Ceremony</option>
              <option value="Vastu Shanti Puja">Vastu Shanti Puja</option>
              <option value="Dosha Remedy / Custom Puja">Dosha Remedy / Custom Puja</option>
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="rit-serviceMode">Service Format</label>
            <select
              id="rit-serviceMode"
              name="serviceMode"
              className={styles.fieldSelect}
              value={values.serviceMode}
              onChange={handleChange}
            >
              <option value="IN_PERSON">In-Person Physical Presence</option>
              <option value="VIRTUAL_LIVESTREAM">Virtual Interactive Live-Stream</option>
              <option value="BOTH">Hybrid / Multi-Location Ceremony</option>
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="rit-preferredDate">Preferred Ceremony Date *</label>
            <input
              id="rit-preferredDate"
              name="preferredDate"
              type="date"
              className={styles.fieldInput}
              value={values.preferredDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="rit-venueType">Venue / Ceremony Location</label>
            <select
              id="rit-venueType"
              name="venueType"
              className={styles.fieldSelect}
              value={values.venueType}
              onChange={handleChange}
            >
              <option value="HOME">Family Home / Residence</option>
              <option value="TEMPLE">Approved Local Temple</option>
              <option value="SACRED_CITY">Pilgrimage Destination (Kashi, Gaya, etc.)</option>
              <option value="VENUE">Event Hall / External Venue</option>
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="rit-languagePreference">Language Preference</label>
            <select
              id="rit-languagePreference"
              name="languagePreference"
              className={styles.fieldSelect}
              value={values.languagePreference}
              onChange={handleChange}
            >
              <option value="Hindi">Hindi / Sanskrit</option>
              <option value="English">English / Sanskrit</option>
              <option value="Bengali">Bengali</option>
              <option value="Tamil">Tamil</option>
              <option value="Telugu">Telugu</option>
              <option value="Marathi">Marathi</option>
              <option value="Gujarati">Gujarati</option>
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="rit-samagriArrangement">Samagri (Materials) Arrangement</label>
            <select
              id="rit-samagriArrangement"
              name="samagriArrangement"
              className={styles.fieldSelect}
              value={values.samagriArrangement}
              onChange={handleChange}
            >
              <option value="BY_PRIEST">Provided Complete by Priest / Partner</option>
              <option value="BY_FAMILY">Arranged by Family with Checklist</option>
              <option value="GUIDANCE_NEEDED">Guidance & Coordination Needed</option>
            </select>
          </div>

          <div className={styles.fullWidth}>
            <div className={styles.fieldGroup}>
              <label htmlFor="rit-notes">Special Requirements / Family Traditions</label>
              <textarea
                id="rit-notes"
                name="notes"
                className={styles.fieldTextarea}
                rows={3}
                value={values.notes || ''}
                onChange={handleChange}
                placeholder="Mention specific Muhurat preferences, family customs, or special requests"
              />
            </div>
          </div>
        </>
      )}
    />
  );
}
