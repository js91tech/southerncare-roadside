export const BRAND = {
  name: 'SouthernCare Roadside',
  shortName: 'SouthernCare',
  tagline: '24/7 Mobile Roadside Service',
  area: 'Marietta, GA & North Metro Atlanta',
  phone: '(770) 555-0100',
  phoneTel: '+17705550100',
  email: 'help@southerncare-roadside.com',
  address: 'Marietta, GA 30060',
  taxRate: 0.07,
} as const;

export const SERVICE_AREAS = [
  'Marietta',
  'Smyrna',
  'Kennesaw',
  'Roswell',
  'Sandy Springs',
  'East Cobb',
  'Woodstock',
  'Acworth',
] as const;

export const SERVICES = [
  {
    id: 'tire',
    name: 'Tire Repair & Replacement',
    description: 'Flat tire? We come to you with mobile tire repair and replacement.',
    icon: 'tire',
    priceFrom: 65,
  },
  {
    id: 'jump',
    name: 'Jump Start',
    description: 'Dead battery? Fast jump start service at your location.',
    icon: 'battery',
    priceFrom: 55,
  },
  {
    id: 'lockout',
    name: 'Lockout Service',
    description: 'Locked out of your vehicle? We will get you back in safely.',
    icon: 'lock',
    priceFrom: 75,
  },
  {
    id: 'fuel',
    name: 'Fuel Delivery',
    description: 'Ran out of gas? Emergency fuel delivery to your location.',
    icon: 'fuel',
    priceFrom: 50,
  },
  {
    id: 'battery',
    name: 'Battery Service',
    description: 'Battery testing, replacement, and installation on-site.',
    icon: 'bolt',
    priceFrom: 120,
  },
  {
    id: 'oil',
    name: 'Oil Change',
    description: 'Mobile oil change service — no shop visit required.',
    icon: 'oil',
    priceFrom: 85,
  },
  {
    id: 'brakes',
    name: 'Brake Service',
    description: 'Brake inspection and repair at your home or office.',
    icon: 'brake',
    priceFrom: 150,
  },
  {
    id: 'roadside',
    name: 'General Roadside',
    description: 'Full roadside assistance for any automotive emergency.',
    icon: 'road',
    priceFrom: 65,
  },
] as const;

export const DEFAULT_LINE_ITEMS = [
  { description: 'Roadside call-out fee', quantity: 1, unitPrice: 65 },
  { description: 'Mobile tire change', quantity: 1, unitPrice: 50 },
  { description: 'Jump start service', quantity: 1, unitPrice: 55 },
  { description: 'Lockout service', quantity: 1, unitPrice: 75 },
  { description: 'Fuel delivery (up to 2 gal)', quantity: 1, unitPrice: 50 },
];
