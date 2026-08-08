import {
  KHEM_PUBLIC_NAVIGATION,
  KHEM_INTERNAL_NAVIGATION,
  KHEM_EXACT_SIDEBAR_HIERARCHY,
  KHEM_FOOTER_NAVIGATION,
  KHEM_VISUAL_SHELL_TOKENS,
  KHEM_LOCKED_SHELL_COMPONENTS,
  KHEM_NAVIGATION_LOCK_SEAL,
  KHEM_BRAND_TAGLINE,
  KHEM_ARCHITECTURE_LOCK_V1,
  HERO_ONE_CORE_SERVICES,
} from '../config/khem-navigation.config';


export async function runKHEMNavigationShellTestSuite() {
  const results: { name: string; status: 'PASSED' | 'FAILED'; error?: string }[] = [];

  const assert = (condition: boolean, message: string) => {
    if (!condition) throw new Error(`Assertion failed: ${message}`);
  };

  try {
    // Test 1: Locked Public Navigation Structure & Order (No Home/Homepage link)
    assert(KHEM_PUBLIC_NAVIGATION.length === 8, 'Public navigation contains exactly 8 locked routes');
    assert(KHEM_PUBLIC_NAVIGATION.every(([label]) => label !== 'Home' && label !== 'Homepage'), 'No Home or Homepage link exists in public header navigation');
    assert(KHEM_PUBLIC_NAVIGATION[0][0] === 'About Us' && KHEM_PUBLIC_NAVIGATION[0][1] === '/about', 'Route 1: About Us (/about)');
    assert(KHEM_PUBLIC_NAVIGATION[1][0] === 'Services' && KHEM_PUBLIC_NAVIGATION[1][1] === '/services', 'Route 2: Services (/services)');
    assert(KHEM_PUBLIC_NAVIGATION[2][0] === 'Pitru Moksha' && KHEM_PUBLIC_NAVIGATION[2][1] === '/pitru-moksha', 'Route 3: Pitru Moksha (/pitru-moksha)');
    assert(KHEM_PUBLIC_NAVIGATION[3][0] === 'Travel' && KHEM_PUBLIC_NAVIGATION[3][1] === '/travel-assistance', 'Route 4: Travel (/travel-assistance)');
    assert(KHEM_PUBLIC_NAVIGATION[4][0] === 'Knowledge Hub' && KHEM_PUBLIC_NAVIGATION[4][1] === '/knowledge-center', 'Route 5: Knowledge Hub (/knowledge-center)');
    assert(KHEM_PUBLIC_NAVIGATION[5][0] === 'Zen G AI' && KHEM_PUBLIC_NAVIGATION[5][1] === '/zen-g', 'Route 6: Zen G AI (/zen-g)');
    assert(KHEM_PUBLIC_NAVIGATION[6][0] === 'Support' && KHEM_PUBLIC_NAVIGATION[6][1] === '/contact?topic=human-support', 'Route 7: Support (/contact?topic=human-support)');
    assert(KHEM_PUBLIC_NAVIGATION[7][0] === 'Contact Us' && KHEM_PUBLIC_NAVIGATION[7][1] === '/contact', 'Route 8: Contact Us (/contact)');

    assert(Object.isFrozen(KHEM_PUBLIC_NAVIGATION), 'KHEM_PUBLIC_NAVIGATION array is frozen and immutable');

    results.push({ name: 'Locked Public Navigation Integrity & Immutability', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Locked Public Navigation Integrity & Immutability', status: 'FAILED', error: String(err) });
  }

  try {
    // Test 2: Locked Internal ERP Navigation Structure & Order
    assert(KHEM_INTERNAL_NAVIGATION.length === 8, 'Internal ERP navigation contains exactly 8 locked routes');
    assert(KHEM_INTERNAL_NAVIGATION[0][0] === 'Dashboard' && KHEM_INTERNAL_NAVIGATION[0][1] === '/dashboard', 'ERP Route 1: Dashboard');
    assert(KHEM_INTERNAL_NAVIGATION[1][0] === 'Partners' && KHEM_INTERNAL_NAVIGATION[1][1] === '/partners', 'ERP Route 2: Partners');
    assert(KHEM_INTERNAL_NAVIGATION[2][0] === 'Customers' && KHEM_INTERNAL_NAVIGATION[2][1] === '/customers', 'ERP Route 3: Customers');
    assert(KHEM_INTERNAL_NAVIGATION[3][0] === 'Bookings' && KHEM_INTERNAL_NAVIGATION[3][1] === '/bookings', 'ERP Route 4: Bookings');
    assert(KHEM_INTERNAL_NAVIGATION[4][0] === 'Services' && KHEM_INTERNAL_NAVIGATION[4][1] === '/admin/services', 'ERP Route 5: Services');
    assert(KHEM_INTERNAL_NAVIGATION[5][0] === 'Categories' && KHEM_INTERNAL_NAVIGATION[5][1] === '/admin/service-categories', 'ERP Route 6: Categories');
    assert(KHEM_INTERNAL_NAVIGATION[6][0] === 'Pitru Requests' && KHEM_INTERNAL_NAVIGATION[6][1] === '/pitru-moksha/requests', 'ERP Route 7: Pitru Requests');
    assert(KHEM_INTERNAL_NAVIGATION[7][0] === 'Travel Requests' && KHEM_INTERNAL_NAVIGATION[7][1] === '/travel-assistance/requests', 'ERP Route 8: Travel Requests');

    assert(Object.isFrozen(KHEM_INTERNAL_NAVIGATION), 'KHEM_INTERNAL_NAVIGATION array is frozen and immutable');

    results.push({ name: 'Locked Internal ERP Navigation Integrity & Immutability', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Locked Internal ERP Navigation Integrity & Immutability', status: 'FAILED', error: String(err) });
  }

  try {
    // Test 3: Recovered Sidebar Hierarchy & Zero Category Headings
    assert(KHEM_EXACT_SIDEBAR_HIERARCHY.length === 13, 'Sidebar contains exactly 13 items');
    assert(KHEM_EXACT_SIDEBAR_HIERARCHY[0].label === 'Home' && KHEM_EXACT_SIDEBAR_HIERARCHY[0].href === '/', 'Item 1: Home');
    assert(KHEM_EXACT_SIDEBAR_HIERARCHY[1].label === 'PitruMoksha Gaya' && KHEM_EXACT_SIDEBAR_HIERARCHY[1].href === '/pitru-moksha-gaya', 'Item 2: PitruMoksha Gaya');
    assert(KHEM_EXACT_SIDEBAR_HIERARCHY[2].label === 'Online Services' && KHEM_EXACT_SIDEBAR_HIERARCHY[2].href === '/pitru-moksha-gaya/online', 'Item 2a: Online Services');
    assert(KHEM_EXACT_SIDEBAR_HIERARCHY[3].label === 'Offline Services' && KHEM_EXACT_SIDEBAR_HIERARCHY[3].href === '/pitru-moksha-gaya/offline', 'Item 2b: Offline Services');
    assert(KHEM_EXACT_SIDEBAR_HIERARCHY[4].label === 'Ritual Services' && KHEM_EXACT_SIDEBAR_HIERARCHY[4].href === '/ritual-services', 'Item 3: Ritual Services');
    assert(KHEM_EXACT_SIDEBAR_HIERARCHY[9].isDividerAfter === true, 'Divider after Religious Partner Registration verified');
    assert(KHEM_EXACT_SIDEBAR_HIERARCHY[10].label === 'Ask GenZ AI' && KHEM_EXACT_SIDEBAR_HIERARCHY[10].href === '/zen-g', 'Ask GenZ AI occupies former WhatsApp position');
    assert(!KHEM_EXACT_SIDEBAR_HIERARCHY.some((item) => item.label === 'WhatsApp'), 'Sidebar WhatsApp removed');
    assert(Object.isFrozen(KHEM_EXACT_SIDEBAR_HIERARCHY), 'KHEM_EXACT_SIDEBAR_HIERARCHY array is frozen');

    results.push({ name: 'Locked Sidebar Groups & Navigation Integrity', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Locked Sidebar Groups & Navigation Integrity', status: 'FAILED', error: String(err) });
  }

  try {
    // Test 4: Visual Shell Design Tokens & Component Registry Locks
    assert(KHEM_VISUAL_SHELL_TOKENS.peacockBluePrimary === '#087F8C', 'Peacock Blue Primary token verified (#087F8C)');
    assert(KHEM_VISUAL_SHELL_TOKENS.peacockBlueLight === '#1599A6', 'Peacock Blue Light token verified (#1599A6)');
    assert(KHEM_VISUAL_SHELL_TOKENS.sacredGoldSecondary === '#D4AF37', 'Sacred Gold token verified (#D4AF37)');
    assert(KHEM_VISUAL_SHELL_TOKENS.sacredGoldHex === '#F4B942', 'Sacred Gold Hex token verified (#F4B942)');
    assert(KHEM_VISUAL_SHELL_TOKENS.tealDivider === '#055B66', 'Teal Divider token verified (#055B66)');
    assert(KHEM_VISUAL_SHELL_TOKENS.operationalSidebarBg === '#201a17', 'Operational Sidebar background verified');
    assert(KHEM_VISUAL_SHELL_TOKENS.sacredBackground === '#fffdf8', 'Sacred Background verified');

    assert(KHEM_LOCKED_SHELL_COMPONENTS.length === 8, '8 core components registered under visual shell locks');
    const aiPanel = KHEM_LOCKED_SHELL_COMPONENTS.find((c) => c.componentName === 'AI Panel shell');
    assert(aiPanel !== undefined && aiPanel.isLocked === false, 'AI Panel shell registered as pending (isLocked === false)');
    for (const item of KHEM_LOCKED_SHELL_COMPONENTS) {
      if (item.componentName !== 'AI Panel shell') {
        assert(item.isLocked === true, `Component ${item.componentName} is strictly locked`);
      }
    }

    assert(KHEM_NAVIGATION_LOCK_SEAL === 'KHEM_FOUNDER_LOCK_SEAL_2026_PHASE_6A1', 'Founder lock seal verified');
    assert(KHEM_BRAND_TAGLINE === 'The Authentic Ancestral Rites | Verified Lineage | Vedic Precision', 'Exact Brand Tagline verified');

    results.push({ name: 'Visual Shell Tokens & Component Lock Registry', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Visual Shell Tokens & Component Lock Registry', status: 'FAILED', error: String(err) });
  }

  try {
    // Test 5: Locked Approved Four-Column Footer Navigation
    assert(KHEM_FOOTER_NAVIGATION.length === 4, 'Footer contains exactly 4 columns');
    assert(KHEM_FOOTER_NAVIGATION[0].title === 'OUR SERVICES', 'Column 1 title: OUR SERVICES');
    assert(KHEM_FOOTER_NAVIGATION[0].links.length === 4, 'OUR SERVICES contains 4 links');
    assert(KHEM_FOOTER_NAVIGATION[1].title === 'QUICK LINKS', 'Column 2 title: QUICK LINKS');
    assert(KHEM_FOOTER_NAVIGATION[1].links.some(([label]) => label === 'Complaint'), 'Complaint in Quick Links');
    assert(KHEM_FOOTER_NAVIGATION[2].title === 'COMPANY', 'Column 3 title: COMPANY');
    assert(KHEM_FOOTER_NAVIGATION[2].links.some(([label]) => label === 'About Us'), 'About Us in Company');
    assert(KHEM_FOOTER_NAVIGATION[2].links.some(([label]) => label === 'Grievance'), 'Grievance in Company');
    assert(KHEM_FOOTER_NAVIGATION[3].title === 'SUPPORT', 'Column 4 title: SUPPORT');
    assert(KHEM_FOOTER_NAVIGATION[3].links.some(([label]) => label === 'Contact Us'), 'Contact Us in Support');

    const allFooterLinks = KHEM_FOOTER_NAVIGATION.flatMap((col) => col.links.map(([label]) => label));
    assert(!allFooterLinks.includes('Religious Partner Registration'), 'Religious Partner Registration removed from Footer');
    assert(!allFooterLinks.includes('Knowledge Center'), 'Knowledge Center removed from Footer');

    results.push({ name: 'Locked Approved Four-Column Footer Navigation', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Locked Approved Four-Column Footer Navigation', status: 'FAILED', error: String(err) });
  }

  try {
    // Test 6: KHEM Architecture Lock v1.0 (CTA, Sidebar, Breadcrumb Root)
    assert(KHEM_ARCHITECTURE_LOCK_V1.rule1_sharedFooterSystem.includes('Universal Shared Footer'), 'Rule 1: Universal Shared Footer verified');
    assert(KHEM_ARCHITECTURE_LOCK_V1.rule2_sidebarPrimaryNav.includes('Primary Navigation'), 'Rule 2: Sidebar primary navigation verified');
    assert(KHEM_ARCHITECTURE_LOCK_V1.rule3_breadcrumbSecondaryNav.includes('Connect Hub Co.'), 'Rule 3: Breadcrumb root label Connect Hub Co. verified');
    assert(KHEM_ARCHITECTURE_LOCK_V1.rule4_navigationResponsibilities.includes('Header'), 'Rule 4: Navigation responsibilities separation verified');
    assert(Object.isFrozen(KHEM_ARCHITECTURE_LOCK_V1), 'KHEM_ARCHITECTURE_LOCK_V1 object is frozen');

    results.push({ name: 'KHEM Architecture Lock v1.0 (CTA, Sidebar, Breadcrumb Root)', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'KHEM Architecture Lock v1.0 (CTA, Sidebar, Breadcrumb Root)', status: 'FAILED', error: String(err) });
  }

  try {
    // Test 7: Hero 1 Core Services 10-Tile Layout & Unique Icons Validation
    assert(HERO_ONE_CORE_SERVICES.length === 10, 'Hero 1 Core Services contains exactly 10 tiles');
    
    const labels = HERO_ONE_CORE_SERVICES.map((s) => s.label);
    assert(labels.join('|') === [
      'Heritage & the Sacred Journey',
      'Verified Ritual Proxy',
      'Confidential & Private Rites',
      'Pitra Daan / Shraddha',
      'Platinum — Bespoke',
      'Virtual Sankalp & Tarpan',
      'Live Participation',
      'Elder & Family Support',
      'Ritual Prasad Dispatch',
      'Pre- and Post-Ritual Guidance',
    ].join('|'), 'Hero 1 Core Services exact order verified');

    const icons = HERO_ONE_CORE_SERVICES.map((s) => s.icon);
    const uniqueIcons = new Set(icons);
    assert(uniqueIcons.size === 10, 'Every tile icon across all 10 tiles is 100% unique');

    assert(Object.isFrozen(HERO_ONE_CORE_SERVICES), 'HERO_ONE_CORE_SERVICES object is frozen');

    results.push({ name: 'Hero 1 Core Services 10-Tile Layout & Unique Icons Validation', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Hero 1 Core Services 10-Tile Layout & Unique Icons Validation', status: 'FAILED', error: String(err) });
  }

  return results;
}

if (typeof require !== 'undefined' && require.main === module) {
  runKHEMNavigationShellTestSuite().then((res) => {
    console.log('=== KHEM NAVIGATION & VISUAL SHELL REGRESSION TEST RESULTS ===');
    console.log(JSON.stringify(res, null, 2));
  });
}
