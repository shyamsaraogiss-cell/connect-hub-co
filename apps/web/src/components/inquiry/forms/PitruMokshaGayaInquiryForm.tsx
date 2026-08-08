'use client';

import React from 'react';
import { SharedInquiryForm } from '../SharedInquiryForm';
import type { PitruMokshaGayaInquiryInput } from '../types';
import { submitUnifiedInquiry } from '@/services/inquiry.api';
import styles from '../InquiryStyles.module.css';

const defaultValues: PitruMokshaGayaInquiryInput = {
  fullName: '',
  phone: '',
  email: '',
  contactPreference: 'WHATSAPP',
  city: '',
  state: '',
  country: 'India',
  isNRI: false,
  packageCode: 'COMPLETE',
  serviceMode: 'OFFLINE',
  preferredDate: '',
  alternativeDate: '',
  ancestorNames: '',
  gotra: '',
  relationToAncestors: '',
  pilgrimCount: 1,
  travelSupportNeeded: false,
  accommodationNeeded: false,
  notes: '',
};

export function PitruMokshaGayaInquiryForm() {
  return (
    <SharedInquiryForm<PitruMokshaGayaInquiryInput>
      category="pitru-moksha-gaya"
      eyebrow="PITRUMOKSHA GAYA INQUIRY"
      title="Request Ancestral Ritual Guidance in Gaya Ji"
      subtitle="Share your family requirements, ancestor names, Gotra, and preferred ritual dates for human verification and coordinator guidance."
      initialValues={defaultValues}
      onSubmitInquiry={(data) => submitUnifiedInquiry('pitru-moksha-gaya', data)}
      renderCustomFields={(values, handleChange) => (
        <>
          <div className={styles.fieldGroup}>
            <label htmlFor="pmg-packageCode">Seva Package</label>
            <select
              id="pmg-packageCode"
              name="packageCode"
              className={styles.fieldSelect}
              value={values.packageCode}
              onChange={handleChange}
            >
              <option value="ESSENTIAL">Essential Pind Daan</option>
              <option value="COMPLETE">Complete Pitru Moksha Seva</option>
              <option value="FAMILY">Family & NRI Assisted Seva</option>
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="pmg-serviceMode">Service Participation Mode</label>
            <select
              id="pmg-serviceMode"
              name="serviceMode"
              className={styles.fieldSelect}
              value={values.serviceMode}
              onChange={handleChange}
            >
              <option value="OFFLINE">On-Site Gaya Journey (In-Person)</option>
              <option value="ONLINE">Remote Live Stream (Online Proxy)</option>
              <option value="HYBRID">Hybrid Family Coordination</option>
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="pmg-preferredDate">Preferred Ritual Date *</label>
            <input
              id="pmg-preferredDate"
              name="preferredDate"
              type="date"
              className={styles.fieldInput}
              value={values.preferredDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="pmg-alternativeDate">Alternative / End Date</label>
            <input
              id="pmg-alternativeDate"
              name="alternativeDate"
              type="date"
              className={styles.fieldInput}
              value={values.alternativeDate || ''}
              onChange={handleChange}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="pmg-gotra">Family Gotra (If Known)</label>
            <input
              id="pmg-gotra"
              name="gotra"
              type="text"
              className={styles.fieldInput}
              value={values.gotra || ''}
              onChange={handleChange}
              placeholder="e.g. Kashyap, Bhardwaj, Vashishtha"
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="pmg-pilgrimCount">Number of Travelling Pilgrims *</label>
            <input
              id="pmg-pilgrimCount"
              name="pilgrimCount"
              type="number"
              min={1}
              max={50}
              className={styles.fieldInput}
              value={values.pilgrimCount}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.fullWidth}>
            <div className={styles.fieldGroup}>
              <label htmlFor="pmg-ancestorNames">Ancestor Name(s) & Lineage Details *</label>
              <textarea
                id="pmg-ancestorNames"
                name="ancestorNames"
                className={styles.fieldTextarea}
                rows={3}
                value={values.ancestorNames}
                onChange={handleChange}
                placeholder="Names of departed ancestors, relationship, and known details"
                required
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="travelSupportNeeded"
                checked={values.travelSupportNeeded}
                onChange={handleChange}
              />
              Need Local Travel & Pickup Support
            </label>
          </div>

          <div className={styles.fieldGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="accommodationNeeded"
                checked={values.accommodationNeeded}
                onChange={handleChange}
              />
              Need Accommodation Guidance
            </label>
          </div>
        </>
      )}
    />
  );
}
