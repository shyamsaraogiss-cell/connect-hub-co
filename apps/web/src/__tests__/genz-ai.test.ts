import { searchKnowledgeCenter } from '../features/ai/knowledge/semantic-search';
import { APPROVED_AI_KNOWLEDGE_TREES } from '../features/ai/knowledge/ai-knowledge';
import type { BusinessCategory } from '../features/ai/types/ai.types';

export async function runGenZAITestSuite() {
  const results: { name: string; status: 'PASSED' | 'FAILED'; error?: string }[] = [];

  const assert = (condition: boolean, message: string) => {
    if (!condition) throw new Error(`Assertion failed: ${message}`);
  };

  try {
    // Test 1: Knowledge Retrieval over Approved Content
    const pmgRes = searchKnowledgeCenter('pind daan');
    assert(pmgRes.matchedArticles.length > 0 || pmgRes.matchedFAQs.length > 0, 'Found Pind Daan knowledge');
    assert(pmgRes.categoryMatch === 'pitru-moksha-gaya', 'Category routed to pitru-moksha-gaya');

    const ritRes = searchKnowledgeCenter('griha pravesh');
    assert(ritRes.matchedArticles.length > 0, 'Found Griha Pravesh knowledge article');
    assert(ritRes.categoryMatch === 'ritual-services', 'Category routed to ritual-services');

    const trvRes = searchKnowledgeCenter('wheelchair assistance');
    assert(trvRes.matchedFAQs.length > 0 || trvRes.matchedArticles.length > 0, 'Found Wheelchair travel assist FAQ');
    assert(trvRes.categoryMatch === 'travel-assistance', 'Category routed to travel-assistance');

    results.push({ name: 'Approved Knowledge Retrieval (Pind Daan, Griha Pravesh, Travel)', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Approved Knowledge Retrieval (Pind Daan, Griha Pravesh, Travel)', status: 'FAILED', error: String(err) });
  }

  try {
    // Test 2: Synonym Resolution & Alternate Spellings
    const syn1 = searchKnowledgeCenter('pind dan'); // alternate spelling
    assert(syn1.suggestedAnswer !== undefined, 'Resolved synonym for "pind dan"');

    const syn2 = searchKnowledgeCenter('shradh');
    assert(syn2.suggestedAnswer !== undefined, 'Resolved synonym for "shradh"');

    const syn3 = searchKnowledgeCenter('pandit');
    assert(syn3.suggestedAnswer !== undefined, 'Resolved synonym for "pandit"');

    results.push({ name: 'Synonym Resolution & Alternate Spellings', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Synonym Resolution & Alternate Spellings', status: 'FAILED', error: String(err) });
  }

  try {
    // Test 3: Complete 12 Domain Specialist Routing
    const allCategories: BusinessCategory[] = [
      'pitru-moksha-gaya',
      'ritual-services',
      'travel-assistance',
      'vahi-records',
      'religious-partners',
      'booking',
      'inquiry',
      'tracking',
      'complaint',
      'grievance',
      'founder-support',
      'company-info',
    ];

    for (const cat of allCategories) {
      const tree = APPROVED_AI_KNOWLEDGE_TREES[cat];
      assert(tree !== undefined, `Knowledge Tree defined for category ${cat}`);
      assert(tree.categoryId === cat, `Category ID matches for ${cat}`);
      assert(tree.initialPrompts.length > 0, `Initial prompts present for ${cat}`);
    }

    results.push({ name: 'Domain Specialist Assistant Routing (All 12 Categories)', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Domain Specialist Assistant Routing (All 12 Categories)', status: 'FAILED', error: String(err) });
  }

  try {
    // Test 4: In-Memory Search Caching
    const t0 = performance.now();
    const firstCall = searchKnowledgeCenter('vahi ledger gotra verification');
    const t1 = performance.now();

    const secondCall = searchKnowledgeCenter('vahi ledger gotra verification');
    const t2 = performance.now();

    assert(firstCall === secondCall, 'Identical reference returned from search cache');
    assert(t2 - t1 <= t1 - t0, 'Cached call executed faster or instantly');

    results.push({ name: 'In-Memory Search Caching & Performance', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'In-Memory Search Caching & Performance', status: 'FAILED', error: String(err) });
  }

  try {
    // Test 5: Booking Guidance & Inquiry Workflows
    const bkRes = searchKnowledgeCenter('how to book pandit ji');
    assert(bkRes.suggestedAnswer !== undefined || bkRes.matchedArticles.length > 0, 'Found Booking guidance');
    
    const inqRes = searchKnowledgeCenter('custom ritual package');
    assert(inqRes.suggestedAnswer !== undefined || inqRes.matchedArticles.length > 0, 'Found Inquiry guidance');

    results.push({ name: 'Booking Guidance & Inquiry Workflows', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Booking Guidance & Inquiry Workflows', status: 'FAILED', error: String(err) });
  }

  try {
    // Test 6: Reference ID Regex & Tracking Lookup
    const validId = 'CHC-2026-000123';
    const regex = /^CHC-\d{4}-\d{6}$/;
    assert(regex.test(validId), 'Reference ID matches CHC-YYYY-XXXXXX format');

    const trkRes = searchKnowledgeCenter('track status CHC-2026-000123');
    assert(trkRes.matchedRoutes.length > 0 || trkRes.suggestedAnswer !== undefined, 'Tracking lookup routed');

    results.push({ name: 'Reference ID Lookup & URMS Regex Validation', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Reference ID Lookup & URMS Regex Validation', status: 'FAILED', error: String(err) });
  }

  try {
    // Test 7: Complaint & Founder Support Escalation Workflows
    const cmpRes = searchKnowledgeCenter('service quality complaint escalation');
    assert(cmpRes.categoryMatch === 'complaint' || cmpRes.matchedArticles.some((a) => a.category === 'complaint'), 'Quality complaint routed');

    const fndRes = searchKnowledgeCenter('founder support emergency assistance');
    assert(fndRes.categoryMatch === 'founder-support' || fndRes.matchedArticles.some((a) => a.category === 'founder-support'), 'Founder support routed');

    results.push({ name: 'Complaint & Founder Support Escalation Workflows', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Complaint & Founder Support Escalation Workflows', status: 'FAILED', error: String(err) });
  }

  try {
    // Test 8: Security & Role Authorization Privacy Boundaries
    const { getCustomerSafeRecord } = await import('../types/urms');
    type URMSUniversalRecord = import('../types/urms').URMSUniversalRecord;
    const mockRecord: URMSUniversalRecord = {
      id: 'sec_1',
      referenceId: 'CHC-2026-888888',
      requestType: 'SERVICE_REQUEST',
      guestName: 'Confidential Client',
      guestPhone: '+91 9888888888',
      guestEmail: 'confidential@example.com',
      title: 'Vahi Lineage Search',
      description: 'Private family record search',
      currentStatus: 'IN_PROGRESS',
      currentStage: 'Panda Verification',
      assignedUser: 'Private Admin ID #99',
      priority: 'HIGH',
      sourceChannel: 'WEBSITE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [
        {
          id: 'h1',
          referenceId: 'CHC-2026-888888',
          newStatus: 'IN_PROGRESS',
          newStage: 'Panda Verification',
          changedBy: 'Admin',
          changeSource: 'ADMIN',
          internalNote: 'TOP SECRET INTERNAL ADMIN NOTE',
          timestamp: new Date().toISOString(),
        },
      ],
      timeline: [
        {
          id: 't1',
          timestamp: new Date().toISOString(),
          status: 'IN_PROGRESS',
          title: 'Internal Audit Completed',
          description: 'Internal verification detail',
          actor: 'System',
          isPublic: false,
        },
      ],
      communications: [
        {
          id: 'c1',
          referenceId: 'CHC-2026-888888',
          sender: 'Admin',
          visibility: 'INTERNAL_ONLY',
          channel: 'INTERNAL_NOTE',
          message: 'Internal note message',
          timestamp: new Date().toISOString(),
        },
      ],
      documents: [
        {
          id: 'd1',
          referenceId: 'CHC-2026-888888',
          fileName: 'InternalAudit.pdf',
          category: 'OTHER',
          uploadedBy: 'Admin',
          visibility: 'INTERNAL_ONLY',
          uploadDate: new Date().toISOString(),
          storageRef: 'private/audit.pdf',
        },
      ],
    };

    const safe = getCustomerSafeRecord(mockRecord);
    assert(safe.assignedUser === undefined, 'Private admin user ID stripped from response');
    assert(safe.history[0].internalNote === undefined, 'Internal note stripped from history');
    assert(safe.timeline.length === 0, 'Internal timeline event excluded');
    assert(safe.communications.length === 0, 'Internal-only communication excluded');
    assert(safe.documents.length === 0, 'Internal-only document excluded');

    results.push({ name: 'Security & Role Authorization Privacy Boundaries', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Security & Role Authorization Privacy Boundaries', status: 'FAILED', error: String(err) });
  }

  return results;
}

if (typeof require !== 'undefined' && require.main === module) {
  runGenZAITestSuite().then((res) => {
    console.log('=== ASK GENZ AI TEST SUITE RESULTS ===');
    console.log(JSON.stringify(res, null, 2));
  });
}
