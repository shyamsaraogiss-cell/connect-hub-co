'use client';

import React, { useState, type FormEvent } from 'react';
import type { BaseInquiryInput, BusinessModuleCategory } from './types';
import styles from './InquiryStyles.module.css';

export type SharedInquiryFormProps<T extends BaseInquiryInput> = {
  category: BusinessModuleCategory;
  title: string;
  eyebrow: string;
  subtitle: string;
  initialValues: T;
  onSubmitInquiry: (data: T) => Promise<{ success: boolean; inquiryId?: string; message?: string }>;
  renderCustomFields: (
    values: T,
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
    handleCheckboxChange: (name: keyof T, checked: boolean) => void
  ) => React.ReactNode;
};

export function SharedInquiryForm<T extends BaseInquiryInput>({
  category,
  title,
  eyebrow,
  subtitle,
  initialValues,
  onSubmitInquiry,
  renderCustomFields,
}: SharedInquiryFormProps<T>) {
  const [formValues, setFormValues] = useState<T>(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormValues((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (name: keyof T, checked: boolean) => {
    setFormValues((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formValues.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (formValues.phone && formValues.phone.trim().replace(/\D/g, '').length < 7) {
      setError('Please enter a valid contact phone number with country code.');
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await onSubmitInquiry(formValues);
      if (result.success && result.inquiryId) {
        setSubmittedInquiryId(result.inquiryId);
      } else {
        setError(result.message || 'Unable to submit inquiry. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedInquiryId) {
    return (
      <div className={styles.inquiryContainer}>
        <div className={styles.successMessage}>
          <h3>Inquiry Submitted Successfully</h3>
          <p>
            Thank you. Your inquiry reference ID is <strong>{submittedInquiryId}</strong>. Our coordination team will review your details and reach out via your preferred contact channel.
          </p>
          <button
            type="button"
            className={styles.submitButton}
            style={{ marginTop: '20px', width: 'auto' }}
            onClick={() => {
              setSubmittedInquiryId(null);
              setFormValues(initialValues);
            }}
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.inquiryContainer} id={`inquiry-form-${category}`}>
      <div className={styles.inquiryHeader}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.formGrid}>
        {/* Shared Base Contact Fields */}
        <div className={styles.fieldGroup}>
          <label htmlFor={`${category}-fullName`}>Full Name *</label>
          <input
            id={`${category}-fullName`}
            name="fullName"
            type="text"
            className={styles.fieldInput}
            value={formValues.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor={`${category}-phone`}>Phone / WhatsApp *</label>
          <input
            id={`${category}-phone`}
            name="phone"
            type="tel"
            className={styles.fieldInput}
            value={formValues.phone}
            onChange={handleChange}
            placeholder="+91 / International number"
            required
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor={`${category}-email`}>Email Address</label>
          <input
            id={`${category}-email`}
            name="email"
            type="email"
            className={styles.fieldInput}
            value={formValues.email}
            onChange={handleChange}
            placeholder="name@example.com"
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor={`${category}-contactPreference`}>Preferred Contact Channel</label>
          <select
            id={`${category}-contactPreference`}
            name="contactPreference"
            className={styles.fieldSelect}
            value={formValues.contactPreference}
            onChange={handleChange}
          >
            <option value="WHATSAPP">WhatsApp</option>
            <option value="PHONE">Phone Call</option>
            <option value="EMAIL">Email</option>
          </select>
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor={`${category}-city`}>City</label>
          <input
            id={`${category}-city`}
            name="city"
            type="text"
            className={styles.fieldInput}
            value={formValues.city}
            onChange={handleChange}
            placeholder="Your city"
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor={`${category}-country`}>Country *</label>
          <input
            id={`${category}-country`}
            name="country"
            type="text"
            className={styles.fieldInput}
            value={formValues.country}
            onChange={handleChange}
            placeholder="India / USA / UK / etc."
            required
          />
        </div>

        <div className={styles.fullWidth}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="isNRI"
              checked={formValues.isNRI}
              onChange={handleChange}
            />
            NRI Family / Overseas Coordination Required
          </label>
        </div>

        {/* Business-Specific Custom Fields */}
        {renderCustomFields(formValues, handleChange, handleCheckboxChange)}

        {/* Shared Privacy Disclaimer */}
        <div className={styles.fullWidth}>
          <div className={styles.privacyAlert}>
            <strong>Privacy & Confidentiality Standard:</strong> Your family information, Gotra details, and contact data remain strictly confidential. Information is reviewed exclusively by authorized coordinators and verified Religious Partners.
          </div>
        </div>

        <div className={styles.fullWidth}>
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting Inquiry…' : 'Submit Inquiry Request'}
          </button>
        </div>
      </form>
    </div>
  );
}
