// Bu fayl ma'lumotlar turlarini belgilaydi (TypeScript uchun)

export interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  content: string;
  duration?: string; // Ixtiyoriy
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  sections: Section[];
}

export interface PricingPlan {
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean; // Tavsiya etilgan tarif uchun
  recommended?: boolean; // Eski kod bilan moslik uchun (agar kerak bo'lsa)
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  purchasedCourses: string[]; // Sotib olingan kurslar ID si
}