import { ServiceTier } from '../types';

export const MOCK_SERVICES: ServiceTier[] = [
  {
    id: 'standard',
    name: 'Standard Grading',
    tagline: 'Ideal for modern binders, personal collections & casual submissions.',
    turnaroundDays: 15,
    turnaroundLabel: '15 Business Days',
    priceEur: 19.99,
    maxDeclaredValueEur: 500,
    subgradesIncluded: true,
    highResScans: true,
    priorityQueue: false,
    recommendedFor: 'Modern Pokémon, One Piece, Magic & Lorcana sets',
  },
  {
    id: 'express',
    name: 'Express Speed',
    tagline: 'Accelerated optical grading with high-priority European turnaround.',
    turnaroundDays: 5,
    turnaroundLabel: '5 Business Days',
    priceEur: 42.00,
    maxDeclaredValueEur: 2500,
    subgradesIncluded: true,
    highResScans: true,
    priorityQueue: true,
    recommendedFor: 'High-value hits, tournament decks & fast market flipping',
    badge: 'Most Popular'
  },
  {
    id: 'walkthrough',
    name: 'Master Walk-Through',
    tagline: 'VIP single-day turnaround with direct Senior Grader consultation.',
    turnaroundDays: 1,
    turnaroundLabel: '24–48 Hours / Card Show Drop-off',
    priceEur: 110.00,
    maxDeclaredValueEur: 25000,
    subgradesIncluded: true,
    highResScans: true,
    priorityQueue: true,
    recommendedFor: 'Vintage grails, 1st Edition Charizards, Alpha Power 9',
    badge: 'VIP White Glove'
  },
  {
    id: 'bulk',
    name: 'Collector Bulk (25+ Cards)',
    tagline: 'The most cost-efficient tier for dealers, content creators & large submitters.',
    turnaroundDays: 25,
    turnaroundLabel: '25–30 Business Days',
    priceEur: 14.50,
    maxDeclaredValueEur: 250,
    subgradesIncluded: false,
    highResScans: true,
    priorityQueue: false,
    recommendedFor: 'Full master sets, sealed case breaks, store inventories',
    badge: 'Best Value'
  },
  {
    id: 'reholder',
    name: 'Re-Holder & Cross-Cert',
    tagline: 'Transfer cracked slabs or upgrade other grading companies to Gorilla Sonic Slab.',
    turnaroundDays: 10,
    turnaroundLabel: '10 Business Days',
    priceEur: 12.00,
    maxDeclaredValueEur: 5000,
    subgradesIncluded: true,
    highResScans: true,
    priorityQueue: false,
    recommendedFor: 'PSA / BGS / CGC cracked case upgrades to European Gorilla Slab',
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
