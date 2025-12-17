import React, { useState } from 'react';
import { Menu, X, Rocket, Home, Calendar, PlusCircle, LayoutDashboard, LogOut, User } from 'lucide-react';
import { User as UserType } from '../types';

interface NavbarProps {
  user: UserType | null;
  onLogout: () => void;
  onNavigate: (view: string) => void;
  currentView: string;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onNavigate, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Helper to determine active state styling
  const getLinkClass = (viewName: string) => {
    const isActive = currentView === viewName;
    return `relative px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 group ${isActive
        ? 'text-primary-600 bg-primary-50 font-semibold border border-primary-100'
        : 'text-slate-500 hover:text-primary-600 hover:bg-slate-50'
      }`;
  };

  const NavLink = ({ view, icon: Icon, label }: any) => (
    <button onClick={() => { onNavigate(view); setIsOpen(false); }} className={getLinkClass(view)}>
      <Icon className={`w-4 h-4 ${currentView === view ? 'text-primary-600' : 'text-slate-400 group-hover:text-primary-500'}`} />
      <span>{label}</span>
      {currentView === view && (
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full mb-1"></span>
      )}
    </button>
  );

  return (
    <nav className="fixed w-full z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto glass rounded-2xl px-6 py-3 flex justify-between items-center shadow-lg shadow-slate-200/50">

        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('HOME')}>
          <div className="bg-gradient-to-br from-primary-600 to-secondary-600 p-2.5 rounded-xl shadow-md cursor-pointer hover:rotate-3 transition-transform">
            <Rocket className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold font-heading text-slate-800 tracking-tight">
            Event<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">Horizon</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink view="HOME" icon={Home} label="Home" />
          <NavLink view="EVENTS" icon={Calendar} label="Browse" />
          {user && (
            <>
              <div className="h-6 w-px bg-slate-200 mx-2"></div>
              <NavLink view="DASHBOARD" icon={LayoutDashboard} label="Dashboard" />
              <NavLink view="CREATE" icon={PlusCircle} label="Host Event" />
            </>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
              <div className="flex flex-col items-end">
                <span className="text-sm font-bold text-slate-800">{user.name}</span>
                <span className="text-xs text-slate-500">{user.email}</span>
              </div>
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary-100 to-secondary-100 border border-white flex items-center justify-center text-primary-700 font-bold shadow-sm">
                {user.name.charAt(0)}
              </div>
              <button
                onClick={onLogout}
                className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('AUTH')}
                className="text-slate-600 hover:text-primary-600 font-medium px-4 py-2 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => onNavigate('AUTH')}
                className="px-5 py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 shadow-lg shadow-slate-200/50 transition-all hover:-translate-y-0.5"
              >
                Get Started
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 glass rounded-2xl p-4 flex flex-col gap-2 animate-fade-in shadow-xl">
          <button onClick={() => { onNavigate('HOME'); setIsOpen(false); }} className="p-3 hover:bg-slate-50 rounded-xl text-left font-medium text-slate-700">Home</button>
          <button onClick={() => { onNavigate('EVENTS'); setIsOpen(false); }} className="p-3 hover:bg-slate-50 rounded-xl text-left font-medium text-slate-700">Browse Events</button>
          {user && (
            <>
              <button onClick={() => { onNavigate('DASHBOARD'); setIsOpen(false); }} className="p-3 hover:bg-slate-50 rounded-xl text-left font-medium text-slate-700">Dashboard</button>
              <button onClick={() => { onNavigate('CREATE'); setIsOpen(false); }} className="p-3 hover:bg-slate-50 rounded-xl text-left font-medium text-slate-700">Host Event</button>
            </>
          )}
          <div className="h-px bg-slate-200 my-2"></div>
          {user ? (
            <button onClick={() => { onLogout(); setIsOpen(false); }} className="p-3 hover:bg-red-50 text-red-600 rounded-xl text-left font-medium flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          ) : (
            <button onClick={() => { onNavigate('AUTH'); setIsOpen(false); }} className="p-3 bg-primary-600 text-white rounded-xl text-center font-bold shadow-lg">
              Sign In
            </button>
          )}
        </div>
      )}
    </nav>
  );
};