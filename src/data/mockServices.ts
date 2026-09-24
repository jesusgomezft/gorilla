import { ServiceTier } from '../types';

export const MOCK_SERVICES: ServiceTier[] = [
  {
    id: 'regular',
    name: 'Collector Regular',
    tagline: 'Perfect for personal collections.',
    turnaroundDays: 25,
    turnaroundLabel: '25 Business Days',
    priceEur: 15.00,
    maxDeclaredValueEur: 200,
    subgradesIncluded: false,
    highResScans: false,
    priorityQueue: false,
    recommendedFor: 'Base cards, personal binders & casual submissions',
  },
  {
    id: 'standard',
    name: 'Precision Standard',
    tagline: 'The perfect balance. Subgrades and HD public registry.',
    turnaroundDays: 10,
    turnaroundLabel: '10 Business Days',
    priceEur: 28.00,
    maxDeclaredValueEur: 1000,
    subgradesIncluded: true,
    highResScans: true,
    priorityQueue: false,
    recommendedFor: 'Modern Pokémon, One Piece, Magic & Lorcana sets',
    badge: 'Most Popular'
  },
  {
    id: 'express',
    name: 'Priority Express',
    tagline: 'Optical speed for demanding markets.',
    turnaroundDays: 2,
    turnaroundLabel: '48 Hours',
    priceEur: 65.00,
    maxDeclaredValueEur: 5000,
    subgradesIncluded: true,
    highResScans: true,
    priorityQueue: true,
    recommendedFor: 'High-value hits, tournament decks & fast market flipping',
    badge: 'Priority'
  },
  {
    id: 'walkthrough',
    name: 'Master Walk-Through',
    tagline: 'Exclusive white-glove treatment for historic grails.',
    turnaroundDays: 2,
    turnaroundLabel: '48 Hours',
    priceEur: 140.00,
    maxDeclaredValueEur: 25000,
    subgradesIncluded: true,
    highResScans: true,
    priorityQueue: true,
    recommendedFor: 'Vintage grails, 1st Edition Charizards, Alpha Power 9',
    badge: 'White Glove'
  }
];

export const GRADING_SECURITY_FEATURES = [
  {
    title: 'Ultrasonic Hermetic Weld',
    description: 'Aircraft-grade UV-resistant acrylic fused under 35kHz ultrasonic sound waves for complete moisture and atmospheric isolation.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Optical Telemetry QR & NFC',
    description: 'Each slab embeds a cryptographic NFC chip and laser-engraved micro-QR linking directly to the digital certificate registry.',
    icon: 'Cpu'
  },
  {
    title: 'Micro-Fiber Precision Sub-labels',
    description: 'Tamper-evident holographic foil header with metallic micro-text and dual-sided numeric subgrade breakdown.',
    icon: 'Layers'
  },
  {
    title: 'European Custody Tracking',
    description: 'Zero transatlantic customs risk. Fully insured transport within EU boundaries with continuous chain-of-custody logging.',
    icon: 'Truck'
  }
];
