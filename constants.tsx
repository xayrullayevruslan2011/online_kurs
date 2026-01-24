
import { PricingPlan, Course } from './types';

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: 'Silver',
    price: 15000,
    features: [
      'Barcha asosiy kurslar',
      'Telegram guruhga aʼzo boʻlish',
      'Kurs materiallari (PDF)',
      'Cheksiz darslarni koʻrish'
    ]
  },
  {
    name: 'Gold',
    price: 20000,
    isPopular: true,
    features: [
      'Barcha Silver imkoniyatlari',
      'Mentor yordami',
      'Haftalik Zoom uchrashuvlar',
      'Loyihalar ustida ishlash',
      'Sertifikat'
    ]
  },
  {
    name: 'VIP',
    price: 30000,
    features: [
      'Barcha Gold imkoniyatlari',
      'Shaxsiy mentor (1-ga-1)',
      'Ishga joylashishda yordam',
      'Portfolio yaratish',
      'Maxfiy master-klasslar'
    ]
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'React.js To\'liq Kurs',
    description: 'React asoslaridan boshlab professional darajagacha o\'rganing.',
    price: 15000,
    image: 'https://picsum.photos/seed/react/800/600',
    sections: [
      {
        id: 's1',
        title: 'Kirish',
        lessons: [
          { id: 'l1', title: 'React nima?', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Ushbu darsda React kutubxonasi bilan tanishamiz.' },
          { id: 'l2', title: 'Vite o\'rnatish', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content: 'Loyiha muhitini sozlash.' }
        ]
      }
    ]
  },
  {
    id: 'c2',
    title: 'Node.js Backend Asoslari',
    description: 'Server tomonlama dasturlashni Express va MongoDB bilan o\'rganing.',
    price: 20000,
    image: 'https://picsum.photos/seed/node/800/600',
    sections: []
  }
];
