import { IMAGES } from './images';

export const BRAND = {
  name: 'SouthernCare Roadside',
  shortName: 'SouthernCare',
  tagline: '24/7 Mobile Roadside Service',
  area: 'Marietta, GA & North Metro Atlanta',
  phone: '(678) 835-7247',
  phoneTel: '+16788357247',
  email: 'southerncareroadside@gmail.com',
  address: 'Marietta, GA 30060',
  taxRate: 0.07,
} as const;

export const HERO_IMAGE = IMAGES.hero;

export const PROMO_GALLERY = [
  {
    id: 'promo-1',
    title: 'Mobile Tire Service',
    caption: 'Flat tire? We come to you.',
    image: IMAGES.tire,
  },
  {
    id: 'promo-2',
    title: 'Battery & Jump Start',
    caption: 'Dead battery? Back on the road fast.',
    image: IMAGES.batteryService,
  },
  {
    id: 'promo-3',
    title: 'Lockout Assistance',
    caption: 'Safe, fast vehicle entry.',
    image: IMAGES.lockout,
  },
  {
    id: 'promo-4',
    title: 'Fuel Delivery',
    caption: 'Emergency gas when you need it.',
    image: IMAGES.fuel,
  },
] as const;

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
    icon: 'tire' as const,
    priceFrom: 65,
    image: IMAGES.tire,
  },
  {
    id: 'jump',
    name: 'Jump Start',
    description: 'Dead battery? Fast jump start service at your location.',
    icon: 'battery' as const,
    priceFrom: 55,
    image: IMAGES.batteryService,
  },
  {
    id: 'lockout',
    name: 'Lockout Service',
    description: 'Locked out of your vehicle? We will get you back in safely.',
    icon: 'lock' as const,
    priceFrom: 75,
    image: IMAGES.lockout,
  },
  {
    id: 'fuel',
    name: 'Fuel Delivery',
    description: 'Ran out of gas? Emergency fuel delivery to your location.',
    icon: 'fuel' as const,
    priceFrom: 50,
    image: IMAGES.fuel,
  },
  {
    id: 'battery',
    name: 'Battery Service',
    description: 'Battery testing, replacement, and installation on-site.',
    icon: 'bolt' as const,
    priceFrom: 120,
    image: IMAGES.battery,
  },
  {
    id: 'oil',
    name: 'Oil Change',
    description: 'Mobile oil change service — no shop visit required.',
    icon: 'oil' as const,
    priceFrom: 85,
    image: IMAGES.oil,
  },
  {
    id: 'brakes',
    name: 'Brake Service',
    description: 'Brake inspection and repair at your home or office.',
    icon: 'brake' as const,
    priceFrom: 150,
    image: IMAGES.brakes,
  },
  {
    id: 'roadside',
    name: 'General Roadside',
    description: 'Full roadside assistance for any automotive emergency.',
    icon: 'road' as const,
    priceFrom: 65,
    image: IMAGES.hero,
  },
] as const;

export const DEFAULT_LINE_ITEMS = [
  { description: 'Roadside call-out fee', quantity: 1, unitPrice: 65 },
  { description: 'Mobile tire change', quantity: 1, unitPrice: 50 },
  { description: 'Jump start service', quantity: 1, unitPrice: 55 },
  { description: 'Lockout service', quantity: 1, unitPrice: 75 },
  { description: 'Fuel delivery (up to 2 gal)', quantity: 1, unitPrice: 50 },
];
