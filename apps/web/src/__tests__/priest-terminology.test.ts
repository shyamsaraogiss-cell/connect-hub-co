import assert from 'node:assert/strict';
import test from 'node:test';
import { priestErrorMessage, priestTerminology, priestWorkflowLabel } from '../lib/priest-terminology';
import { dispatchURMSNotification } from '../services/notifications.api';
import { generateQuotePDFHTML } from '../services/quote.api';
import type { ServiceQuote } from '../types/quote';
import type { URMSUniversalRecord } from '../types/urms';

test('approved priest labels preserve routes, enum values, and travel terminology', () => {
  const pairs = [
    ['Religious Partner', 'Verified Priest'], ['Religious Partners', 'Verified Priests'],
    ['Religious Partner Registration', 'Priest Registration'],
    ['Partner Registration', 'Priest Registration'],
    ['Partner Registration Form', 'Priest Registration Form'],
    ['Partner Registration Reference ID', 'Priest Registration Reference ID'],
    ['Partner Application', 'Priest Application'], ['Partner Applications', 'Priest Applications'],
    ['Partner Applicant', 'Priest Applicant'], ['Partner Dashboard', 'Priest Dashboard'],
    ['Partner Profile', 'Priest Profile'], ['Partner Approval', 'Priest Approval'],
    ['Partner Verification', 'Priest Verification'], ['Assigned Partner', 'Assigned Verified Priest'],
    ['verified Religious Partners', 'Verified Priests'],
  ];
  for (const [input, expected] of pairs) {
    assert.equal(priestTerminology(input), expected);
    assert.equal(priestTerminology(expected), expected, 'Label formatting is idempotent');
  }
  for (const value of ['/religious-partners/register', 'PARTNER_REGISTRATION', 'RELIGIOUS_PARTNER', 'assignedPartnerUserId', 'Travel Partner Verification']) {
    assert.equal(priestTerminology(value), value);
  }
  assert.equal(priestWorkflowLabel('PARTNER_REGISTRATION'), 'Priest Registration');
  assert.equal(priestErrorMessage('PARTNER_USER_ALREADY_LINKED'), 'Priest account is already linked.');
});

test('legacy assignment notifications display new labels without modifying the stored record', () => {
  const record = {
    referenceId: 'CHC-2026-000124', requestType: 'PARTNER_REGISTRATION',
    assignedTeam: 'Religious Partner Team', currentStage: 'Religious Partner Assignment',
    currentStatus: 'ASSIGNED', guestName: 'Test Applicant', guestEmail: 'applicant@example.com',
  } as URMSUniversalRecord;
  const original = JSON.stringify(record);
  for (const event of ['ASSIGNMENT', 'STATUS_CHANGED'] as const) {
    const notification = dispatchURMSNotification(record, event);
    assert(!/\bpartner\b/i.test(notification.message));
    assert(notification.message.includes('Verified Priest'));
    assert.equal(notification.referenceId, record.referenceId);
    assert.equal(notification.status, 'PENDING_EXTERNAL_PROVIDER');
  }
  assert.equal(JSON.stringify(record), original);
});

test('PDF wording changes leave quote identifiers, prices, status and source terms untouched', () => {
  const quote: ServiceQuote = {
    id: 'quote-1', quoteNumber: 'CHC-Q-0001', customerName: 'Test Customer',
    customerEmail: 'customer@example.com', customerPhone: '9999999999', customerCountry: 'India',
    category: 'religious-partners', serviceName: 'Religious Partner coordination',
    items: [{ id: 'line-1', description: 'Assigned Partner coordination', quantity: 1, unitPrice: 100, total: 100 }],
    subtotal: 100, tax: 5, totalAmount: 105, status: 'APPROVED',
    inclusions: ['Religious Partner guidance'], exclusions: ['Partner Registration fees'],
    termsAndConditions: 'Religious Partner availability applies.',
    version: 1, versionHistory: [], issuedAt: '2026-09-09', validUntil: '2026-09-30',
  };
  const original = JSON.stringify(quote);
  const html = generateQuotePDFHTML(quote);
  assert(!/\bpartner\b/i.test(html));
  assert(html.includes('Assigned Verified Priest coordination'));
  assert(html.includes(quote.quoteNumber));
  assert(html.includes('APPROVED'));
  assert(html.includes('105'));
  assert.equal(JSON.stringify(quote), original);
});
