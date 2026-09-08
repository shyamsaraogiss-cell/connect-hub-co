'use client';

import { useEffect, useState } from 'react';
import {
  EligiblePartner,
  OperationalRequest,
  listEligiblePartners,
  listOperationalRequests,
  updateOperationalRequest,
} from '@/services/operational-request.api';

export default function RequestsPage() {
  const [requests, setRequests] = useState<OperationalRequest[]>([]);
  const [partners, setPartners] = useState<EligiblePartner[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      const [requestRows, partnerRows] = await Promise.all([listOperationalRequests(), listEligiblePartners()]);
      setRequests(requestRows);
      setPartners(partnerRows);
      setError(null);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to load secured request operations.');
    }
  }

  useEffect(() => { queueMicrotask(() => void load()); }, []);

  async function assign(record: OperationalRequest, partnerUserId: string) {
    await updateOperationalRequest(record.referenceId, {
      assignedPartnerUserId: partnerUserId,
      assignedTeam: 'Religious Partner Team',
      currentStatus: 'ASSIGNED',
      currentStage: 'Religious Partner Assignment',
      publicNote: 'A verified Religious Partner has been assigned.',
    });
    await load();
  }

  async function acknowledge(record: OperationalRequest) {
    await updateOperationalRequest(record.referenceId, {
      currentStatus: 'ACKNOWLEDGED',
      currentStage: 'Operations Acknowledgment',
      publicNote: 'The operations team has acknowledged this request.',
    });
    await load();
  }

  return <main className="min-h-screen bg-stone-50 p-4 sm:p-8"><section className="mx-auto max-w-7xl rounded-2xl bg-white p-6 shadow-sm">
    <h1 className="text-3xl font-bold text-teal-950">ERP Request Operations</h1>
    <p className="mt-2 text-sm text-stone-600">Founder/Admin-only request review and verified-partner assignment.</p>
    {error ? <p className="mt-4 rounded bg-red-50 p-3 text-red-700" role="alert">{error}</p> : null}
    <div className="mt-6 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b"><th className="p-3">Reference</th><th>Request</th><th>Status</th><th>Assigned partner</th></tr></thead><tbody>
      {requests.map((record) => <tr className="border-b align-top" key={record.id}><td className="p-3 font-mono">{record.referenceId}</td><td><strong>{record.title}</strong><span className="block text-xs text-stone-500">{record.serviceDomain ?? record.requestType}</span></td><td>{record.currentStatus}<span className="block text-xs text-stone-500">{record.currentStage}</span>{record.currentStatus === 'SUBMITTED' ? <button className="mt-2 rounded border px-2 py-1 text-xs" onClick={() => void acknowledge(record)}>Acknowledge</button> : null}</td><td><select aria-label={`Assign partner for ${record.referenceId}`} className="rounded border p-2" disabled={record.currentStatus !== 'ACKNOWLEDGED'} value={record.assignedPartnerUserId ?? ''} onChange={(event) => void assign(record, event.target.value)}><option value="" disabled>Select verified partner</option>{partners.map((partner) => <option key={partner.id} value={partner.id}>{partner.fullName} — {partner.religiousPartnerProfile?.category}</option>)}</select></td></tr>)}
    </tbody></table></div>
  </section></main>;
}
