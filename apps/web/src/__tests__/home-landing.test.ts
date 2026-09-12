import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export async function runHomeLandingTestSuite() {
  const results: { name: string; status: 'PASSED' | 'FAILED'; error?: string }[] = [];
  const assert = (condition: boolean, message: string) => {
    if (!condition) throw new Error(`Assertion failed: ${message}`);
  };

  try {
    const themePath = resolve(process.cwd(), 'apps/web/src/styles/public-theme.css');
    const theme = readFileSync(themePath, 'utf8');
    for (const token of [
      '--ch-bg',
      '--ch-bg-elevated',
      '--ch-ink',
      '--ch-ink-muted',
      '--ch-accent',
      '--ch-accent-soft',
      '--ch-gold',
      '--ch-gold-soft',
      '--ch-hero-overlay',
    ]) {
      assert(theme.includes(token), `public-theme.css defines ${token}`);
    }
    results.push({ name: 'Public theme tokens exist', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Public theme tokens exist', status: 'FAILED', error: String(err) });
  }

  try {
    const headerPath = resolve(
      process.cwd(),
      'apps/web/src/components/auth/PublicHeader.tsx',
    );
    const footerPath = resolve(
      process.cwd(),
      'apps/web/src/components/auth/BusinessFooter.tsx',
    );
    const header = readFileSync(headerPath, 'utf8');
    const footer = readFileSync(footerPath, 'utf8');
    assert(header.includes('--ch-') || header.includes('var(--ch-'), 'header uses public tokens');
    assert(footer.includes('--ch-') || footer.includes('var(--ch-'), 'footer uses public tokens');
    results.push({ name: 'Public chrome uses shared tokens', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({
      name: 'Public chrome uses shared tokens',
      status: 'FAILED',
      error: String(err),
    });
  }

  try {
    const { homeLandingContent } = await import('../features/home-landing/content');
    assert(homeLandingContent.brand === 'Connect Hub Co.', 'brand lock');
    assert(homeLandingContent.slides.length === 5, 'five hero slides');
    const hrefs = homeLandingContent.slides.map((s) => s.cta.href);
    assert(hrefs.includes('/pitru-moksha-gaya'), 'includes PitruMoksha Gaya');
    assert(hrefs.includes('/ritual-services'), 'includes Ritual Services');
    assert(hrefs.includes('/travel-assistance'), 'includes Travel Assistance');
    assert(hrefs.includes('/vahi-records'), 'includes Vahi Records');
    assert(hrefs.includes('/religious-partners'), 'includes Verified Priest route');
    results.push({ name: 'Home landing content + routes', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Home landing content + routes', status: 'FAILED', error: String(err) });
  }

  try {
    const pagePath = resolve(process.cwd(), 'apps/web/src/app/page.tsx');
    const page = readFileSync(pagePath, 'utf8');
    assert(page.includes('HomeLanding'), 'page.tsx renders HomeLanding');
    assert(!page.includes('BusinessHome'), 'page.tsx no longer uses BusinessHome scaffold');
    assert(!page.includes('PublicHeroShell'), 'homepage does not use PublicHeroShell');
    results.push({ name: 'Homepage entry uses HomeLanding', status: 'PASSED' });
  } catch (err: unknown) {
    results.push({ name: 'Homepage entry uses HomeLanding', status: 'FAILED', error: String(err) });
  }

  return results;
}

if (require.main === module) {
  void runHomeLandingTestSuite().then((results) => {
    console.log(results);
    if (results.some((r) => r.status === 'FAILED')) process.exit(1);
  });
}
