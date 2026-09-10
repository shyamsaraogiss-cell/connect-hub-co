import rules from './priest-terminology.rules.json';

const replacements = rules.map(rule => ({ pattern: new RegExp(rule.pattern, 'gi'), replacement: rule.replacement }));

/** Display copy only: never use this formatter to alter persisted values or API inputs. */
export function priestTerminology(text: string): string {
  return replacements.reduce((value, { pattern, replacement }) => {
    // Travel-provider terminology is outside the priest onboarding lock.
    if (/\btravel\b/i.test(text) && !/\b(?:religious|priest)\b/i.test(text)) return value;
    return value.replace(pattern, match => match === match.toUpperCase() ? replacement.toUpperCase() : replacement);
  }, text);
}

export function priestErrorMessage(message: string): string {
  const labels: Record<string, string> = {
    PARTNER_NOT_FOUND: 'Verified Priest not found.',
    PARTNER_USER_NOT_FOUND: 'Priest account not found.',
    PARTNER_USER_NOT_ELIGIBLE: 'Priest account is not eligible.',
    PARTNER_USER_ALREADY_LINKED: 'Priest account is already linked.',
    PARTNER_ALREADY_LINKED: 'Priest Profile is already linked.',
    ASSIGNED_PARTNER_NOT_ELIGIBLE: 'Assigned Verified Priest is not eligible.',
  };
  return labels[message] ?? priestTerminology(message);
}

/** Preserve workflow enum values while giving them their approved display labels. */
export function priestWorkflowLabel(value: string): string {
  if (value === 'PARTNER_REGISTRATION') return 'Priest Registration';
  if (value === 'RELIGIOUS_PARTNER') return 'Verified Priest';
  return priestTerminology(value);
}
