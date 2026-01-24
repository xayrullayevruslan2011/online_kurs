
export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  ownedCourses: string[]; // IDs of courses
}

export interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  content: string;
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
  isPopular?: boolean;
}
