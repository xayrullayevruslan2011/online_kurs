
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Course, Section, Lesson } from '../types';
import { INITIAL_COURSES } from '../constants';

interface CourseContextType {
  courses: Course[];
  addCourse: (course: Omit<Course, 'id' | 'sections'>) => void;
  addSection: (courseId: string, title: string) => void;
  addLesson: (courseId: string, sectionId: string, lesson: Omit<Lesson, 'id'>) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const savedCourses = localStorage.getItem('lms_courses');
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    } else {
      setCourses(INITIAL_COURSES);
    }
  }, []);

  useEffect(() => {
    if (courses.length > 0) {
      localStorage.setItem('lms_courses', JSON.stringify(courses));
    }
  }, [courses]);

  const addCourse = (newCourse: Omit<Course, 'id' | 'sections'>) => {
    const course: Course = {
      ...newCourse,
      id: `c-${Date.now()}`,
      sections: []
    };
    setCourses([...courses, course]);
  };

  const addSection = (courseId: string, title: string) => {
    setCourses(courses.map(c => {
      if (c.id === courseId) {
        return {
          ...c,
          sections: [...c.sections, { id: `s-${Date.now()}`, title, lessons: [] }]
        };
      }
      return c;
    }));
  };

  const addLesson = (courseId: string, sectionId: string, lesson: Omit<Lesson, 'id'>) => {
    setCourses(courses.map(c => {
      if (c.id === courseId) {
        return {
          ...c,
          sections: c.sections.map(s => {
            if (s.id === sectionId) {
              return {
                ...s,
                lessons: [...s.lessons, { ...lesson, id: `l-${Date.now()}` }]
              };
            }
            return s;
          })
        };
      }
      return c;
    }));
  };

  return (
    <CourseContext.Provider value={{ courses, addCourse, addSection, addLesson }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};
