'use client';

import React, { useEffect, useState, useMemo } from 'react';
import type { CRMLead, LeadPriority, LeadStatus } from '@/types/crm';
import { convertLeadToBooking, getCRMLeads, updateCRMLead } from '@/services/crm.api';

const statusBadgeStyles: Record<LeadStatus, string> = {
  NEW: 'bg-blue-100 text-blue-800 border-blue-200',
  CONTACTED: 'bg-cyan-100 text-cyan-800 border-cyan-200',
  QUALIFIED: 'bg-teal-100 text-teal-800 border-teal-200',
  FOLLOW_UP: 'bg-amber-100 text-amber-800 border-amber-200',
  QUOTE_PENDING: 'bg-purple-100 text-purple-800 border-purple-200',
  CONVERTED: 'bg-green-100 text-green-800 border-green-200',
  CLOSED: 'bg-stone-100 text-stone-800 border-stone-200',
  LOST: 'bg-red-100 text-red-800 border-red-200',
};

const priorityBadgeStyles: Record<LeadPriority, string> = {
  LOW: 'text-stone-600 bg-stone-100',
  MEDIUM: 'text-blue-700 bg-blue-50',
  HIGH: 'text-amber-700 bg-amber-50 font-bold',
  URGENT: 'text-red-700 bg-red-50 font-bold animate-pulse',
};

type SortField = 'createdAt' | 'customerName' | 'priority' | 'status';
type SortOrder = 'asc' | 'desc';

