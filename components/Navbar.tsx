import React from 'react';
import { Bell, Search, User, Menu, Calendar, LogOut, LayoutDashboard } from 'lucide-react';
import { User as UserType, ViewState } from '../types';

interface NavbarProps {
  user: UserType | null;
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
  currentView: ViewState;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onNavigate, onLogout, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left: Logo & Public Nav */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => onNavigate('HOME')}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center group-hover:bg-primary-700 transition-colors">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-heading text-gray-900">EventHorizon</span>
            </button>
            
            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => onNavigate('EVENTS')}
                className={`text-sm font-medium transition-colors ${currentView === 'EVENTS' ? 'text-primary-600' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Browse Events
              </button>
              {!user && (
                 <a href="#" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">About</a>
              )}
            </div>
          </div>

          {/* Center: Search (only if logged in or on specific pages) */}
          {user && (
            <div className="hidden md:flex items-center flex-1 max-w-md px-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Quick search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all"
                />
              </div>
            </div>
          )}

          {/* Right: User Actions / Auth Buttons */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                 <button 
                    onClick={() => onNavigate('DASHBOARD')}
                    className="hidden md:flex p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Dashboard"
                 >
                   <LayoutDashboard className="w-5 h-5" />
                 </button>
                 
                 <div className="h-6 w-px bg-gray-200 hidden md:block"></div>

                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
                
                <div className="flex items-center gap-3 pl-2">
                  <div className="text-right hidden md:block">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role.toLowerCase()}</p>
                  </div>
                  <div className="relative group">
                    <button className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold border-2 border-transparent hover:border-primary-200 transition-all">
                        <User className="w-4 h-4" />
                    </button>
                    {/* Dropdown */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 hidden group-hover:block">
                        <button onClick={() => onNavigate('DASHBOARD')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Dashboard</button>
                        <button onClick={() => onNavigate('CREATE_EVENT')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Create Event</button>
                        <div className="border-t border-gray-100 my-1"></div>
                        <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                            <LogOut className="w-3 h-3" /> Sign Out
                        </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => onNavigate('LOGIN')}
                  className="hidden md:block px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => onNavigate('SIGNUP')}
                  className="px-5 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-full shadow-sm shadow-primary-200 transition-all"
                >
                  Get Started
                </button>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 p-4 space-y-3 bg-white">
              <button onClick={() => { onNavigate('HOME'); setIsMenuOpen(false); }} className="block w-full text-left py-2 font-medium text-gray-600">Home</button>
              <button onClick={() => { onNavigate('EVENTS'); setIsMenuOpen(false); }} className="block w-full text-left py-2 font-medium text-gray-600">Events</button>
              {user ? (
                  <>
                    <button onClick={() => { onNavigate('DASHBOARD'); setIsMenuOpen(false); }} className="block w-full text-left py-2 font-medium text-gray-600">Dashboard</button>
                    <button onClick={() => { onLogout(); setIsMenuOpen(false); }} className="block w-full text-left py-2 font-medium text-red-600">Sign Out</button>
                  </>
              ) : (
                  <button onClick={() => { onNavigate('LOGIN'); setIsMenuOpen(false); }} className="block w-full text-left py-2 font-medium text-primary-600">Sign In</button>
              )}
          </div>
      )}
    </nav>
  );
};