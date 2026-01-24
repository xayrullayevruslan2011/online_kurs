
import React, { useState } from 'react';
import { useCourses } from '../contexts/CourseContext';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Layout, List, Video, Trash2, Edit3, ChevronDown, ChevronUp, Save, Users } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const { courses, addCourse, addSection, addLesson } = useCourses();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'courses' | 'students'>('courses');
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', price: 15000, image: 'https://picsum.photos/seed/new/800/600' });
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  if (user?.role !== 'admin') {
    return <div className="p-20 text-center font-bold text-red-500">Kirish taqiqlangan!</div>;
  }

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    addCourse(newCourse);
    setShowAddCourse(false);
    setNewCourse({ title: '', description: '', price: 15000, image: 'https://picsum.photos/seed/new/800/600' });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Paneli</h1>
          <p className="text-gray-500 font-medium">Platforma tarkibini va foydalanuvchilarni boshqaring</p>
        </div>
        <div className="flex p-1 bg-gray-100 rounded-2xl">
           <button 
             onClick={() => setActiveTab('courses')}
             className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'courses' ? 'bg-white text-violet-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
           >
             <Layout className="w-4 h-4 inline-block mr-2" />
             Kurslar
           </button>
           <button 
             onClick={() => setActiveTab('students')}
             className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'students' ? 'bg-white text-violet-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
           >
             <Users className="w-4 h-4 inline-block mr-2" />
             Talabalar
           </button>
        </div>
      </div>

      {activeTab === 'courses' ? (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Mavjud kurslar ({courses.length})</h2>
            <button 
              onClick={() => setShowAddCourse(true)}
              className="px-6 py-3 bg-violet-600 text-white font-bold rounded-2xl hover:bg-violet-700 transition-all flex items-center gap-2 shadow-lg shadow-violet-200"
            >
              <Plus className="w-5 h-5" />
              Yangi kurs qo'shish
            </button>
          </div>

          {showAddCourse && (
            <div className="bg-white p-8 rounded-3xl border border-violet-100 shadow-xl animate-in slide-in-from-top-4 duration-300">
               <h3 className="text-lg font-bold text-gray-900 mb-6">Yangi kurs tafsilotlari</h3>
               <form onSubmit={handleAddCourse} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Sarlavha</label>
                    <input 
                      required
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-violet-600 focus:bg-white rounded-xl outline-none transition-all font-medium"
                      value={newCourse.title}
                      onChange={e => setNewCourse({...newCourse, title: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Narxi (so'm)</label>
                    <input 
                      type="number"
                      required
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-violet-600 focus:bg-white rounded-xl outline-none transition-all font-medium"
                      value={newCourse.price}
                      onChange={e => setNewCourse({...newCourse, price: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Tavsif</label>
                    <textarea 
                      required
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-violet-600 focus:bg-white rounded-xl outline-none transition-all font-medium"
                      value={newCourse.description}
                      onChange={e => setNewCourse({...newCourse, description: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                     <button 
                       type="button"
                       onClick={() => setShowAddCourse(false)}
                       className="px-6 py-3 font-bold text-gray-500 hover:text-gray-700 transition-colors"
                     >
                       Bekor qilish
                     </button>
                     <button 
                       type="submit"
                       className="px-8 py-3 bg-violet-600 text-white font-bold rounded-2xl hover:bg-violet-700 transition-all shadow-lg shadow-violet-200"
                     >
                       Kursni saqlash
                     </button>
                  </div>
               </form>
            </div>
          )}

          <div className="space-y-4">
            {courses.map(course => (
              <div key={course.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:border-violet-200 transition-colors">
                <div className="p-6 flex items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <img src={course.image} className="w-16 h-16 rounded-2xl object-cover shadow-sm" alt="" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">{course.title}</h3>
                      <p className="text-sm text-gray-500 font-medium">{course.price.toLocaleString()} so'm • {course.sections.length} bo'lim</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-violet-600 transition-colors">
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                      className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
                    >
                      {expandedCourse === course.id ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                    </button>
                  </div>
                </div>

                {expandedCourse === course.id && (
                  <div className="px-8 pb-8 border-t border-gray-50 pt-8 animate-in slide-in-from-top-2">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest">Kurs tarkibi</h4>
                      <button 
                        onClick={() => {
                          const title = prompt("Bo'lim nomini kiriting:");
                          if (title) addSection(course.id, title);
                        }}
                        className="text-sm font-bold text-violet-600 hover:bg-violet-50 px-4 py-2 rounded-xl transition-all"
                      >
                        + Bo'lim qo'shish
                      </button>
                    </div>

                    <div className="space-y-6">
                      {course.sections.map((section, sIdx) => (
                        <div key={section.id} className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                           <div className="flex items-center justify-between mb-4">
                             <h5 className="font-bold text-gray-900 flex items-center gap-2">
                               <List className="w-4 h-4 text-violet-600" />
                               {sIdx + 1}. {section.title}
                             </h5>
                             <button 
                               onClick={() => {
                                 const title = prompt("Dars nomini kiriting:");
                                 const videoUrl = prompt("Video URL (Embed):", "https://www.youtube.com/embed/dQw4w9WgXcQ");
                                 const content = prompt("Dars matni:", "Dars mazmuni bu yerda bo'ladi...");
                                 if (title && videoUrl && content) {
                                   addLesson(course.id, section.id, { title, videoUrl, content });
                                 }
                               }}
                               className="text-xs font-bold bg-white text-violet-600 px-3 py-1.5 rounded-lg border border-violet-100 hover:bg-violet-600 hover:text-white transition-all"
                             >
                               + Dars qo'shish
                             </button>
                           </div>
                           <div className="space-y-2 pl-6 border-l-2 border-gray-200">
                             {section.lessons.map(lesson => (
                               <div key={lesson.id} className="flex items-center justify-between py-2 group">
                                 <div className="flex items-center gap-3">
                                   <Video className="w-4 h-4 text-gray-400 group-hover:text-violet-600" />
                                   <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">{lesson.title}</span>
                                 </div>
                                 <button className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                                   <Trash2 className="w-4 h-4" />
                                 </button>
                               </div>
                             ))}
                             {section.lessons.length === 0 && (
                               <p className="text-xs text-gray-400 font-medium italic">Hali darslar yo'q</p>
                             )}
                           </div>
                        </div>
                      ))}
                      {course.sections.length === 0 && (
                        <div className="text-center py-10 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                          <p className="text-gray-500 text-sm font-medium">Bu kursda hali bo'limlar yo'q</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
           <table className="w-full text-left">
             <thead className="bg-gray-50 border-b border-gray-100">
               <tr>
                 <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Talaba</th>
                 <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Email</th>
                 <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Kurslar</th>
                 <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Holat</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-gray-100">
               {[1, 2, 3, 4, 5].map(i => (
                 <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                   <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center text-violet-600 font-bold">
                           T{i}
                         </div>
                         <span className="font-bold text-gray-900">Talaba {i}</span>
                      </div>
                   </td>
                   <td className="px-6 py-5 text-gray-500 font-medium">talaba{i}@mail.uz</td>
                   <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">{Math.floor(Math.random() * 3) + 1} ta kurs</span>
                   </td>
                   <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-wide">Faol</span>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
