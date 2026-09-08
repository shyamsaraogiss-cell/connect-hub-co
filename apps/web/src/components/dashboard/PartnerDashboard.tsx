'use client';

import React, { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';

type PartnerTab =
  | 'home'
  | 'profile'
  | 'categories'
  | 'locations'
  | 'availability'
  | 'inquiries'
  | 'bookings'
  | 'status-updates'
  | 'documents'
  | 'performance'
  | 'settings';

export function PartnerDashboard() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<PartnerTab>('home');

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      {/* Religious Partner Header */}
      <header className="sticky top-0 z-40 border-b border-teal-900/20 bg-teal-950 px-6 py-4 text-white shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-amber-400"></span>
            <div>
              <h1 className="font-serif text-xl font-bold tracking-wide text-white">
                Connect Hub Co. <span className="text-amber-300 font-sans text-xs font-normal">RELIGIOUS PARTNER PORTAL</span>
              </h1>
              <p className="text-[11px] text-teal-200">
                Verified Pandit, Purohit & Panda Service Network
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="text-right">
              <div className="font-bold text-white">{user?.name || 'Acharya Pandit Ji'}</div>
              <div className="text-[10px] text-amber-300 uppercase font-mono">Verified Religious Partner</div>
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
            { id: 'categories', label: ' Service Categories' },
            { id: 'locations', label: ' Service Locations' },
            { id: 'availability', label: ' Availability Management' },
            { id: 'inquiries', label: ' Assigned Inquiries' },
            { id: 'bookings', label: ' Assigned Bookings' },
            { id: 'status-updates', label: '⏱️ Status Updates' },
            { id: 'documents', label: ' Document Status' },
            { id: 'performance', label: ' Performance Summary' },
            { id: 'settings', label: ' Account Settings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as PartnerTab)}
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
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-widest text-amber-600">
                    RELIGIOUS PARTNER HOME
                  </span>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-800 border border-green-300">
                     VERIFIED PARTNER
                  </span>
                </div>
                <h2 className="mt-1 font-serif text-3xl text-teal-900">Pranam, {user?.name || 'Acharya Pandit Ji'}</h2>
                <p className="mt-1 text-sm text-stone-600">
                  Manage your assigned ritual ceremonies, family appointments, and schedule availability.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-teal-900/20 bg-white p-5 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500">Assigned Ceremonies</div>
                <div className="mt-2 font-serif text-3xl font-bold text-teal-900">4</div>
                <div className="mt-1 text-[11px] text-amber-700 font-semibold">2 Scheduled for This Week</div>
              </div>
              <div className="rounded-2xl border border-teal-900/20 bg-white p-5 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500">Completed Pujas</div>
                <div className="mt-2 font-serif text-3xl font-bold text-teal-900">38</div>
                <div className="mt-1 text-[11px] text-green-700 font-semibold">100% Conduct Compliance</div>
              </div>
              <div className="rounded-2xl border border-teal-900/20 bg-white p-5 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500">Primary Operating Base</div>
                <div className="mt-2 font-serif text-2xl font-bold text-teal-900">Gaya Ji</div>
                <div className="mt-1 text-[11px] text-stone-600">Phalgu & Vishnupad Area</div>
              </div>
              <div className="rounded-2xl border border-teal-900/20 bg-white p-5 shadow-sm">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-500">Pathways Registered</div>
                <div className="mt-2 font-serif text-lg font-bold text-amber-600">Path A & Path B</div>
                <div className="mt-1 text-[11px] text-stone-600">Ritual & Gaya PitruMoksha</div>
              </div>
            </div>
          </div>
        )}

        {/* 2. PROFILE MANAGEMENT */}
        {activeTab === 'profile' && (
          <div className="rounded-2xl border border-teal-900/20 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-2xl text-teal-900">Religious Partner Profile Credentials</h3>
            <div className="grid gap-3 sm:grid-cols-2 text-xs text-stone-800">
              <div><strong>Name:</strong> {user?.name || 'Acharya Pandit Vidyanand Ji'}</div>
              <div><strong>Title:</strong> Traditional Acharya / Panda</div>
              <div><strong>Years of Traditional Practice:</strong> 18 Years</div>
              <div><strong>Verification Status:</strong> Verified Partner</div>
            </div>
          </div>
        )}

        {/* 3. SERVICE CATEGORIES */}
        {activeTab === 'categories' && (
          <div className="rounded-2xl border border-teal-900/20 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-2xl text-teal-900">Registered Service Categories</h3>
            <div className="space-y-2 text-xs">
              <div className="rounded-xl border border-teal-200 bg-teal-50/60 p-3 font-semibold text-teal-900">
                 Path A: Ritual and Puja Partner (Griha Pravesh, Satyanarayan Katha, Havan)
              </div>
              <div className="rounded-xl border border-teal-200 bg-teal-50/60 p-3 font-semibold text-teal-900">
                 Path B: PitruMoksha Gaya Sacred Coordination (Pind Daan, Phalgu Bath, Vishnupad Seva)
              </div>
            </div>
          </div>
        )}

        {/* 4. SERVICE LOCATIONS */}
        {activeTab === 'locations' && (
          <div className="rounded-2xl border border-teal-900/20 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-2xl text-teal-900">Operating Service Locations</h3>
            <div className="space-y-2 text-xs">
              <div> <strong>Primary Location:</strong> Gaya Ji, Bihar (Vishnupad & Akshayavat Area)</div>
              <div> <strong>Secondary Location:</strong> Varanasi / Kashi, UP</div>
            </div>
          </div>
        )}

        {/* 5. AVAILABILITY MANAGEMENT */}
        {activeTab === 'availability' && (
          <div className="rounded-2xl border border-teal-900/20 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-2xl text-teal-900">Availability Management & Tithi Calendar</h3>
            <div className="rounded-xl border border-amber-300 bg-amber-50 p-5 text-xs text-stone-700 text-center">
               Calendar availability open for upcoming Pitru Paksha & Navratri tithis.
            </div>
          </div>
        )}

        {/* 6. ASSIGNED INQUIRIES PLACEHOLDER */}
        {activeTab === 'inquiries' && (
          <div className="rounded-2xl border border-teal-900/20 bg-white p-8 shadow-sm text-center space-y-3">
            <span className="text-3xl"></span>
            <h3 className="font-serif text-2xl text-teal-900">Assigned Inquiries</h3>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              Inquiries requiring initial priest consultation or Muhurat evaluation.
            </p>
          </div>
        )}

        {/* 7. ASSIGNED BOOKINGS PLACEHOLDER */}
        {activeTab === 'bookings' && (
          <div className="rounded-2xl border border-teal-900/20 bg-white p-8 shadow-sm text-center space-y-3">
            <span className="text-3xl"></span>
            <h3 className="font-serif text-2xl text-teal-900">Assigned Bookings</h3>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              Confirmed ritual assignments with seeking family details and scheduled ceremony times.
            </p>
          </div>
        )}

        {/* 8. STATUS UPDATES */}
        {activeTab === 'status-updates' && (
          <div className="rounded-2xl border border-teal-900/20 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-2xl text-teal-900">Status Updates & Ceremony Log</h3>
            <p className="text-xs text-stone-600">
              Update ceremony progress from In-Progress to Completed after conducting Sankalp.
            </p>
          </div>
        )}

        {/* 9. DOCUMENT STATUS PLACEHOLDER */}
        {activeTab === 'documents' && (
          <div className="rounded-2xl border border-teal-900/20 bg-white p-8 shadow-sm text-center space-y-3">
            <span className="text-3xl"></span>
            <h3 className="font-serif text-2xl text-teal-900">Document Verification Status</h3>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              Vaidik credentials, identity proof, and traditional Panda authorization documents.
            </p>
          </div>
        )}

        {/* 10. PERFORMANCE SUMMARY PLACEHOLDER */}
        {activeTab === 'performance' && (
          <div className="rounded-2xl border border-teal-900/20 bg-white p-8 shadow-sm text-center space-y-3">
            <span className="text-3xl"></span>
            <h3 className="font-serif text-2xl text-teal-900">Performance Summary</h3>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              Quality reviews, family feedback ratings, and operational compliance summary.
            </p>
          </div>
        )}

        {/* 11. ACCOUNT SETTINGS */}
        {activeTab === 'settings' && (
          <div className="rounded-2xl border border-teal-900/20 bg-white p-6 shadow-sm space-y-4">
            <h3 className="font-serif text-2xl text-teal-900">Partner Account Settings</h3>
            <div className="space-y-3 text-xs">
              <div><strong>Password:</strong>  <button className="ml-2 font-bold text-amber-600 underline">Change</button></div>
              <div><strong>Contact Preference:</strong> WhatsApp Phone (+91 9123456789)</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
