
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, LogOut, User as UserIcon, LayoutDashboard, Settings } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">O'</span>
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">O'quv Platformasi</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className="text-gray-600 hover:text-violet-600 transition-colors flex items-center gap-1 text-sm font-medium"
                  >
                    <Settings className="w-4 h-4" />
                    Admin
                  </Link>
                )}
                <Link 
                  to="/dashboard" 
                  className="text-gray-600 hover:text-violet-600 transition-colors flex items-center gap-1 text-sm font-medium"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Kurslarim
                </Link>
                <div className="h-6 w-px bg-gray-200"></div>
                <div className="flex items-center gap-2">
                   <div className="hidden sm:block text-right">
                     <p className="text-xs font-semibold text-gray-900 leading-none">{user.fullName}</p>
                     <p className="text-[10px] text-gray-500 uppercase tracking-wider">{user.role}</p>
                   </div>
                   <button 
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-violet-600 text-white hover:bg-violet-700 transition-all shadow-sm shadow-violet-200"
              >
                <LogIn className="w-4 h-4" />
                Kirish
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
