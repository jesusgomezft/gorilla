export interface ConceptDefinition {
  id: 'precision' | 'gallery' | 'jungle' | 'hybrid';
  name: string;
  tagline: string;
  subtitle: string;
  themeStyle: string;
  targetPersona: string;
  coreEmotion: string;
  keyVisualElements: string[];
  signatureFeature: string;
  toneOfVoice: string;
  bananaUsage: string;
  pros: string[];
  risksToWatch: string[];
  colorTokens: {
    bg: string;
    accent: string;
    surface: string;
    text: string;
  };
}

export const CONCEPTS_METADATA: Record<string, ConceptDefinition> = {
  precision: {
    id: 'precision',
    name: 'Model 01 — Precision Lab',
    tagline: 'Gorilla as a Precision Optical Technology Authority',
    subtitle: 'High rigor, mathematical evidence, laser centering telemetry and darkfield inspection.',
    themeStyle: 'Technical Charcoal & Laser Green Calipers',
    targetPersona: 'Analytical collectors, high-value investors, European grading purists (Sanne / EU-wide)',
    coreEmotion: 'Unshakable scientific trust, mathematical transparency, objective accuracy',
    keyVisualElements: [
      'High-contrast charcoal & deep obsidian backdrop',
      'Laser-green telemetry calipers and coordinate overlays',
      'Micro-metric subgrade visualizers (50/50 ratios, 40x zoom)',
      'Clean tabular data hierarchy without decorative clutter'
    ],
    signatureFeature: 'Interactive Optical Subgrade Inspector (reveal micro-defects layer-by-layer)',
    toneOfVoice: 'Objective, calm, exact, metric-backed, zero hype',
    bananaUsage: 'Strictly eliminated from technical & certification contexts',
    pros: [
      'Maximizes technological credibility against US incumbents (PSA, BGS, TAG)',
      'Provides definitive answer to why a card received a 9.5 vs 10.0',
      'Appeals strongly to high-ticket card owners requiring evidence'
    ],
    risksToWatch: [
      'Must avoid feeling cold or intimidating to novice submitters'
    ],
    colorTokens: {
      bg: '#080B0E',
      accent: '#00DF81',
      surface: '#0F151C',
      text: '#F1F5F9'
    }
  },
  gallery: {
    id: 'gallery',
    name: 'Model 02 — Collector Gallery',
    tagline: 'The Slab and Card as Museum-Grade Art Objects',
    subtitle: 'Luxury editorial atmosphere, warm stone backgrounds, cinematic lighting, and archival prestige.',
    themeStyle: 'Warm Off-White Stone, Soft Charcoal & Subtle Gold Foil Accents',
    targetPersona: 'Vintage connoisseurs, art card enthusiasts, exhibition collectors (Mara / Southern Europe)',
    coreEmotion: 'Prestige, preservation, emotional connection to childhood treasures',
    keyVisualElements: [
      'Warm archival parchment & stone background (#F9F8F6)',
      'Cinematic 3D slab tilt with gold foil shimmer and ambient shadow',
      'Editorial serif & modern typography pairing',
      'Museum artifact cataloging layout'
    ],
    signatureFeature: 'Slab Showcase Mode with dynamic angle lighting and archival provenance plaque',
    toneOfVoice: 'Cultivated, respectful, timeless, reassuring',
    bananaUsage: 'Zero presence; replaced by classical museum numbering',
    pros: [
      'Positions Gorilla as the premier European luxury casing brand',
      'Makes cards look visually stunning and ready for physical display',
      'Differentiates sharply from generic tech/gaming platforms'
    ],
    risksToWatch: [
      'Must maintain prominent, frictionless submit/pricing CTAs'
    ],
    colorTokens: {
      bg: '#F9F8F6',
      accent: '#10B981',
      surface: '#FFFFFF',
      text: '#1C1917'
    }
  },
  jungle: {
    id: 'jungle',
    name: 'Model 03 — Digital Jungle',
    tagline: 'Modern TCG Energy, Community Pulse & Physical Shows',
    subtitle: 'Dynamic scanning portal, card show integrations, vibrant community verified feed, and Gorilla character.',
    themeStyle: 'Lush Deep Rainforest Slate, Neon Emerald & Community Accents',
    targetPersona: 'Active card show attendees, local game store communities, modern TCG collectors (Pokémon, One Piece)',
    coreEmotion: 'Excitement, belonging, empowerment, accessible protection',
    keyVisualElements: [
      'Deep emerald dark mode with subtle biometric canopy patterns',
      'Live Card Journey animated scanner portal',
      'Card show & local drop-off location badges (Madrid, Lisbon, Barcelona, Paris)',
      'Informal "Banana Quick-Check" booth tool'
    ],
    signatureFeature: 'Live Card Journey Portal + Event Drop-off Locator & Banana Check badge',
    toneOfVoice: 'Warm, direct, community-first, approachable, authentic',
    bananaUsage: 'Preserved exclusively as an informal fast pre-check badge at card shows',
    pros: [
      'Creates instant connection with the thriving European card show and creator scene',
      'Makes the brand warm, memorable, and distinctively Gorilla',
      'Converts first-time submitters intimidated by legacy grading giants'
    ],
    risksToWatch: [
      'Banana and jungle motifs must remain subtle and never bleed into official certificates'
    ],
    colorTokens: {
      bg: '#0A130D',
      accent: '#10B981',
      surface: '#112217',
      text: '#F8FAFC'
    }
  },
  hybrid: {
    id: 'hybrid',
    name: 'Model 04 — Hybrid Baseline',
    tagline: 'The Strategic Synthesis: Precision + Luxury + Gorilla Identity',
    subtitle: 'Harmonious fusion combining optical evidence clarity, luxury slab aesthetics, and approachable warmth.',
    themeStyle: 'Balanced Obsidian Slate with Emerald Precision and High-Gloss Slab Highlights',
    targetPersona: 'Universal European TCG ecosystem (Vintage + Modern, Online + Physical Shows)',
    coreEmotion: 'Total confidence, European speed, premium craftsmanship',
    keyVisualElements: [
      'Harmonious deep slate with crisp laser green indicators',
      'Refined card gallery with expandable optical defect drawer',
      'Balanced dual CTAs: "Submit Online (EU Insured)" & "Drop-off at Card Show"',
      'Clear 4-point subgrade badge with instant provenance verification'
    ],
    signatureFeature: 'Omnichannel Grading Experience (Optical telemetry + Luxury slab + Show Drop-off)',
    toneOfVoice: 'Authoritative yet approachable, concise, European-centric',
    bananaUsage: 'Restricted strictly to informal show booth sidebars',
    pros: [
      'Balances all stakeholder priorities seamlessly',
      'Delivers highest overall conversion potential across diverse collector segments',
      'Recommended default baseline for initial market rollout'
    ],
    risksToWatch: [
      'Requires disciplined brand governance to keep all three pillars in equilibrium'
    ],
    colorTokens: {
      bg: '#0B0F14',
      accent: '#10B981',
      surface: '#121820',
      text: '#F8FAFC'
    }
  }
};
