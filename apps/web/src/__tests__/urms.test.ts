import {
  generateUniversalReferenceId,
  createUniversalRequest,
  getUniversalRequestByReferenceId,
  updateUniversalRequestStatus,
} from '../services/urms.api';
import { validateStatusTransition, getCustomerSafeRecord, type URMSUniversalRecord } from '../types/urms';
import { dispatchURMSNotification, getNotificationLogsByReferenceId } from '../services/notifications.api';

export async function runURMSTestSuite() {
  const results: { name: string; status: 'PASSED' | 'FAILED'; error?: string }[] = [];

  const assert = (condition: boolean, message: string) => {
    if (!condition) throw new Error(`Assertion failed: ${message}`);
  };

  try {
    // Test 1: ID Uniqueness & Non-Sequential CHC-YYYY-XXXXXX Format
    const id1 = generateUniversalReferenceId();
    const id2 = generateUniversalReferenceId();
    assert(id1.startsWith('CHC-'), 'ID should start with CHC-');
    assert(id1 !== id2, 'Generated IDs must be unique');
    assert(/^CHC-\d{4}-\d{6}$/.test(id1), 'ID should match regex CHC-YYYY-XXXXXX');
    results.push({ name: 'Universal Reference ID Uniqueness & Format', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Universal Reference ID Uniqueness & Format', status: 'FAILED', error: String(err) });
  }

  try {
    // Test 2: Request Creation & Lookup by Reference ID
    const req = await createUniversalRequest({
      requestType: 'SERVICE_REQUEST',
      relatedService: 'PitruMoksha Gaya Rites',
      guestName: 'Test Traveler',
      guestPhone: '+91 9999988888',
      guestEmail: 'test.traveler@example.com',
      title: 'Ancestral Rites Booking',
      description: 'Gaya Ji Tarpan and Pind Daan request.',
    });
    assert(req.referenceId.startsWith('CHC-'), 'Universal Reference ID generated');
    assert(req.currentStatus === 'SUBMITTED', 'Initial status created');
    assert(req.history.length > 0, 'Initial status history created');

    const fetched = await getUniversalRequestByReferenceId(req.referenceId, 'ADMIN');
    assert(fetched !== null, 'Found created record by reference ID');
    assert(fetched?.referenceId === req.referenceId, 'Reference ID matches');

    const updated = await updateUniversalRequestStatus(req.referenceId, 'ACKNOWLEDGED', 'Acknowledged Stage', 'System Admin');
    assert(updated.currentStatus === 'ACKNOWLEDGED', 'Status updated to ACKNOWLEDGED');

    results.push({ name: 'Request Creation, Lookup & Status Transition Update', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Request Creation, Lookup & Status Transition Update', status: 'FAILED', error: String(err) });
  }

  try {
    // Test 3: Status Transition Validation Rules
    assert(validateStatusTransition('SUBMITTED', 'ACKNOWLEDGED'), 'SUBMITTED -> ACKNOWLEDGED allowed');
    assert(validateStatusTransition('ACKNOWLEDGED', 'ASSIGNED'), 'ACKNOWLEDGED -> ASSIGNED allowed');
    assert(!validateStatusTransition('CLOSED', 'SUBMITTED'), 'CLOSED -> SUBMITTED blocked');
    assert(!validateStatusTransition('REJECTED', 'APPROVED'), 'REJECTED -> APPROVED blocked');
    results.push({ name: 'Valid & Invalid Status Transitions', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Valid & Invalid Status Transitions', status: 'FAILED', error: String(err) });
  }

  try {
    // Test 4: Role-Aware Customer-Safe Filtering & Internal Note Protection
    const mockRecord: URMSUniversalRecord = {
      id: 'mock_1',
      referenceId: 'CHC-2026-999999',
      requestType: 'INQUIRY',
      guestName: 'Private Client',
      guestPhone: '+91 9000000000',
      guestEmail: 'client@example.com',
      title: 'Private Ritual Inquiry',
      description: 'Secret inquiry details.',
      currentStatus: 'SUBMITTED',
      currentStage: 'Submitted',
      assignedUser: 'Private Admin ID #42',
      priority: 'MEDIUM',
      sourceChannel: 'WEBSITE_FORM',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [
        {
          id: 'h_mock',
          referenceId: 'CHC-2026-999999',
          newStatus: 'SUBMITTED',
          newStage: 'Submitted',
          changedBy: 'Admin',
          changeSource: 'ADMIN',
          publicNote: 'Public customer note',
          internalNote: 'Top secret internal admin note',
          timestamp: new Date().toISOString(),
        },
      ],
      timeline: [
        {
          id: 't_pub',
          timestamp: new Date().toISOString(),
          status: 'SUBMITTED',
          title: 'Public Event',
          description: 'Public description',
          actor: 'System',
          isPublic: true,
        },
        {
          id: 't_priv',
          timestamp: new Date().toISOString(),
          status: 'SUBMITTED',
          title: 'Internal Event',
          description: 'Secret internal description',
          actor: 'System',
          isPublic: false,
        },
      ],
      communications: [
        {
          id: 'c_pub',
          referenceId: 'CHC-2026-999999',
          sender: 'System',
          visibility: 'CUSTOMER_VISIBLE',
          channel: 'SYSTEM_NOTIFICATION',
          message: 'Public message',
          timestamp: new Date().toISOString(),
        },
        {
          id: 'c_priv',
          referenceId: 'CHC-2026-999999',
          sender: 'Admin',
          visibility: 'INTERNAL_ONLY',
          channel: 'INTERNAL_NOTE',
          message: 'Confidential internal note',
          timestamp: new Date().toISOString(),
        },
      ],
      documents: [
        {
          id: 'd_pub',
          referenceId: 'CHC-2026-999999',
          fileName: 'PublicQuote.pdf',
          category: 'GENERATED_QUOTATION',
          uploadedBy: 'Desk',
          visibility: 'CUSTOMER_VISIBLE',
          uploadDate: new Date().toISOString(),
          storageRef: 'public/quote.pdf',
        },
        {
          id: 'd_priv',
          referenceId: 'CHC-2026-999999',
          fileName: 'InternalAudit.pdf',
          category: 'RITUAL_DOCUMENT',
          uploadedBy: 'Admin',
          visibility: 'INTERNAL_ONLY',
          uploadDate: new Date().toISOString(),
          storageRef: 'internal/audit.pdf',
        },
      ],
    };

    const safe = getCustomerSafeRecord(mockRecord);
    assert(safe.assignedUser === undefined, 'Admin user ID stripped from customer response');
    assert(safe.history[0].internalNote === undefined, 'Internal note stripped from customer history');
    assert(safe.timeline.length === 1, 'Only public timeline events returned');
    assert(safe.communications.length === 1, 'Only customer-visible messages returned');
    assert(safe.documents.length === 1, 'Only customer-visible documents returned');
    results.push({ name: 'Role Authorization & Customer-Safe Response Filtering', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Role Authorization & Customer-Safe Response Filtering', status: 'FAILED', error: String(err) });
  }

  try {
    // Test 5: Notification Event Adapter Queue
    const testReq = await createUniversalRequest({
      requestType: 'PARTNER_REGISTRATION',
      guestName: 'Pandit Sharma',
      guestPhone: '+91 9111122222',
      guestEmail: 'pandit@example.com',
      title: 'Partner Registration',
      description: 'Veda scholar RPN registration.',
    });
    const notif = dispatchURMSNotification(testReq, 'REQUEST_SUBMITTED');
    assert(notif.referenceId === testReq.referenceId, 'Notification logged for correct reference ID');
    assert(notif.status === 'PENDING_EXTERNAL_PROVIDER', 'Status queued as PENDING_EXTERNAL_PROVIDER');
    const logs = getNotificationLogsByReferenceId(testReq.referenceId);
    assert(logs.length > 0, 'Notification persisted in queue');
    results.push({ name: 'Notification Service Adapter Queue', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Notification Service Adapter Queue', status: 'FAILED', error: String(err) });
  }

  return results;
}

if (require.main === module) {
  runURMSTestSuite().then((res) => {
    console.log('=== URMS TEST SUITE RESULTS ===');
    console.log(JSON.stringify(res, null, 2));
  });
}
