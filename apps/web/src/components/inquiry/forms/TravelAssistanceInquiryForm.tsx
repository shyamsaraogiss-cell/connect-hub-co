'use client';

import React from 'react';
import { SharedInquiryForm } from '../SharedInquiryForm';
import type { TravelAssistanceInquiryInput } from '../types';
import { submitUnifiedInquiry } from '@/services/inquiry.api';
import styles from '../InquiryStyles.module.css';

const defaultValues: TravelAssistanceInquiryInput = {
  fullName: '',
  phone: '',
  email: '',
  contactPreference: 'WHATSAPP',
  city: '',
  state: '',
  country: 'India',
  isNRI: false,
  travelCategory: 'PILGRIMAGE_PACKAGE',
  destination: 'Gaya Ji, Bihar',
  travelDate: '',
  returnDate: '',
  travelerCount: 2,
  pickupLocation: '',
  specialAssistance: false,
  notes: '',
};

export function TravelAssistanceInquiryForm() {
  return (
    <SharedInquiryForm<TravelAssistanceInquiryInput>
      category="travel-assistance"
      eyebrow="SACRED TRAVEL INQUIRY"
      title="Plan Sacred Pilgrimage & Logistics Support"
      subtitle="Arrange station/airport pickup, hotel accommodation, local ground transport, and accessibility support for your family journey."
      initialValues={defaultValues}
      onSubmitInquiry={(data) => submitUnifiedInquiry('travel-assistance', data)}
      renderCustomFields={(values, handleChange) => (
        <>
          <div className={styles.fieldGroup}>
            <label htmlFor="trv-travelCategory">Assistance Required *</label>
            <select
              id="trv-travelCategory"
              name="travelCategory"
              className={styles.fieldSelect}
              value={values.travelCategory}
              onChange={handleChange}
              required
            >
              <option value="PILGRIMAGE_PACKAGE">Complete Pilgrimage Travel Package</option>
              <option value="LOCAL_TRANSPORT">Local Transport & Station/Airport Pickup</option>
              <option value="ACCOMMODATION">Hotel & Dharamshala Stay Coordination</option>
              <option value="PRIEST_COORDINATION">Sacred Destination Ground Escort</option>
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="trv-destination">Destination *</label>
            <select
              id="trv-destination"
              name="destination"
              className={styles.fieldSelect}
              value={values.destination}
              onChange={handleChange}
              required
            >
              <option value="Gaya Ji, Bihar">Gaya Ji, Bihar</option>
              <option value="Varanasi / Kashi, UP">Varanasi / Kashi, UP</option>
              <option value="Prayagraj, UP">Prayagraj, UP</option>
              <option value="Haridwar / Rishikesh, UK">Haridwar / Rishikesh, UK</option>
              <option value="Ayodhya, UP">Ayodhya, UP</option>
              <option value="Ujjain / Omkareshwar, MP">Ujjain / Omkareshwar, MP</option>
              <option value="Other Pilgrimage Destination">Other Sacred Destination</option>
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="trv-travelDate">Planned Travel / Arrival Date *</label>
            <input
              id="trv-travelDate"
              name="travelDate"
              type="date"
              className={styles.fieldInput}
              value={values.travelDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="trv-returnDate">Return Date (Optional)</label>
            <input
              id="trv-returnDate"
              name="returnDate"
              type="date"
              className={styles.fieldInput}
              value={values.returnDate || ''}
              onChange={handleChange}
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="trv-travelerCount">Number of Travelers *</label>
            <input
              id="trv-travelerCount"
              name="travelerCount"
              type="number"
              min={1}
              max={100}
              className={styles.fieldInput}
              value={values.travelerCount}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="trv-pickupLocation">Pickup Location (Station / Airport / City)</label>
            <input
              id="trv-pickupLocation"
              name="pickupLocation"
              type="text"
              className={styles.fieldInput}
              value={values.pickupLocation || ''}
              onChange={handleChange}
              placeholder="e.g. Patna Airport, Gaya Junction, Hotel"
            />
          </div>

          <div className={styles.fullWidth}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="specialAssistance"
                checked={values.specialAssistance}
                onChange={handleChange}
              />
              Senior Citizen / Wheelchair / Accessibility Assistance Required
            </label>
          </div>

          <div className={styles.fullWidth}>
            <div className={styles.fieldGroup}>
              <label htmlFor="trv-notes">Additional Travel Preferences & Special Requests</label>
              <textarea
                id="trv-notes"
                name="notes"
                className={styles.fieldTextarea}
                rows={3}
                value={values.notes || ''}
                onChange={handleChange}
                placeholder="Mention meal preferences, room types, or specific local transportation needs"
              />
            </div>
          </div>
        </>
      )}
    />
  );
}
