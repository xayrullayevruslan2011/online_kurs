
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCourses } from '../contexts/CourseContext';
import { PlayCircle, Clock, BookOpen, ChevronRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { courses } = useCourses();

  // Filter courses that user owns
  const myCourses = courses.filter(c => user?.ownedCourses.includes(c.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Salom, {user?.fullName}! 👋</h1>
        <p className="text-gray-500 font-medium">O'rganishda davom eting va yangi cho'qqilarni zabt eting.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
         <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center">
               <BookOpen className="w-6 h-6 text-violet-600" />
            </div>
            <div>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Kurslar</p>
               <p className="text-2xl font-black text-gray-900">{myCourses.length}</p>
            </div>
         </div>
         <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
               <Clock className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">O'rganilgan darslar</p>
               <p className="text-2xl font-black text-gray-900">12 ta</p>
            </div>
         </div>
         <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
               <PlayCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Davomiylik</p>
               <p className="text-2xl font-black text-gray-900">4.5 soat</p>
            </div>
         </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Mening Kurslarim</h2>
        {myCourses.length === 0 && (
          <Link to="/" className="text-violet-600 font-bold hover:underline flex items-center gap-1">
            Yangi kurslar sotib olish <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {myCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myCourses.map((course) => (
            <div key={course.id} className="group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                   <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1 rounded-full text-xs font-bold">
                     {course.sections.length} bo'lim
                   </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-6">
                  {course.description}
                </p>
                <Link
                  to={`/course/${course.id}`}
                  className="inline-flex items-center justify-center w-full py-4 bg-gray-50 text-gray-900 font-bold rounded-2xl group-hover:bg-violet-600 group-hover:text-white transition-all gap-2"
                >
                  <PlayCircle className="w-5 h-5" />
                  Darsni boshlash
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-100">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Hali kursingiz yo'q</h3>
          <p className="text-gray-500 max-w-xs mx-auto mb-8">Platformadagi eng sara kurslarni sotib oling va o'rganishni boshlang.</p>
          <Link 
            to="/" 
            className="inline-flex px-8 py-4 bg-violet-600 text-white font-bold rounded-2xl hover:bg-violet-700 transition-all shadow-lg shadow-violet-200"
          >
            Kurslarni ko'rish
          </Link>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
