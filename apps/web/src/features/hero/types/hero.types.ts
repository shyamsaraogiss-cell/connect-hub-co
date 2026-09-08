export type HeroKey =
  | 'pitru-moksha-gaya'
  | 'ritual-services'
  | 'travel-assistance'
  | 'vahi-records'
  | 'religious-partner-network';

export type HeroOrder = 1 | 2 | 3 | 4 | 5;

export type HeroAiContextKey =
  | 'pitru-moksha-gaya'
  | 'ritual-services'
  | 'travel-assistance'
  | 'vahi-records'
  | 'religious-partners';

export interface HeroExploreContent {
  readonly label: string;
  readonly description: string | null;
  readonly href: string;
}

export interface HeroBackgroundAsset {
  readonly identity: string;
  readonly sourcePath: string;
  readonly runtimePath: string | null;
}

export interface HeroAccessibilityMetadata {
  readonly label: string;
  readonly backgroundAlt: string | null;
}

export interface HeroSlideData {
  readonly id: HeroKey;
  readonly index: HeroOrder;
  readonly route: string;
  readonly title: string;
  readonly brand: string | null;
  readonly philosophy: string | null;
  readonly promise: string | null;
  readonly body: string | null;
  readonly bullets: readonly string[];
  readonly closingLine: string | null;
  readonly representativeLabel: string | null;
  readonly trustItems: readonly string[];
  readonly explore: HeroExploreContent | null;
  readonly aiContextKey: HeroAiContextKey;
  readonly coreServicesActiveItem: string;
  readonly backgroundAsset: HeroBackgroundAsset | null;
  readonly accessibility: HeroAccessibilityMetadata;
}
