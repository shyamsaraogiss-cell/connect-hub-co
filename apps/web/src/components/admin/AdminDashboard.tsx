'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { CRMLeadManager } from '@/components/crm/CRMLeadManager';
import BookingsPage from '@/app/bookings/page';
import CustomersPage from '@/app/customers/page';
import PartnersPage from '@/app/partners/page';
import { getAllPayments, refundPaymentTransaction } from '@/services/payment.api';
import { QuoteGeneratorModal } from '@/components/quote/QuoteGeneratorModal';
import type { PaymentTransaction } from '@/types/payment';

type AdminTab =
  | 'overview'
  | 'crm'
  | 'bookings'
  | 'customers'
  | 'partners'
  | 'services'
  | 'ai-review'
  | 'quote-review'
  | 'payments';

export function AdminDashboard() {
  const { user, hasRole, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [payments, setPayments] = useState<PaymentTransaction[]>(getAllPayments());
  const [selectedTxn, setSelectedTxn] = useState<PaymentTransaction | null>(null);
  const [refundAmount, setRefundAmount] = useState('');
  const [refundReason, setRefundReason] = useState('');

  // Guard: Role-based access control (Admin / Staff only)
  const isAuthorized = hasRole(['FOUNDER', 'ADMIN']);

  if (!isAuthorized) {
    return (
      <div className="grid min-h-[70vh] place-items-center bg-stone-50 p-6 text-center">
        <div className="max-w-md rounded-2xl border border-red-200 bg-white p-8 shadow-lg">
          <span className="text-3xl">🔒</span>
          <h2 className="mt-3 font-serif text-2xl text-teal-900">Access Restricted</h2>
          <p className="mt-2 text-xs text-stone-600">
            The Admin Dashboard requires Administrator or Staff credentials. Please sign in with an authorized account.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              href="/login"
              className="rounded-xl bg-teal-800 px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-teal-900"
            >
              Sign in as Admin
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* Admin Header */}
      <header className="sticky top-0 z-40 border-b border-teal-900/20 bg-teal-950 px-6 py-4 text-white shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-amber-400">✦</span>
            <div>
              <h1 className="font-serif text-xl font-bold tracking-wide text-white">
                Connect Hub Co. <span className="text-amber-400 font-sans text-xs font-normal">ADMIN ERP</span>
              </h1>
              <p className="text-[11px] text-teal-200">
                Unified Operations, CRM, AI Review & Service Dispatch
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="text-right">
              <div className="font-bold text-white">{user?.name || 'Administrator'}</div>
              <div className="text-[10px] text-amber-300 uppercase font-mono">{user?.role || 'ADMIN'}</div>
            </div>
            <button
              onClick={() => void logout()}
              className="rounded-lg bg-teal-800 px-3 py-1.5 font-bold text-white hover:bg-teal-700"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Navigation Sidebar */}
          <aside className="lg:col-span-1 space-y-1 rounded-2xl border border-teal-900/15 bg-white p-3 shadow-sm text-xs font-bold">
            <div className="px-3 py-2 text-[10px] font-black uppercase tracking-wider text-amber-600">
              Admin Navigation
            </div>

            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full rounded-xl px-3.5 py-2.5 text-left transition-all ${
                activeTab === 'overview'
                  ? 'bg-teal-800 text-white shadow'
                  : 'text-stone-700 hover:bg-amber-50 hover:text-teal-900'
              }`}
            >
              📊 Overview & Summary
            </button>

            <button
              onClick={() => setActiveTab('crm')}
              className={`w-full rounded-xl px-3.5 py-2.5 text-left transition-all ${
                activeTab === 'crm'
                  ? 'bg-teal-800 text-white shadow'
                  : 'text-stone-700 hover:bg-amber-50 hover:text-teal-900'
              }`}
            >
              📑 CRM & Inquiries
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full rounded-xl px-3.5 py-2.5 text-left transition-all ${
                activeTab === 'bookings'
                  ? 'bg-teal-800 text-white shadow'
                  : 'text-stone-700 hover:bg-amber-50 hover:text-teal-900'
              }`}
            >
              📅 Booking Management
            </button>

            <button
              onClick={() => setActiveTab('customers')}
              className={`w-full rounded-xl px-3.5 py-2.5 text-left transition-all ${
                activeTab === 'customers'
                  ? 'bg-teal-800 text-white shadow'
                  : 'text-stone-700 hover:bg-amber-50 hover:text-teal-900'
              }`}
            >
              👥 Customers & Families
            </button>

            <button
              onClick={() => setActiveTab('partners')}
              className={`w-full rounded-xl px-3.5 py-2.5 text-left transition-all ${
                activeTab === 'partners'
                  ? 'bg-teal-800 text-white shadow'
                  : 'text-stone-700 hover:bg-amber-50 hover:text-teal-900'
              }`}
            >
              🪔 Religious Partners
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full rounded-xl px-3.5 py-2.5 text-left transition-all ${
                activeTab === 'services'
                  ? 'bg-teal-800 text-white shadow'
                  : 'text-stone-700 hover:bg-amber-50 hover:text-teal-900'
              }`}
            >
              📜 Services Catalog
            </button>

            <button
              onClick={() => setActiveTab('ai-review')}
              className={`w-full rounded-xl px-3.5 py-2.5 text-left transition-all ${
                activeTab === 'ai-review'
                  ? 'bg-teal-800 text-white shadow'
                  : 'text-stone-700 hover:bg-amber-50 hover:text-teal-900'
              }`}
            >
              🤖 AI Conversation Review
            </button>

            <button
              onClick={() => setActiveTab('quote-review')}
              className={`w-full rounded-xl px-3.5 py-2.5 text-left transition-all ${
                activeTab === 'quote-review'
                  ? 'bg-teal-800 text-white shadow'
                  : 'text-stone-700 hover:bg-amber-50 hover:text-teal-900'
              }`}
            >
              💬 Quote Review
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`w-full rounded-xl px-3.5 py-2.5 text-left transition-all ${
                activeTab === 'payments'
                  ? 'bg-teal-800 text-white shadow'
                  : 'text-stone-700 hover:bg-amber-50 hover:text-teal-900'
              }`}
            >
              💳 Payment Review & Refunds
            </button>
          </aside>

          {/* Active View Container */}
          <main className="lg:col-span-4 space-y-6">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Summary Metric Cards */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="rounded-2xl border border-teal-900/20 bg-white p-5 shadow-sm">
                    <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Total Inquiries (M2)
                    </div>
                    <div className="mt-2 font-serif text-3xl font-bold text-teal-900">48</div>
                    <div className="mt-1 text-[11px] text-green-700 font-semibold">
                      ↑ +12% from last week
                    </div>
                  </div>

                  <div className="rounded-2xl border border-teal-900/20 bg-white p-5 shadow-sm">
                    <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Active Bookings (M5)
                    </div>
                    <div className="mt-2 font-serif text-3xl font-bold text-teal-900">24</div>
                    <div className="mt-1 text-[11px] text-amber-700 font-semibold">
                      8 Awaiting Confirmation
                    </div>
                  </div>

                  <div className="rounded-2xl border border-teal-900/20 bg-white p-5 shadow-sm">
                    <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      Verified Partners
                    </div>
                    <div className="mt-2 font-serif text-3xl font-bold text-teal-900">18</div>
                    <div className="mt-1 text-[11px] text-teal-700 font-semibold">
                      Gaya Ji & Kashi Network
                    </div>
                  </div>

                  <div className="rounded-2xl border border-teal-900/20 bg-white p-5 shadow-sm">
                    <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                      AI Queries Handled (M4)
                    </div>
                    <div className="mt-2 font-serif text-3xl font-bold text-teal-900">142</div>
                    <div className="mt-1 text-[11px] text-teal-700 font-semibold">
                      98% Solved via Q&A Tree
                    </div>
                  </div>
                </div>

                {/* System Overview Dashboard Panel */}
                <div className="rounded-2xl border border-teal-900/20 bg-white p-6 shadow-sm space-y-4">
                  <h2 className="font-serif text-2xl text-teal-900">System Activity Overview</h2>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    The Connect Hub Co. Unified Admin Dashboard manages end-to-end Operations across all 5 business modules: 
                    <strong>PitruMoksha Gaya</strong>, <strong>Ritual Services</strong>, <strong>Sacred Travel</strong>, <strong>Vahi Records</strong>, and <strong>Religious Partner Network</strong>.
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2 text-xs">
                    <div className="rounded-xl border border-stone-200 bg-amber-50/50 p-4">
                      <div className="font-bold text-teal-900">📑 Quick CRM Action</div>
                      <p className="mt-1 text-stone-600">
                        8 new inquiries received from GenZ Ritual AI require coordinator follow-up.
                      </p>
                      <button
                        onClick={() => setActiveTab('crm')}
                        className="mt-3 font-bold text-teal-800 underline hover:text-amber-600"
                      >
                        Open CRM Management →
                      </button>
                    </div>

                    <div className="rounded-xl border border-stone-200 bg-amber-50/50 p-4">
                      <div className="font-bold text-teal-900">📅 Booking Schedules</div>
                      <p className="mt-1 text-stone-600">
                        12 Gaya Ji Pind Daan bookings scheduled for the upcoming tithi.
                      </p>
                      <button
                        onClick={() => setActiveTab('bookings')}
                        className="mt-3 font-bold text-teal-800 underline hover:text-amber-600"
                      >
                        Manage Bookings →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CRM TAB */}
            {activeTab === 'crm' && <CRMLeadManager />}

            {/* BOOKINGS TAB */}
            {activeTab === 'bookings' && <BookingsPage />}

            {/* CUSTOMERS TAB */}
            {activeTab === 'customers' && <CustomersPage />}

            {/* PARTNERS TAB */}
            {activeTab === 'partners' && <PartnersPage />}

            {/* SERVICES CATALOG TAB */}
            {activeTab === 'services' && (
              <div className="rounded-2xl border border-teal-900/20 bg-white p-6 shadow-sm space-y-4">
                <h2 className="font-serif text-2xl text-teal-900">Services Catalog Administration</h2>
                <p className="text-xs text-stone-600">
                  Manage Vaidik service listings, package offerings, and category classifications.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/services"
                    className="rounded-xl bg-teal-800 px-4 py-2 text-xs font-bold text-white shadow hover:bg-teal-900"
                  >
                    View Public Catalog Page →
                  </Link>
                </div>
              </div>
            )}

            {/* AI CONVERSATION REVIEW TAB */}
            {activeTab === 'ai-review' && (
              <div className="rounded-2xl border border-teal-900/20 bg-white p-6 shadow-sm space-y-4">
                <h2 className="font-serif text-2xl text-teal-900">GenZ Ritual AI Conversation Review</h2>
                <p className="text-xs text-stone-600">
                  Review user interactions, prompt analytics, and escalated questions from the AI assistant shell.
                </p>
                <div className="space-y-3 text-xs">
                  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4">
                    <div className="flex justify-between font-bold text-teal-900">
                      <span>Escalated Query #AI-9401</span>
                      <span className="font-mono text-[10px] text-amber-700">Needs Admin Review</span>
                    </div>
                    <p className="mt-1 text-stone-700 font-semibold">
                      &quot;Can Pind Daan be performed for 3 generations on the same day during Amavasya?&quot;
                    </p>
                    <div className="mt-2 text-[10px] text-stone-500">
                      Escalated from PitruMoksha Gaya AI Shell on 2026-07-25 09:12:00
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* QUOTE REVIEW & DISPATCH TAB */}
            {activeTab === 'quote-review' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-teal-900/20 bg-white p-6 shadow-sm">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                      SITARAM PROPOSAL & DISPATCH DESK
                    </span>
                    <h2 className="font-serif text-2xl text-teal-900">Quote Generation, PDF & Multi-Channel Dispatch</h2>
                    <p className="mt-1 text-xs text-stone-600">
                      Generate official Vaidik service proposals, print PDF documents, and dispatch via Email & WhatsApp.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowQuoteModal(true)}
                    className="rounded-xl bg-teal-800 px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-teal-900"
                  >
                    + Create New Official Quote
                  </button>
                </div>

                {showQuoteModal && (
                  <QuoteGeneratorModal
                    initialCustomerName="Shyam Sharma"
                    initialCustomerEmail="shyam@example.com"
                    initialCustomerPhone="+919876543210"
                    onClose={() => setShowQuoteModal(false)}
                  />
                )}
              </div>
            )}

            {/* PAYMENTS REVIEW & REFUNDS TAB */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-teal-900/20 bg-white p-6 shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                    SITARAM PAYMENT OPERATIONS & REFUNDS
                  </span>
                  <h2 className="font-serif text-2xl text-teal-900">Payment Audit, Receipts & Administrator Refunds</h2>
                  <p className="mt-1 text-xs text-stone-600">
                    Review verified payment receipts, audit gateway callbacks, and process administrator-initiated refunds.
                  </p>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-teal-900/20 bg-white shadow-sm">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b bg-stone-50 uppercase tracking-wider text-teal-900 font-bold">
                        <th className="p-4">Payment ID / Receipt</th>
                        <th className="p-4">Customer Details</th>
                        <th className="p-4">Category / Service</th>
                        <th className="p-4">Amount & Tax</th>
                        <th className="p-4">Payment Method</th>
                        <th className="p-4">Status / Refund</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {payments.map((p) => (
                        <tr key={p.id} className="hover:bg-amber-50/40">
                          <td className="p-4">
                            <div className="font-mono font-bold text-teal-900">{p.id}</div>
                            <div className="text-[10px] text-stone-500 font-mono">Receipt: {p.receiptNumber}</div>
                            <div className="text-[10px] text-stone-400 font-mono">Ref: {p.transactionRef}</div>
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-stone-900">{p.customerName}</div>
                            <div className="text-stone-600">{p.customerPhone}</div>
                            <div className="text-[10px] text-stone-500">{p.customerEmail}</div>
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-teal-800">{p.category.replaceAll('-', ' ').toUpperCase()}</div>
                            <div className="text-stone-600">{p.serviceName}</div>
                          </td>
                          <td className="p-4 font-bold text-stone-900">
                            ₹{p.amount.toLocaleString()} INR
                            <div className="text-[10px] text-stone-500 font-normal">Taxes: ₹{p.taxAmount}</div>
                          </td>
                          <td className="p-4">
                            <span className="rounded-md bg-stone-100 px-2 py-1 font-semibold text-stone-800">
                              {p.method}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                              p.status === 'SUCCESSFUL' ? 'bg-green-100 text-green-800 border border-green-300' :
                              p.status === 'REFUNDED' ? 'bg-purple-100 text-purple-800 border border-purple-300' :
                              'bg-amber-100 text-amber-800 border border-amber-300'
                            }`}>
                              {p.status}
                            </span>
                            {p.refundStatus !== 'NONE' && (
                              <div className="text-[10px] font-bold text-purple-700 mt-1">
                                Refund: {p.refundStatus} (₹{p.refundedAmount?.toLocaleString()})
                              </div>
                            )}
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => setSelectedTxn(p)}
                              className="rounded-lg bg-teal-800 px-3 py-1.5 font-bold text-white shadow hover:bg-teal-900"
                            >
                              Manage Payment →
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Refund & Audit Modal */}
                {selectedTxn && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4">
                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl space-y-5 text-xs">
                      <div className="flex justify-between border-b pb-3">
                        <div>
                          <span className="font-bold text-amber-600 uppercase">Payment Audit & Refund Management</span>
                          <h3 className="font-serif text-xl text-teal-900">{selectedTxn.receiptNumber} ({selectedTxn.id})</h3>
                        </div>
                        <button onClick={() => setSelectedTxn(null)} className="rounded-full bg-stone-100 p-2 text-stone-500">✕</button>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2 bg-stone-50 p-4 rounded-xl">
                        <div><strong>Amount:</strong> ₹{selectedTxn.amount.toLocaleString()} INR</div>
                        <div><strong>Transaction Ref:</strong> {selectedTxn.transactionRef}</div>
                        <div><strong>Gateway Ref:</strong> {selectedTxn.gatewayRef}</div>
                        <div><strong>Status:</strong> {selectedTxn.status}</div>
                      </div>

                      {/* Process Refund Form */}
                      {selectedTxn.status === 'SUCCESSFUL' && (
                        <div className="rounded-xl border border-purple-200 bg-purple-50/60 p-4 space-y-3">
                          <h4 className="font-bold text-purple-900 uppercase">Process Administrator Refund</h4>
                          <div className="grid gap-3 sm:grid-cols-2">
                            <div>
                              <label className="block font-bold text-purple-900">Refund Amount (₹)</label>
                              <input
                                type="number"
                                max={selectedTxn.amount}
                                className="mt-1 w-full rounded-xl border p-2 bg-white"
                                value={refundAmount}
                                onChange={(e) => setRefundAmount(e.target.value)}
                                placeholder={`Max ₹${selectedTxn.amount}`}
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-purple-900">Recorded Refund Reason</label>
                              <input
                                type="text"
                                className="mt-1 w-full rounded-xl border p-2 bg-white"
                                value={refundReason}
                                onChange={(e) => setRefundReason(e.target.value)}
                                placeholder="Mandatory reason..."
                              />
                            </div>
                          </div>
                          <button
                            onClick={async () => {
                              const amt = parseFloat(refundAmount);
                              if (!amt || amt <= 0 || !refundReason.trim()) {
                                alert('Please enter a valid refund amount and recorded reason.');
                                return;
                              }
                              try {
                                const updated = await refundPaymentTransaction(selectedTxn.id, amt, refundReason.trim(), 'Senior Administrator');
                                setSelectedTxn(updated);
                                setPayments(getAllPayments());
                                alert(`Successfully processed refund of ₹${amt.toLocaleString()} for ${updated.receiptNumber}!`);
                              } catch (err) {
                                alert(err instanceof Error ? err.message : 'Refund failed');
                              }
                            }}
                            className="rounded-xl bg-purple-700 px-4 py-2 font-bold text-white shadow hover:bg-purple-800"
                          >
                            Execute Refund →
                          </button>
                        </div>
                      )}

                      {/* Audit History Timeline */}
                      <div>
                        <h4 className="font-bold text-teal-900 uppercase mb-2">Auditable Payment Log History</h4>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {selectedTxn.auditHistory.map((h) => (
                            <div key={h.id} className="rounded-lg bg-stone-50 p-2.5 text-[11px] border">
                              <div className="flex justify-between font-bold text-stone-800">
                                <span>{h.author} ({h.status})</span>
                                <span className="font-mono text-stone-500">{new Date(h.timestamp).toLocaleString()}</span>
                              </div>
                              <p className="mt-1 text-stone-600">{h.note}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