export function CRMLeadManager() {
  const [leads, setLeads] = useState<CRMLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Search, Filter, Sort, Pagination States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Selected Lead & Modal States
  const [selectedLead, setSelectedLead] = useState<CRMLead | null>(null);
  const [newNote, setNewNote] = useState('');
  const [assignedAdmin, setAssignedAdmin] = useState('');
  const [newStatus, setNewStatus] = useState<LeadStatus>('NEW');
  const [newPriority, setNewPriority] = useState<LeadPriority>('MEDIUM');
  const [followUpDate, setFollowUpDate] = useState('');
  const [convertScheduledAt, setConvertScheduledAt] = useState('');
  const [isConverting, setIsConverting] = useState(false);

  const loadLeads = async () => {
    try {
      setError(null);
      const data = await getCRMLeads();
      setLeads(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load CRM leads.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    void getCRMLeads()
      .then((data) => {
        if (active) setLeads(data);
      })
      .catch((err) => {
        if (active) setError(err instanceof Error ? err.message : 'Unable to load CRM leads.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const openLeadModal = (lead: CRMLead) => {
    setSelectedLead(lead);
    setAssignedAdmin(lead.assignedAdmin || '');
    setNewStatus(lead.status);
    setNewPriority(lead.priority);
    setFollowUpDate(lead.followUpDate || '');
    setNewNote('');
  };

  const handleUpdateLead = async () => {
    if (!selectedLead) return;
    try {
      const updated = await updateCRMLead(selectedLead.id, {
        assignedAdmin,
        status: newStatus,
        priority: newPriority,
        followUpDate,
        newNote: newNote.trim() ? newNote.trim() : undefined,
      });
      setSelectedLead(updated);
      await loadLeads();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update lead');
    }
  };

  const handleConvertBooking = async () => {
    if (!selectedLead || !convertScheduledAt) return;
    setIsConverting(true);
    try {
      const result = await convertLeadToBooking(
        selectedLead.id,
        convertScheduledAt,
        'partner_default'
      );
      alert(`Successfully converted Lead ${selectedLead.id} to Booking ${result.bookingId}!`);
      setSelectedLead(result.lead);
      await loadLeads();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to convert lead to booking.');
    } finally {
      setIsConverting(false);
    }
  };

  // Filter, Search, and Sort Logic
  const processedLeads = useMemo(() => {
    let result = [...leads];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(
        (l) =>
          l.customerName.toLowerCase().includes(q) ||
          l.customerPhone.includes(q) ||
          l.customerEmail.toLowerCase().includes(q) ||
          l.id.toLowerCase().includes(q) ||
          (l.inquiryId && l.inquiryId.toLowerCase().includes(q)) ||
          l.customerCity.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (statusFilter !== 'ALL') {
      result = result.filter((l) => l.status === statusFilter);
    }

    // Category filter
    if (categoryFilter !== 'ALL') {
      result = result.filter((l) => l.category === categoryFilter);
    }

    // Sorting
    result.sort((a, b) => {
      let comp = 0;
      if (sortField === 'createdAt') {
        comp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortField === 'customerName') {
        comp = a.customerName.localeCompare(b.customerName);
      } else if (sortField === 'priority') {
        const priorityOrder: Record<LeadPriority, number> = { URGENT: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
        comp = priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortField === 'status') {
        comp = a.status.localeCompare(b.status);
      }
      return sortOrder === 'asc' ? comp : -comp;
    });

    return result;
  }, [leads, searchQuery, statusFilter, categoryFilter, sortField, sortOrder]);

  // Pagination calculation
  const totalPages = Math.ceil(processedLeads.length / pageSize) || 1;
  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return processedLeads.slice(start, start + pageSize);
  }, [processedLeads, currentPage, pageSize]);

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-teal-900/20 bg-white p-6 shadow-sm">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-amber-600">
            SITARAM CRM & INQUIRY SYSTEM
          </span>
          <h1 className="mt-1 font-serif text-3xl text-teal-900">Lead & Inquiry Management</h1>
          <p className="mt-1 text-sm text-stone-600">
            Search, filter, track follow-ups, and convert leads into verified bookings across all 5 business modules.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => void loadLeads()}
            className="rounded-xl border border-teal-900/30 bg-amber-50 px-4 py-2.5 text-xs font-bold text-teal-900 hover:bg-amber-100"
          >
            ↻ Refresh Leads
          </button>
        </div>
      </div>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

      {/* Search & Sort Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-teal-900/15 bg-white p-4 shadow-sm">
        {/* Search Input */}
        <div className="relative min-w-[280px] flex-1">
          <input
            type="text"
            className="w-full rounded-xl border border-teal-900/20 bg-amber-50/40 p-2.5 pl-9 text-xs text-stone-900 outline-none focus:border-amber-500"
            placeholder="Search by Name, Phone, Email, Lead ID, Inquiry ID, City…"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
          <span className="absolute left-3 top-2.5 text-xs text-stone-400"></span>
        </div>

        {/* Sorting Controls */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-teal-900">Sort By:</span>
          <select
            className="rounded-xl border border-teal-900/20 bg-white p-2.5 font-semibold text-teal-900"
            value={sortField}
            onChange={(e) => setSortField(e.target.value as SortField)}
          >
            <option value="createdAt">Created Date</option>
            <option value="customerName">Customer Name</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="rounded-xl border border-teal-900/20 bg-stone-100 p-2.5 font-bold text-teal-900"
          >
            {sortOrder === 'asc' ? ' ASC' : ' DESC'}
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-stone-100 p-2 text-xs font-bold">
        <div className="flex flex-wrap gap-1">
          {['ALL', 'NEW', 'CONTACTED', 'QUALIFIED', 'FOLLOW_UP', 'QUOTE_PENDING', 'CONVERTED', 'CLOSED', 'LOST'].map((st) => (
            <button
              key={st}
              onClick={() => {
                setStatusFilter(st);
                setCurrentPage(1);
              }}
              className={`rounded-lg px-3 py-2 transition-all ${
                statusFilter === st ? 'bg-teal-800 text-white shadow' : 'text-stone-600 hover:text-teal-900'
              }`}
            >
              {st.replaceAll('_', ' ')}
            </button>
          ))}
        </div>

        <select
          className="rounded-lg border border-stone-300 bg-white p-2 text-xs font-semibold text-teal-900"
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="ALL">All Categories</option>
          <option value="pitru-moksha-gaya">PitruMoksha Gaya</option>
          <option value="ritual-services">Ritual Services</option>
          <option value="travel-assistance">Travel Assistance</option>
          <option value="vahi-records">Vahi Records</option>
          <option value="religious-partners">Verified Priests</option>
        </select>
      </div>

      {/* Lead Table */}
      <div className="overflow-x-auto rounded-2xl border border-teal-900/20 bg-white shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-sm text-stone-600">Loading CRM leads…</div>
        ) : paginatedLeads.length === 0 ? (
          <div className="p-12 text-center text-stone-500">
            <p className="font-semibold">No CRM leads found matching current search and filters.</p>
          </div>
        ) : (
          <table className="w-full min-w-[900px] text-left text-xs">
            <thead>
              <tr className="border-b bg-stone-50 uppercase tracking-wider text-teal-900">
                <th className="p-4 font-bold">Lead ID / Source</th>
                <th className="p-4 font-bold">Customer Details</th>
                <th className="p-4 font-bold">Category</th>
                <th className="p-4 font-bold">Assigned Admin</th>
                <th className="p-4 font-bold">Priority</th>
                <th className="p-4 font-bold">Lifecycle Status</th>
                <th className="p-4 font-bold">Follow-Up Date</th>
                <th className="p-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {paginatedLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-amber-50/40">
                  <td className="p-4">
                    <span className="font-mono font-bold text-teal-900">{lead.id}</span>
                    {lead.inquiryId && (
                      <div className="text-[10px] text-stone-500 font-mono">Inquiry: {lead.inquiryId}</div>
                    )}
                    <span className="mt-1 inline-block rounded bg-stone-100 px-1.5 py-0.5 text-[10px] font-semibold text-stone-700">
                      {lead.inquirySource}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-stone-900">{lead.customerName}</div>
                    <div className="text-stone-600">{lead.customerPhone}</div>
                    <div className="text-[10px] text-stone-500">
                      {lead.customerCity}, {lead.customerCountry} {lead.isNRI ? '(NRI)' : ''}
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-teal-800">
                    {lead.category.replaceAll('-', ' ').toUpperCase()}
                  </td>
                  <td className="p-4 text-stone-700">
                    {lead.assignedAdmin || <span className="italic text-stone-400">Unassigned</span>}
                  </td>
                  <td className="p-4">
                    <span className={`rounded-md px-2 py-1 text-[10px] ${priorityBadgeStyles[lead.priority]}`}>
                      {lead.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold ${statusBadgeStyles[lead.status]}`}>
                      {lead.status.replaceAll('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4 text-stone-600 font-mono">
                    {lead.followUpDate || '—'}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => openLeadModal(lead)}
                      className="rounded-lg bg-teal-800 px-3 py-1.5 font-bold text-white shadow hover:bg-teal-900"
                    >
                      Manage Lead 
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Pagination Bar */}
        {processedLeads.length > 0 && (
          <div className="flex flex-wrap items-center justify-between border-t bg-stone-50 px-6 py-4 text-xs font-semibold text-stone-600">
            <div>
              Showing {Math.min((currentPage - 1) * pageSize + 1, processedLeads.length)} to{' '}
              {Math.min(currentPage * pageSize, processedLeads.length)} of {processedLeads.length} leads
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="rounded-lg border bg-white px-3 py-1.5 disabled:opacity-40"
              >
                 Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="rounded-lg border bg-white px-3 py-1.5 disabled:opacity-40"
              >
                Next 
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Lead Detail & Audit Activity Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl space-y-6">
            <div className="flex items-start justify-between border-b pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  CRM Lead Detail & Audit Management
                </span>
                <h2 className="font-serif text-2xl text-teal-900">{selectedLead.customerName} ({selectedLead.id})</h2>
                <p className="text-xs text-stone-600">
                  {selectedLead.customerPhone} · {selectedLead.customerEmail || 'No email'} · {selectedLead.customerCountry}
                </p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="rounded-full bg-stone-100 p-2 text-stone-500 hover:bg-stone-200"
              >
                
              </button>
            </div>

            {/* Quick Status & Priority Edit */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-bold text-teal-900">Lead Status</label>
                <select
                  className="mt-1 w-full rounded-xl border p-2 text-xs font-bold text-teal-900"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as LeadStatus)}
                >
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="QUALIFIED">QUALIFIED</option>
                  <option value="FOLLOW_UP">FOLLOW_UP</option>
                  <option value="QUOTE_PENDING">QUOTE_PENDING</option>
                  <option value="CONVERTED">CONVERTED</option>
                  <option value="CLOSED">CLOSED</option>
                  <option value="LOST">LOST</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-teal-900">Priority</label>
                <select
                  className="mt-1 w-full rounded-xl border p-2 text-xs font-bold text-teal-900"
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as LeadPriority)}
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                  <option value="URGENT">URGENT</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-teal-900">Assigned Admin</label>
                <input
                  className="mt-1 w-full rounded-xl border p-2 text-xs"
                  value={assignedAdmin}
                  onChange={(e) => setAssignedAdmin(e.target.value)}
                  placeholder="Coordinator Name"
                />
              </div>
            </div>

            {/* Follow-up date & Note input */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold text-teal-900">Follow-Up Date</label>
                <input
                  type="date"
                  className="mt-1 w-full rounded-xl border p-2 text-xs"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-teal-900">Add Internal Note (Appends to Audit Log)</label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-xl border p-2 text-xs"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Enter update note..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-b pb-4">
              <button
                onClick={() => void handleUpdateLead()}
                className="rounded-xl bg-teal-800 px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-teal-900"
              >
                Save Lead Updates & Record History
              </button>
            </div>

            {/* Conversion to M5 Booking Section */}
            {selectedLead.status !== 'CONVERTED' ? (
              <div className="rounded-xl border border-amber-300 bg-amber-50/80 p-4 space-y-3">
                <div className="font-bold text-teal-900 text-xs uppercase tracking-wider">
                  Convert Lead to Confirmed Booking (M5 Integration)
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="datetime-local"
                    className="rounded-xl border p-2 text-xs"
                    value={convertScheduledAt}
                    onChange={(e) => setConvertScheduledAt(e.target.value)}
                    required
                  />
                  <button
                    onClick={() => void handleConvertBooking()}
                    disabled={isConverting || !convertScheduledAt}
                    className="rounded-xl bg-green-700 px-5 py-2 text-xs font-bold text-white shadow hover:bg-green-800 disabled:opacity-50"
                  >
                    {isConverting ? 'Converting…' : 'Convert to M5 Booking '}
                  </button>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-green-300 bg-green-50 p-3 text-xs text-green-900 font-medium">
                 Converted to Booking Reference: <strong>{selectedLead.bookingId || 'BK-CONVERTED'}</strong>
              </div>
            )}

            {/* Auditable Activity History Log */}
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-teal-900">Auditable Activity & History Log</h3>
              <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
                {selectedLead.inquiryHistory.map((h) => (
                  <div key={h.id} className="rounded-lg bg-stone-50 p-2.5 text-xs border border-stone-200">
                    <div className="flex justify-between font-bold text-teal-900">
                      <span>{h.author}</span>
                      <span className="font-mono text-[10px] text-stone-500">{new Date(h.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="mt-1 text-stone-700">{h.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
