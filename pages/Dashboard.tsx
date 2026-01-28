import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCourses } from '../contexts/CourseContext';
import { PlayCircle, Clock, BookOpen, ChevronRight, Lock, ShoppingCart } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { courses } = useCourses();
  const navigate = useNavigate();

  // Foydalanuvchi sotib olgan kurslar
  const ownedCourses = courses.filter(c => user?.ownedCourses.includes(c.id));
  
  // Statistika uchun
  const totalOwned = ownedCourses.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Salomlashish qismi */}
      <div className="mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Salom, {user?.fullName || 'Talaba'}! 👋</h1>
        <p className="text-gray-500 font-medium">O'z kelajagingiz uchun bugun harakat qiling.</p>
      </div>

      {/* Statistika */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
         <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center">
               <BookOpen className="w-6 h-6 text-violet-600" />
            </div>
            <div>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sizning Kurslar</p>
               <p className="text-2xl font-black text-gray-900">{totalOwned} ta</p>
            </div>
         </div>
         <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
               <Clock className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">O'rganish vaqti</p>
               <p className="text-2xl font-black text-gray-900">0 soat</p>
            </div>
         </div>
         <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center">
               <PlayCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
               <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Faollik</p>
               <p className="text-2xl font-black text-gray-900">1 kun</p>
            </div>
         </div>
      </div>

      {/* Kurslar Ro'yxati */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Mavjud Kurslar</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => {
          // Tekshiramiz: Bu kurs sotib olinganmi?
          const isOwned = user?.ownedCourses.includes(course.id);

          return (
            <div key={course.id} className={`group bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 ${!isOwned ? 'opacity-90' : ''}`}>
              
              {/* Rasm qismi */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className={`w-full h-full object-cover transition-transform duration-500 ${isOwned ? 'group-hover:scale-105' : 'grayscale'}`}
                />
                
                {/* Qulf belgisi (Agar sotib olinmagan bo'lsa) */}
                {!isOwned && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/50">
                      <Lock className="w-8 h-8 text-white" />
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                   <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-3 py-1 rounded-full text-xs font-bold">
                     {course.sections.length} bo'lim
                   </span>
                </div>
              </div>

              {/* Matn va Tugma qismi */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-violet-600 transition-colors">
                    {course.title}
                  </h3>
                  {!isOwned && (
                     <span className="bg-violet-100 text-violet-700 text-xs px-2 py-1 rounded-lg font-bold">
                       {course.price.toLocaleString()} so'm
                     </span>
                  )}
                </div>
                
                <p className="text-gray-500 text-sm line-clamp-2 mb-6">
                  {course.description}
                </p>
                
                {isOwned ? (
                  // SOTIB OLINGAN BO'LSA -> DARSNI BOSHLASH
                  <Link
                    to={`/course/${course.id}`}
                    className="inline-flex items-center justify-center w-full py-4 bg-violet-600 text-white font-bold rounded-2xl hover:bg-violet-700 transition-all gap-2 shadow-lg shadow-violet-200"
                  >
                    <PlayCircle className="w-5 h-5" />
                    Darsni boshlash
                  </Link>
                ) : (
                  // SOTIB OLINMAGAN BO'LSA -> SOTIB OLISH (Landingga o'tadi)
                  <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center justify-center w-full py-4 bg-gray-50 text-gray-900 font-bold rounded-2xl hover:bg-gray-100 transition-all gap-2 border-2 border-transparent hover:border-gray-200"
                  >
                    <ShoppingCart className="w-5 h-5 text-gray-500" />
                    Sotib olish
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;