
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCourses } from '../contexts/CourseContext';
import { useAuth } from '../contexts/AuthContext';
import { ChevronLeft, Play, Lock, CheckCircle, FileText } from 'lucide-react';

const CoursePlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { courses } = useCourses();
  const { user } = useAuth();
  const [currentLesson, setCurrentLesson] = useState<any>(null);

  const course = courses.find(c => c.id === id);
  const isOwned = user?.ownedCourses.includes(id || '');

  useEffect(() => {
    if (course && course.sections.length > 0 && course.sections[0].lessons.length > 0) {
      setCurrentLesson(course.sections[0].lessons[0]);
    }
  }, [course]);

  if (!course) return <div className="p-20 text-center">Kurs topilmadi.</div>;
  if (!isOwned) return <div className="p-20 text-center">Sizda bu kursga kirish huquqi yo'q. Avval uni sotib oling.</div>;

  return (
    <div className="min-h-screen bg-gray-50 lg:flex">
      {/* Sidebar - Desktop */}
      <div className="lg:w-96 lg:h-screen lg:sticky lg:top-0 bg-white border-r border-gray-100 overflow-y-auto z-10">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <Link to="/dashboard" className="flex items-center gap-2 text-sm font-bold text-violet-600 hover:text-violet-700 mb-4 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            Boshqaruv paneli
          </Link>
          <h1 className="text-xl font-black text-gray-900 tracking-tight">{course.title}</h1>
        </div>
        
        <div className="p-4 space-y-2">
          {course.sections.map((section, sIdx) => (
            <div key={section.id} className="space-y-1">
              <div className="px-4 py-2">
                 <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">{sIdx + 1}-Bo'lim: {section.title}</h3>
              </div>
              {section.lessons.map((lesson, lIdx) => (
                <button
                  key={lesson.id}
                  onClick={() => setCurrentLesson(lesson)}
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all ${currentLesson?.id === lesson.id ? 'bg-violet-600 text-white shadow-lg shadow-violet-200' : 'hover:bg-gray-50 text-gray-600'}`}
                >
                  <div className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold border ${currentLesson?.id === lesson.id ? 'bg-white/20 border-white/30 text-white' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
                    {lIdx + 1}
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`text-sm font-bold leading-tight ${currentLesson?.id === lesson.id ? 'text-white' : 'text-gray-900'}`}>{lesson.title}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                       <Play className={`w-3 h-3 ${currentLesson?.id === lesson.id ? 'text-white/70' : 'text-gray-400'}`} />
                       <span className={`text-[10px] font-bold ${currentLesson?.id === lesson.id ? 'text-white/60' : 'text-gray-400'}`}>12:45</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {currentLesson ? (
          <>
            <div className="aspect-video w-full bg-black relative">
               <iframe
                src={currentLesson.videoUrl}
                className="absolute inset-0 w-full h-full"
                title={currentLesson.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="max-w-4xl mx-auto px-6 py-12">
               <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">{currentLesson.title}</h2>
                    <div className="flex items-center gap-3">
                       <span className="flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold">
                         <CheckCircle className="w-3 h-3" /> Yakunlangan
                       </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                     <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-700 hover:border-violet-600 hover:text-violet-600 transition-all">
                        <FileText className="w-4 h-4" /> Materiallar
                     </button>
                  </div>
               </div>
               <div className="prose prose-violet max-w-none text-gray-600 leading-relaxed font-medium">
                 {currentLesson.content}
               </div>
            </div>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 font-medium">
            Darsni tanlang...
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePlayer;
