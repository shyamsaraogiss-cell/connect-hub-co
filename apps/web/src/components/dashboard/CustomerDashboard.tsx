'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';

type CustomerTab =
  | 'home'
  | 'profile'
  | 'inquiries'
  | 'bookings'
  | 'timeline'
  | 'quotes'
  | 'documents'
  | 'notifications'
  | 'ai-history'
  | 'support'
  | 'settings';

export function CustomerDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<CustomerTab>('home');

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* Customer Dashboard Header */}
      <header className="sticky top-0 z-40 border-b border-teal-900/20 bg-teal-900 px-6 py-4 text-white shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-amber-400"></span>
            <div>
              <h1 className="font-serif text-xl font-bold tracking-wide text-white">
                Connect Hub Co. <span className="text-amber-300 font-sans text-xs font-normal">CUSTOMER PORTAL</span>
              </h1>
              <p className="text-[11px] text-teal-200">
                Sacred Rituals, Ancestral Coordination & Travel Assistance
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="text-right">
              <div className="font-bold text-white">{user?.name || 'Family Customer'}</div>
              <div className="text-[10px] text-amber-300 uppercase font-mono">Seeking Family Customer</div>
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

      {/* Main Container */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-6">
        {/* Navigation Sidebar / Tabs */}
        <div className="flex flex-wrap gap-1.5 rounded-2xl bg-stone-200/80 p-2 text-xs font-bold">
          {[
            { id: 'home', label: ' Dashboard Home' },
            { id: 'profile', label: ' Profile Management' },
            { id: 'inquiries', label: ' My Inquiries' },
            { id: 'bookings', label: ' My Bookings' },
            { id: 'timeline', label: '⏱️ Booking Status Timeline' },
            { id: 'quotes', label: ' Quote History' },
            { id: 'documents', label: ' Uploaded Documents' },
            { id: 'notifications', label: ' Notification Center' },
            { id: 'ai-history', label: ' AI Conversation History' },
            { id: 'support', label: ' Support Requests' },
            { id: 'settings', label: ' Account Settings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as CustomerTab)}
              className={`rounded-xl px-3.5 py-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-teal-800 text-white shadow'
                  : 'text-stone-700 hover:bg-stone-100 hover:text-teal-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 1. DASHBOARD HOME */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-teal-900/20 bg-white p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-amber-600">
                  FAMILY DASHBOARD HOME
                </span>
                <h2 className="mt-1 font-serif text-3xl text-teal-900">Namaste, {user?.name || 'Family Customer'}</h2>
                <p className="mt-1 text-sm text-stone-600">
                  Manage your sacred inquiries, upcoming ritual schedules, and ancestral lineage details.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-xs">
                <Link href="/pitru-moksha-gaya" className="rounded-xl bg-teal-800 px-4 py-2.5 font-bold text-white shadow hover:bg-teal-900">
                  + New Gaya Ji Inquiry
                </Link>
                <Link href="/ritual-services" className="rounded-xl border border-teal-800/30 bg-amber-50 px-4 py-2.5 font-bold text-teal-900 hover:bg-amber-100">
                  + Book Home Puja
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-teal-900/20 bg-white p-5 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500">Active Inquiries</div>
                <div className="mt-2 font-serif text-3xl font-bold text-teal-900">2</div>
                <div className="mt-1 text-[11px] text-amber-700 font-semibold">Under Review</div>
              </div>
              <div className="rounded-2xl border border-teal-900/20 bg-white p-5 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500">Confirmed Bookings</div>
                <div className="mt-2 font-serif text-3xl font-bold text-teal-900">1</div>
                <div className="mt-1 text-[11px] text-green-700 font-semibold">Gaya Ji Yatra</div>
              </div>
              <div className="rounded-2xl border border-teal-900/20 bg-white p-5 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500">Saved Gotra Profile</div>
                <div className="mt-2 font-serif text-2xl font-bold text-amber-600">Kashyap</div>
                <div className="mt-1 text-[11px] text-stone-600">3 Ancestors Registered</div>
              </div>
              <div className="rounded-2xl border border-teal-900/20 bg-white p-5 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500">Coordinator Status</div>
                <div className="mt-2 font-serif text-lg font-bold text-teal-900">Assigned</div>
                <div className="mt-1 text-[11px] text-teal-700 font-semibold">Gaya Ji Desk Lead</div>
              </div>
            </div>
          </div>
        )}

        {/* 2. PROFILE MANAGEMENT */}
        {activeTab === 'profile' && (
          <div className="rounded-2xl border border-teal-900/20 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-2xl text-teal-900">Family Profile & Personal Information</h3>
            <div className="grid gap-4 sm:grid-cols-2 text-xs">
              <div><strong>Full Name:</strong> {user?.name || 'Family Customer'}</div>
              <div><strong>Email:</strong> {user?.email || 'customer@example.com'}</div>
              <div><strong>Phone / WhatsApp:</strong> +91 9876543210</div>
              <div><strong>Country / Residence:</strong> USA (NRI Coordination)</div>
            </div>
          </div>
        )}

        {/* 3. MY INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="rounded-2xl border border-teal-900/20 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-2xl text-teal-900">My Submitted Inquiries</h3>
            <div className="space-y-3 text-xs">
              <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="font-mono font-bold text-teal-900">PMG-88102</span>
                  <h4 className="font-bold text-stone-900 text-sm mt-0.5">PitruMoksha Gaya Ritual Guidance</h4>
                  <p className="text-stone-600 mt-1">Submitted on July 25, 2026 · Preferred Date: August 15, 2026</p>
                </div>
                <span className="rounded-full border border-teal-300 bg-teal-100 px-3 py-1 font-bold text-teal-800">
                  UNDER REVIEW
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 4. MY BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="rounded-2xl border border-teal-900/20 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-2xl text-teal-900">My Confirmed Ritual Bookings</h3>
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm text-xs space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
                <div>
                  <span className="font-mono font-bold text-teal-900 text-sm">BK-482019</span>
                  <h4 className="font-bold text-stone-900 text-base">Complete Pitru Moksha Seva</h4>
                </div>
                <span className="rounded-full bg-teal-800 px-3 py-1 font-bold text-white">CONFIRMED</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 text-stone-700">
                <div><strong>Category:</strong> PitruMoksha Gaya</div>
                <div><strong>Scheduled:</strong> August 15, 2026 (09:00 AM)</div>
                <div><strong>Assigned Pandit Ji:</strong> Acharya Pandit Vidyanand Ji</div>
                <div><strong>Location:</strong> Vishnupad Temple, Gaya Ji</div>
              </div>
            </div>
          </div>
        )}

        {/* 5. BOOKING STATUS TIMELINE */}
        {activeTab === 'timeline' && (
          <div className="rounded-2xl border border-teal-900/20 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-2xl text-teal-900">Booking Status Timeline Tracker</h3>
            <div className="rounded-xl border border-amber-300 bg-amber-50/80 p-5 space-y-4 text-xs">
              <div className="font-bold text-teal-900">Booking Reference: BK-482019</div>
              <div className="grid grid-cols-5 gap-2 text-center text-[10px] font-bold">
                <div className="rounded-lg bg-teal-800 text-white p-2">1. NEW</div>
                <div className="rounded-lg bg-teal-800 text-white p-2">2. UNDER REVIEW</div>
                <div className="rounded-lg bg-teal-800 text-white p-2">3. AWAITING CONFIRMATION</div>
                <div className="rounded-lg bg-amber-600 text-white p-2 ring-2 ring-amber-400">4. CONFIRMED</div>
                <div className="rounded-lg bg-stone-200 text-stone-600 p-2">5. COMPLETED</div>
              </div>
            </div>
          </div>
        )}

        {/* 6. QUOTE HISTORY PLACEHOLDER */}
        {activeTab === 'quotes' && (
          <div className="rounded-2xl border border-teal-900/20 bg-white p-8 shadow-sm text-center space-y-3">
            <span className="text-3xl"></span>
            <h3 className="font-serif text-2xl text-teal-900">Quote History</h3>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              All custom service quotes undergo human coordinator verification before release. Issued quotes will appear here.
            </p>
          </div>
        )}

        {/* 7. UPLOADED DOCUMENTS PLACEHOLDER */}
        {activeTab === 'documents' && (
          <div className="rounded-2xl border border-teal-900/20 bg-white p-8 shadow-sm text-center space-y-3">
            <span className="text-3xl"></span>
            <h3 className="font-serif text-2xl text-teal-900">Uploaded Lineage Documents</h3>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              Upload genealogical notes, family ledgers, or identity verification documents for coordinator review.
            </p>
          </div>
        )}

        {/* 8. NOTIFICATION CENTER PLACEHOLDER */}
        {activeTab === 'notifications' && (
          <div className="rounded-2xl border border-teal-900/20 bg-white p-8 shadow-sm text-center space-y-3">
            <span className="text-3xl"></span>
            <h3 className="font-serif text-2xl text-teal-900">Notification Center</h3>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              Updates regarding ritual schedules, coordinator notes, and booking confirmations.
            </p>
          </div>
        )}

        {/* 9. AI CONVERSATION HISTORY */}
        {activeTab === 'ai-history' && (
          <div className="rounded-2xl border border-teal-900/20 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-2xl text-teal-900">Ask GenZ AI Conversation History</h3>
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 text-xs space-y-2">
              <div className="font-bold text-teal-900">Interaction Log #AI-9401</div>
              <p className="text-stone-700">&quot;Asked about Gaya Ji Pind Daan dates and NRI remote video live stream.&quot;</p>
              <div className="text-[10px] text-stone-500">Collected on July 25, 2026</div>
            </div>
          </div>
        )}

        {/* 10. SUPPORT REQUESTS */}
        {activeTab === 'support' && (
          <div className="rounded-2xl border border-teal-900/20 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-2xl text-teal-900">Customer Support & Assistance</h3>
            <p className="text-xs text-stone-600">
              Need assistance with your booking or arrival in Gaya Ji? Reach our dedicated coordination desk.
            </p>
            <Link href="/contact?topic=customer-support" className="inline-block rounded-xl bg-teal-800 px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-teal-900">
              Contact Support Desk 
            </Link>
          </div>
        )}

        {/* 11. ACCOUNT SETTINGS */}
        {activeTab === 'settings' && (
          <div className="rounded-2xl border border-teal-900/20 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-2xl text-teal-900">Account & Security Settings</h3>
            <div className="space-y-3 text-xs">
              <div><strong>Password:</strong>  <button className="ml-2 font-bold text-amber-600 underline">Change</button></div>
              <div><strong>Preferred Channel:</strong> WhatsApp (+91 9876543210)</div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
