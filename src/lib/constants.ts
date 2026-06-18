function formatPhone(tel: string): string {
  const digits = tel.replace(/\D/g, '');
  const n = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits;
  if (n.length === 10) return `(${n.slice(0, 3)}) ${n.slice(3, 6)}-${n.slice(6)}`;
  return tel;
}

const phoneTel = import.meta.env.VITE_PUBLIC_PHONE || '+16788357247';
const email = import.meta.env.VITE_PUBLIC_EMAIL || 'southerncareroadside@gmail.com';

export const BRAND = {
  name: 'SouthernCare Roadside',
  shortName: 'SouthernCare',
  tagline: '24/7 Mobile Roadside Service',
  area: 'Marietta, GA & North Metro Atlanta',
  phone: formatPhone(phoneTel),
  phoneTel,
  email,
  address: 'Marietta, GA 30060',
  taxRate: 0.07,
} as const;

export const HERO_IMAGE =
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80';

export const PROMO_GALLERY = [
  {
    id: 'promo-1',
    title: 'Mobile Tire Service',
    caption: 'Flat tire? We come to you.',
    image:
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'promo-2',
    title: 'Jump Starts & Batteries',
    caption: 'Back on the road in minutes.',
    image:
      'https://images.unsplash.com/photo-1625047509248-ec889cbff817?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'promo-3',
    title: 'Lockout Assistance',
    caption: 'Safe, fast vehicle entry.',
    image:
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'promo-4',
    title: 'Fuel Delivery',
    caption: 'Emergency gas when you need it.',
    image:
      'https://images.unsplash.com/photo-1570125909232-e09757a06ad4?auto=format&fit=crop&w=800&q=80',
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
    image:
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'jump',
    name: 'Jump Start',
    description: 'Dead battery? Fast jump start service at your location.',
    icon: 'battery' as const,
    priceFrom: 55,
    image:
      'https://images.unsplash.com/photo-1625047509248-ec889cbff817?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'lockout',
    name: 'Lockout Service',
    description: 'Locked out of your vehicle? We will get you back in safely.',
    icon: 'lock' as const,
    priceFrom: 75,
    image:
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'fuel',
    name: 'Fuel Delivery',
    description: 'Ran out of gas? Emergency fuel delivery to your location.',
    icon: 'fuel' as const,
    priceFrom: 50,
    image:
      'https://images.unsplash.com/photo-1570125909232-e09757a06ad4?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'battery',
    name: 'Battery Service',
    description: 'Battery testing, replacement, and installation on-site.',
    icon: 'bolt' as const,
    priceFrom: 120,
    image:
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'oil',
    name: 'Oil Change',
    description: 'Mobile oil change service — no shop visit required.',
    icon: 'oil' as const,
    priceFrom: 85,
    image:
      'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'brakes',
    name: 'Brake Service',
    description: 'Brake inspection and repair at your home or office.',
    icon: 'brake' as const,
    priceFrom: 150,
    image:
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'roadside',
    name: 'General Roadside',
    description: 'Full roadside assistance for any automotive emergency.',
    icon: 'road' as const,
    priceFrom: 65,
    image:
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80',
  },
] as const;

export const DEFAULT_LINE_ITEMS = [
  { description: 'Roadside call-out fee', quantity: 1, unitPrice: 65 },
  { description: 'Mobile tire change', quantity: 1, unitPrice: 50 },
  { description: 'Jump start service', quantity: 1, unitPrice: 55 },
  { description: 'Lockout service', quantity: 1, unitPrice: 75 },
  { description: 'Fuel delivery (up to 2 gal)', quantity: 1, unitPrice: 50 },
];
