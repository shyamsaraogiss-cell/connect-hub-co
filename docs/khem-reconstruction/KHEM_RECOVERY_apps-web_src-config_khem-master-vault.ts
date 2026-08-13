/**
 * CONNECT HUB CO. — KHEM MASTER VAULT
 * 
 * PROTECTED EXTERNAL MASTER VAULT CONTAINING ALL FROZEN INVENTORY
 * LOCKED SOURCE OF TRUTH FOR NAVIGATION, VISUAL SHELL, BRAND GOVERNANCE, LOGOS, & RITUAL SERVICES.
 * DO NOT MUTATE OR UNFREEZE WITHOUT EXPLICIT FOUNDER APPROVAL.
 */

import {
  KHEM_PUBLIC_NAVIGATION,
  KHEM_INTERNAL_NAVIGATION,
  KHEM_EXACT_SIDEBAR_HIERARCHY,
  KHEM_FOOTER_NAVIGATION,
  KHEM_VISUAL_SHELL_TOKENS,
  KHEM_LOCKED_SHELL_COMPONENTS,
  KHEM_BRAND_TAGLINE,
  KHEM_NAVIGATION_LOCK_SEAL,
  KHEM_ARCHITECTURE_LOCK_V1,
  HERO_ONE_CORE_SERVICES,
  type SidebarItem,
  type FooterColumn,
  type VisualShellLock,
  type CoreServiceItem,
} from './khem-navigation.config';

import {
  LOGO_ONE_SRC,
  LOGO_TWO_SRC,
  LOGO_THREE_SRC,
} from './khem-logos.config';

export interface KhemMasterVault {
  readonly version: string;
  readonly lockSeal: string;
  readonly brandTagline: string;
  readonly architectureLock: typeof KHEM_ARCHITECTURE_LOCK_V1;
  readonly logoInventory: {
    readonly logoOne: string;
    readonly logoTwo: string;
    readonly logoThree: string;
  };
  readonly navigationInventory: {
    readonly publicNavigation: typeof KHEM_PUBLIC_NAVIGATION;
    readonly internalNavigation: typeof KHEM_INTERNAL_NAVIGATION;
    readonly sidebarHierarchy: readonly SidebarItem[];
    readonly footerNavigation: readonly FooterColumn[];
  };
  readonly visualShellInventory: {
    readonly tokens: typeof KHEM_VISUAL_SHELL_TOKENS;
    readonly lockedComponents: readonly VisualShellLock[];
  };
  readonly heroInventory: {
    readonly coreServices: readonly CoreServiceItem[];
  };
}

export const KHEM_MASTER_VAULT: KhemMasterVault = Object.freeze({
  version: '1.0.0-PROD_2026_PHASE_6A1',
  lockSeal: KHEM_NAVIGATION_LOCK_SEAL,
  brandTagline: KHEM_BRAND_TAGLINE,
  architectureLock: KHEM_ARCHITECTURE_LOCK_V1,
  logoInventory: Object.freeze({
    logoOne: LOGO_ONE_SRC,
    logoTwo: LOGO_TWO_SRC,
    logoThree: LOGO_THREE_SRC,
  }),
  navigationInventory: Object.freeze({
    publicNavigation: KHEM_PUBLIC_NAVIGATION,
    internalNavigation: KHEM_INTERNAL_NAVIGATION,
    sidebarHierarchy: KHEM_EXACT_SIDEBAR_HIERARCHY,
    footerNavigation: KHEM_FOOTER_NAVIGATION,
  }),
  visualShellInventory: Object.freeze({
    tokens: KHEM_VISUAL_SHELL_TOKENS,
    lockedComponents: KHEM_LOCKED_SHELL_COMPONENTS,
  }),
  heroInventory: Object.freeze({
    coreServices: HERO_ONE_CORE_SERVICES,
  }),
});
