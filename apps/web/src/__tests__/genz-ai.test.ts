import {
  APPROVED_KNOWLEDGE_ARTICLES,
  APPROVED_KNOWLEDGE_FAQS,
  findFounderKnowledge,
  searchKnowledgeCenter,
  syncKnowledgeFromBackend,
  understandPublicQuestion,
} from '../features/ai/knowledge/semantic-search';
import { APPROVED_AI_KNOWLEDGE_TREES } from '../features/ai/knowledge/ai-knowledge';
import { identifyServiceIntent } from '../features/ai/components/GenZRitualAIEngine';
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

    const grihaQuestion = 'What is Griha Pravesh for a new home?';
    const grihaUnderstanding = understandPublicQuestion(grihaQuestion);
    const grihaSearch = searchKnowledgeCenter(grihaQuestion);
    const grihaMatch = findFounderKnowledge('Which ritual is suitable for a new home?');
    assert(grihaUnderstanding.intents.includes('definition'), 'Griha Pravesh informational intent understood');
    assert(grihaSearch.matchedArticles.some((article) => article.id === 'art_ritual_services'), 'Retrieved approved Griha Pravesh knowledge article');
    assert(grihaMatch?.record.excelId === 'H2-Q021', 'Retrieved approved H2-Q021 Griha Pravesh authority');
    assert(grihaMatch?.record.answer === 'Many families perform a Griha Pravesh ceremony, though customs/offerings may vary.', 'Griha Pravesh answer remains exact and grounded');

    const trvRes = searchKnowledgeCenter('wheelchair assistance');
    assert(trvRes.matchedFAQs.length > 0 || trvRes.matchedArticles.length > 0, 'Found Wheelchair travel assist FAQ');
    assert(trvRes.categoryMatch === 'travel-assistance', 'Category routed to travel-assistance');

    results.push({ name: 'Approved Knowledge Retrieval (Pind Daan, Griha Pravesh, Travel)', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Approved Knowledge Retrieval (Pind Daan, Griha Pravesh, Travel)', status: 'FAILED', error: String(err) });
  }

  try {
    // Test 2: Synonym Resolution & Alternate Spellings
    const barePindDan = understandPublicQuestion('pind dan');
    assert(barePindDan.subjects.includes('pitru-moksha-gaya'), 'Recognized PitruMoksha subject for bare "pind dan"');
    assert(barePindDan.intents.length === 0, 'Bare "pind dan" does not invent informational intent');

    const pindDanQuestion = 'What is pind dan?';
    const pindDanUnderstanding = understandPublicQuestion(pindDanQuestion);
    const syn1 = searchKnowledgeCenter(pindDanQuestion);
    assert(pindDanUnderstanding.subjects.includes('pitru-moksha-gaya'), 'Recognized PitruMoksha subject for informational "pind dan" question');
    assert(pindDanUnderstanding.intents.includes('definition'), 'Recognized definition intent for informational "pind dan" question');
    assert(syn1.matchedArticles.some((article) => article.id === 'art_pmg_overview'), 'Retrieved existing approved Pind Daan article');
    assert(syn1.suggestedAnswer?.startsWith('Gaya Ji Pind Daan & Ancestral Rites Protocol:') === true, 'Pind Dan answer remains grounded in approved article');

    const bareShradhUnderstanding = understandPublicQuestion('shradh');
    const bareShradhSearch = searchKnowledgeCenter('shradh');
    assert(bareShradhUnderstanding.intents.length === 0, 'Bare "shradh" does not invent informational intent');
    assert(bareShradhUnderstanding.requiresClarification, 'Bare "shradh" requires clarification');
    assert(bareShradhSearch.suggestedAnswer === undefined, 'Bare "shradh" does not publish an unsupported answer');
    assert(identifyServiceIntent('shradh') === null, 'Bare "shradh" does not fabricate an action');

    const shradhQuestion = 'What is shradh and why is it performed?';
    const shradhUnderstanding = understandPublicQuestion(shradhQuestion);
    const syn2 = searchKnowledgeCenter(shradhQuestion);
    assert(shradhUnderstanding.intents.includes('definition'), 'Complete Shradh question recognizes definition intent');
    assert(shradhUnderstanding.intents.includes('procedure'), 'Complete Shradh question recognizes procedure intent');
    assert(syn2.categoryMatch === 'pitru-moksha-gaya', 'Complete Shradh question resolves to PitruMoksha Gaya');
    assert(syn2.matchedArticles.some((article) => article.id === 'art_pmg_overview'), 'Complete Shradh question retrieves approved art_pmg_overview grounding');
    assert(syn2.suggestedAnswer?.startsWith('Gaya Ji Pind Daan & Ancestral Rites Protocol:') === true, 'Shradh answer comes from existing approved information');
    assert(identifyServiceIntent(shradhQuestion) === null, 'Complete Shradh information question does not fabricate an action route');

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
    const bookingQuery = 'how to book pandit ji';
    const bookingUnderstanding = understandPublicQuestion(bookingQuery);
    const bookingAction = identifyServiceIntent(bookingQuery);
    assert(bookingUnderstanding.subjects.includes('booking'), 'Booking subject understood');
    assert(bookingUnderstanding.intents.includes('booking') && bookingUnderstanding.intents.includes('procedure'), 'Booking and procedure intents understood');
    assert(bookingAction?.actionLabel === 'Book Now', 'Booking action label is Book Now');
    assert(bookingAction?.actionHref === '/services', 'Booking action routes to /services');
    assert(bookingAction?.guidance === 'To begin a service request, please proceed through Book Now and select the relevant service/request option.', 'Approved booking guidance returned without autonomous booking, payment, or quotation');
    
    const bareCustomQuery = 'custom ritual package';
    const bareCustomUnderstanding = understandPublicQuestion(bareCustomQuery);
    const bareCustomSearch = searchKnowledgeCenter(bareCustomQuery);
    assert(bareCustomUnderstanding.subjects.includes('ritual-services'), 'Bare custom ritual phrase recognizes ritual-services subject');
    assert(bareCustomUnderstanding.intents.length === 0, 'Bare custom ritual phrase does not invent intent');
    assert(bareCustomSearch.suggestedAnswer === undefined && bareCustomSearch.matchedArticles.length === 0, 'Bare custom ritual phrase does not fabricate package, price, inclusion, or quotation');

    const customInformationQuery = 'What customized puja services are available?';
    const customInformationUnderstanding = understandPublicQuestion(customInformationQuery);
    const customInformation = searchKnowledgeCenter(customInformationQuery);
    assert(customInformationUnderstanding.intents.includes('availability'), 'Customized Puja informational intent recognized');
    assert(customInformation.matchedArticles.some((article) => article.id === 'art_ritual_services'), 'Customized Puja information uses approved ritual-services grounding');
    assert(customInformation.suggestedAnswer === 'Authentic Home Pujas, Havan & Vastu Shanti: Booking qualified Pandits for Griha Pravesh, Navagraha Shanti, Maha Mritunjay Havan, and family ceremonies with verified pure Samagri.', 'Customized Puja answer remains exact without invented package, price, inclusion, or quotation');

    const customAction = identifyServiceIntent('I want to request a custom ritual package');
    assert(customAction?.actionLabel === 'Book Now', 'Customized ritual request action label is Book Now');
    assert(customAction?.actionHref === '/services', 'Customized ritual request routes to /services');
    assert(customAction?.informationHref === '/ritual-services', 'Customized ritual request retains ritual-services information route');
    assert(customAction?.guidance === 'To request a ritual service, please proceed through Book Now and select the relevant ritual service/request option.', 'Customized ritual request uses approved service-request guidance');

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
    const ambiguousComplaint = 'service quality complaint escalation';
    const complaintUnderstanding = understandPublicQuestion(ambiguousComplaint);
    assert(complaintUnderstanding.subjects.includes('support'), 'Ambiguous complaint phrase recognized as support subject');
    assert(identifyServiceIntent(ambiguousComplaint) === null, 'Ambiguous complaint phrase is not silently converted into a submission action');

    const complaintAction = identifyServiceIntent('I want to raise a service-quality complaint.');
    assert(complaintAction?.actionLabel === 'Raise Complaint', 'Explicit complaint action recognized');
    assert(complaintAction?.actionHref === '/complaint', 'Explicit complaint action routes to /complaint');
    assert(complaintAction?.guidance === 'Use the existing Complaint channel to submit a service-quality concern for authorised review.', 'Approved complaint workflow guidance returned without fabricated handling');

    const bareFounderQuery = 'founder support emergency assistance';
    const bareFounderUnderstanding = understandPublicQuestion(bareFounderQuery);
    const bareFounderSearch = searchKnowledgeCenter(bareFounderQuery);
    const bareFounderAction = identifyServiceIntent(bareFounderQuery);
    assert(bareFounderUnderstanding.subjects.includes('support'), 'Bare Founder Support phrase recognizes support subject');
    assert(bareFounderUnderstanding.intents.length === 0, 'Bare Founder Support phrase does not invent explicit action intent');
    assert(bareFounderAction === null, 'Bare Founder Support phrase does not create an automatic action');
    assert(bareFounderSearch.suggestedAnswer === undefined, 'Bare Founder Support phrase does not claim general emergency-response capability');

    const founderAction = identifyServiceIntent('I need Founder Support');
    assert(founderAction?.actionLabel === 'Founder Support', 'Explicit Founder Support request recognizes approved action');
    assert(founderAction?.actionHref === '/founder-support', 'Explicit Founder Support request routes to /founder-support');
    assert(founderAction?.guidance === 'Use the existing Founder Support channel for matters requiring authorised founder-level review.', 'Founder Support guidance remains within authorised Founder-level review');
    assert(!/emergency(?:-|\s*)response|emergency service/i.test(founderAction?.guidance ?? ''), 'Founder Support response does not claim a general emergency-response service');

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

  const originalFetch = globalThis.fetch;
  const originalArticles = [...APPROVED_KNOWLEDGE_ARTICLES];
  const originalFAQs = [...APPROVED_KNOWLEDGE_FAQS];
  try {
    const requestedUrls: string[] = [];
    globalThis.fetch = async (input) => {
      const url = String(input);
      requestedUrls.push(url);
      if (url.endsWith('/api/governance/articles/published')) {
        return new Response(JSON.stringify({ success: true, articles: [originalArticles[0]] }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      if (url.endsWith('/api/governance/faqs/published')) {
        return new Response(JSON.stringify({ success: true, faqs: [originalFAQs[0]] }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      throw new Error(`Unexpected semantic-search URL: ${url}`);
    };

    assert(await syncKnowledgeFromBackend(), 'Published governance sync succeeds');
    assert(requestedUrls[0].endsWith('/api/governance/articles/published'), 'Uses the public published article URL');
    assert(requestedUrls[1].endsWith('/api/governance/faqs/published'), 'Uses the public published FAQ URL');
    assert(APPROVED_KNOWLEDGE_ARTICLES[0]?.id === originalArticles[0]?.id, 'Normalizes article response envelope');
    assert(APPROVED_KNOWLEDGE_FAQS[0]?.id === originalFAQs[0]?.id, 'Normalizes FAQ response envelope');
    results.push({ name: 'Published Governance Knowledge Sync URLs & JSON Normalization', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Published Governance Knowledge Sync URLs & JSON Normalization', status: 'FAILED', error: String(err) });
  } finally {
    APPROVED_KNOWLEDGE_ARTICLES.splice(0, APPROVED_KNOWLEDGE_ARTICLES.length, ...originalArticles);
    APPROVED_KNOWLEDGE_FAQS.splice(0, APPROVED_KNOWLEDGE_FAQS.length, ...originalFAQs);
    globalThis.fetch = originalFetch;
  }

  try {
    globalThis.fetch = async (input) => {
      const key = String(input).endsWith('/articles/published') ? 'articles' : 'faqs';
      return new Response(JSON.stringify({ success: true, [key]: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    };
    assert(await syncKnowledgeFromBackend(), 'Empty published governance sync succeeds');
    assert(APPROVED_KNOWLEDGE_ARTICLES.length === originalArticles.length, 'Empty article response retains bundled fallback');
    assert(APPROVED_KNOWLEDGE_FAQS.length === originalFAQs.length, 'Empty FAQ response retains bundled fallback');
    results.push({ name: 'Empty Governance Knowledge Retains Bundled Fallback', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Empty Governance Knowledge Retains Bundled Fallback', status: 'FAILED', error: String(err) });
  } finally {
    APPROVED_KNOWLEDGE_ARTICLES.splice(0, APPROVED_KNOWLEDGE_ARTICLES.length, ...originalArticles);
    APPROVED_KNOWLEDGE_FAQS.splice(0, APPROVED_KNOWLEDGE_FAQS.length, ...originalFAQs);
    globalThis.fetch = originalFetch;
  }

  try {
    let jsonCalled = false;
    globalThis.fetch = async () => ({
      ok: false,
      status: 404,
      json: async () => { jsonCalled = true; throw new Error('HTML must not be parsed as JSON'); },
    }) as unknown as Response;
    const originalConsoleError = console.error;
    console.error = () => undefined;
    try {
      assert(!(await syncKnowledgeFromBackend()), 'Non-2xx knowledge sync returns a controlled failure');
    } finally {
      console.error = originalConsoleError;
    }
    assert(!jsonCalled, 'Non-2xx response body is not parsed as JSON');
    results.push({ name: 'Knowledge Sync Non-2xx Controlled Failure', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Knowledge Sync Non-2xx Controlled Failure', status: 'FAILED', error: String(err) });
  } finally {
    globalThis.fetch = originalFetch;
  }

  return results;
}

if (typeof require !== 'undefined' && require.main === module) {
  runGenZAITestSuite().then((res) => {
    console.log('=== ASK GENZ AI TEST SUITE RESULTS ===');
    console.log(JSON.stringify(res, null, 2));
    if (res.some((result) => result.status === 'FAILED')) process.exitCode = 1;
  });
}
