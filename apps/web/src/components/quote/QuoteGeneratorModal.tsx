'use client';

import React, { useState } from 'react';
import type { BusinessModuleCategory } from '@/components/inquiry/types';
import type { ServiceQuote } from '@/types/quote';
import { approveQuoteByAdmin, createServiceQuote, dispatchQuoteViaEmail, dispatchQuoteViaWhatsApp, generateQuotePDFHTML } from '@/services/quote.api';

interface QuoteGeneratorModalProps {
  initialCustomerName?: string;
  initialCustomerEmail?: string;
  initialCustomerPhone?: string;
  initialCategory?: BusinessModuleCategory;
  leadId?: string;
  bookingId?: string;
  onClose: () => void;
}

export function QuoteGeneratorModal({
  initialCustomerName = '',
  initialCustomerEmail = '',
  initialCustomerPhone = '',
  initialCategory = 'pitru-moksha-gaya',
  leadId,
  bookingId,
  onClose,
}: QuoteGeneratorModalProps) {
  const [customerName, setCustomerName] = useState(initialCustomerName);
  const [customerEmail, setCustomerEmail] = useState(initialCustomerEmail);
  const [customerPhone, setCustomerPhone] = useState(initialCustomerPhone);
  const [category, setCategory] = useState<BusinessModuleCategory>(initialCategory);
  const [serviceName, setServiceName] = useState('Pitru Moksha Gaya Complete Seva');
  const [preferredDate, setPreferredDate] = useState('2026-08-15');
  const [inclusionsText, setInclusionsText] = useState('Vedic Pind Daan Ritual, Samagri Arrangements, Panda Coordination');
  const [exclusionsText, setExclusionsText] = useState('Personal Travel Airfare, Individual Hotel Accommodation, Gratuities');
  const [termsText, setTermsText] = useState('Quotes are valid for 14 days. Advance coordinator approval required before ceremony confirmation.');

  // Line items state
  const [items, setItems] = useState<Array<{ description: string; quantity: number; unitPrice: number }>>([
    { description: 'Vedic Pind Daan Ritual Ceremony', quantity: 1, unitPrice: 11000 },
    { description: 'Traditional Panda & Acharya Dakshina', quantity: 1, unitPrice: 5100 },
    { description: 'Patna Airport Pickup & Gaya Yatra Transport', quantity: 1, unitPrice: 3500 },
  ]);

  const [generatedQuote, setGeneratedQuote] = useState<ServiceQuote | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);

  const handleAddItem = () => {
    setItems([...items, { description: '', quantity: 1, unitPrice: 1000 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: string, value: string | number) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const handleGenerateQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      alert('Please provide customer name for the official quote.');
      return;
    }
    if (items.length === 0 || items.some((item) => !item.description.trim() || item.unitPrice <= 0)) {
      alert('Please ensure all quote line items have a description and valid positive price.');
      return;
    }

    setIsSubmitting(true);
    try {
      const quote = await createServiceQuote({
        leadId,
        bookingId,
        customerName,
        customerEmail,
        customerPhone,
        category,
        serviceName,
        preferredDate,
        items,
        inclusions: inclusionsText.split(',').map((s) => s.trim()),
        exclusions: exclusionsText.split(',').map((s) => s.trim()),
        termsAndConditions: termsText,
      });
      setGeneratedQuote(quote);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to generate quote');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApproveByAdmin = async () => {
    if (!generatedQuote) return;
    try {
      const approved = await approveQuoteByAdmin(generatedQuote.id, 'Senior Administrator Acharya Ji');
      setGeneratedQuote(approved);
      alert(`Quote #${approved.quoteNumber} has been APPROVED by Administrator! Email & WhatsApp dispatches are now unlocked.`);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Approval failed');
    }
  };

  const handleSendEmail = async () => {
    if (!generatedQuote) return;
    try {
      await dispatchQuoteViaEmail(generatedQuote);
      setEmailSent(true);
      alert(`Quote #${generatedQuote.quoteNumber} emailed successfully to ${generatedQuote.customerEmail}!`);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Email dispatch failed');
    }
  };

  const handleSendWhatsApp = async () => {
    if (!generatedQuote) return;
    try {
      const url = await dispatchQuoteViaWhatsApp(generatedQuote);
      setWhatsappUrl(url);
      window.open(url, '_blank');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'WhatsApp dispatch failed');
    }
  };

  const handlePrintPDF = () => {
    if (!generatedQuote) return;
    const html = generateQuotePDFHTML(generatedQuote);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl space-y-6">
        <div className="flex items-start justify-between border-b pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              SITARAM SERVICE PROPOSAL & QUOTE GENERATOR
            </span>
            <h2 className="font-serif text-2xl text-teal-900">
              {generatedQuote ? `Proposal #${generatedQuote.quoteNumber} (v${generatedQuote.version})` : 'Create Official Service Quote & PDF'}
            </h2>
          </div>
          <button onClick={onClose} className="rounded-full bg-stone-100 p-2 text-stone-500 hover:bg-stone-200">
            
          </button>
        </div>

        {!generatedQuote ? (
          <form onSubmit={(e) => void handleGenerateQuote(e)} className="space-y-4 text-xs">
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="block font-bold text-teal-900">Customer Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 w-full rounded-xl border p-2 text-xs"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-bold text-teal-900">Customer Email</label>
                <input
                  type="email"
                  required
                  className="mt-1 w-full rounded-xl border p-2 text-xs"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-bold text-teal-900">Customer Phone / WhatsApp</label>
                <input
                  type="text"
                  required
                  className="mt-1 w-full rounded-xl border p-2 text-xs"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="block font-bold text-teal-900">Category</label>
                <select
                  className="mt-1 w-full rounded-xl border p-2 text-xs font-semibold text-teal-900"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as BusinessModuleCategory)}
                >
                  <option value="pitru-moksha-gaya">PitruMoksha Gaya</option>
                  <option value="ritual-services">Ritual Services</option>
                  <option value="travel-assistance">Travel Assistance</option>
                  <option value="vahi-records">Vahi Records</option>
                  <option value="religious-partners">Verified Priests</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-teal-900">Service Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 w-full rounded-xl border p-2 text-xs"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-bold text-teal-900">Preferred Date</label>
                <input
                  type="date"
                  className="mt-1 w-full rounded-xl border p-2 text-xs"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                />
              </div>
            </div>

            {/* Line Items Table */}
            <div className="space-y-2 border-t pt-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-teal-900 uppercase tracking-wider">Proposal Line Items</span>
                <button
                  type="button"
                  onClick={handleAddItem}
                  className="rounded-lg bg-amber-50 px-3 py-1 font-bold text-teal-900 border border-teal-900/20 hover:bg-amber-100"
                >
                  + Add Item
                </button>
              </div>

              {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Description"
                    className="flex-1 rounded-xl border p-2 text-xs"
                    value={item.description}
                    onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    min="1"
                    placeholder="Qty"
                    className="w-16 rounded-xl border p-2 text-xs text-center"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(idx, 'quantity', parseInt(e.target.value) || 1)}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Price (₹)"
                    className="w-28 rounded-xl border p-2 text-xs text-right"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(idx, 'unitPrice', parseInt(e.target.value) || 0)}
                    required
                  />
                  <span className="w-24 text-right font-bold text-teal-900">
                    ₹{(item.quantity * item.unitPrice).toLocaleString()}
                  </span>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      className="text-red-600 font-bold p-1 hover:text-red-800"
                    >
                      
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block font-bold text-teal-900">Inclusions (Comma-separated)</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-xl border p-2 text-xs"
                  value={inclusionsText}
                  onChange={(e) => setInclusionsText(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-bold text-teal-900">Exclusions (Comma-separated)</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-xl border p-2 text-xs"
                  value={exclusionsText}
                  onChange={(e) => setExclusionsText(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-teal-900">Terms & Conditions</label>
              <input
                type="text"
                className="mt-1 w-full rounded-xl border p-2 text-xs"
                value={termsText}
                onChange={(e) => setTermsText(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-teal-800 px-6 py-2.5 font-bold text-white shadow hover:bg-teal-900"
              >
                {isSubmitting ? 'Generating Proposal…' : 'Create Draft Quote (Requires Admin Approval) '}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6 text-xs">
            {/* Generated Quote Summary Header */}
            <div className="rounded-xl border border-teal-900/20 bg-amber-50/50 p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200 pb-3">
                <div>
                  <span className="font-mono font-bold text-teal-900 text-sm">Quote ID: {generatedQuote.id}</span>
                  <div className="text-stone-600 font-semibold">Total Amount: ₹{generatedQuote.totalAmount.toLocaleString()} (Incl. GST)</div>
                </div>
                <span className={`rounded-full px-3 py-1 font-bold ${
                  generatedQuote.status === 'APPROVED' ? 'bg-green-100 text-green-800 border border-green-300' :
                  generatedQuote.status === 'SENT' ? 'bg-teal-100 text-teal-800 border border-teal-300' :
                  'bg-amber-100 text-amber-800 border border-amber-300'
                }`}>
                  STATUS: {generatedQuote.status}
                </span>
              </div>

              {generatedQuote.status === 'DRAFT' && (
                <div className="rounded-lg bg-amber-100 p-3 text-amber-900 border border-amber-300 font-medium">
                   <strong>Administrator Approval Required:</strong> Quotes must be reviewed and approved by an administrator before Email or WhatsApp dispatch.
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid gap-3 sm:grid-cols-4">
              <button
                onClick={handlePrintPDF}
                className="rounded-xl border border-teal-900/30 bg-white p-3 font-bold text-teal-900 shadow-sm hover:bg-stone-50"
              >
                 Download PDF
              </button>

              {generatedQuote.status === 'DRAFT' ? (
                <button
                  onClick={() => void handleApproveByAdmin()}
                  className="rounded-xl bg-amber-600 p-3 font-bold text-white shadow-sm hover:bg-amber-700 sm:col-span-3"
                >
                   Approve Proposal (Admin Review)
                </button>
              ) : (
                <>
                  <button
                    onClick={() => void handleSendEmail()}
                    className={`rounded-xl p-3 font-bold text-white shadow-sm ${
                      emailSent ? 'bg-green-700' : 'bg-teal-800 hover:bg-teal-900'
                    }`}
                  >
                    {emailSent ? ' Email Sent!' : ' Dispatch Email'}
                  </button>

                  <button
                    onClick={() => void handleSendWhatsApp()}
                    className="rounded-xl bg-emerald-600 p-3 font-bold text-white shadow-sm hover:bg-emerald-700 sm:col-span-2"
                  >
                     Dispatch WhatsApp
                  </button>
                </>
              )}
            </div>

            {whatsappUrl && (
              <div className="rounded-lg bg-emerald-50 p-3 text-[11px] text-emerald-900 border border-emerald-200">
                WhatsApp Link: <a href={whatsappUrl} target="_blank" rel="noreferrer" className="underline font-bold">{whatsappUrl}</a>
              </div>
            )}

            <div className="flex justify-end pt-4 border-t">
              <button
                onClick={() => setGeneratedQuote(null)}
                className="rounded-xl border border-stone-300 px-4 py-2 font-semibold text-stone-700 hover:bg-stone-100"
              >
                 Create Another Proposal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
