import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Calendar as CalendarIcon, Plus, Settings, LogOut
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Dashboard } from './views/Dashboard';
import { CreateEvent } from './views/CreateEvent';
import { EventDetails } from './views/EventDetails';
import { EventsList } from './views/EventsList';
import { Auth } from './views/Auth';
import { Home } from './views/Home';
import { Event, ViewState, User } from './types';
import { getStoredEvents, saveEvents } from './services/mockData';
import { authService } from './services/authService';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<ViewState>('HOME');
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Check auth
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      // Stay on HOME if explicitly there, otherwise go dashboard
      if (view !== 'HOME') setView('DASHBOARD');
    }

    // Load initial data
    const loaded = getStoredEvents();
    setEvents(loaded);
  }, []);

  const handleLogin = (user: User) => {
    setUser(user);
    setView('DASHBOARD');
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setView('HOME');
  };

  const handleCreateEvent = (newEvent: Event) => {
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
    setView('EVENTS');
  };

  const handleEventClick = (event: Event) => {
    setSelectedEventId(event.id);
    setView('EVENT_DETAILS');
  };

  const handlePurchase = (eventId: string, ticketTypeId: string) => {
    if (!user) {
        setView('LOGIN');
        return;
    }
    const updatedEvents = events.map(e => {
      if (e.id === eventId) {
        const updatedTickets = e.ticketTypes.map(t => {
          if (t.id === ticketTypeId) {
            return { ...t, sold: t.sold + 1 };
          }
          return t;
        });
        return { ...e, ticketTypes: updatedTickets };
      }
      return e;
    });
    setEvents(updatedEvents);
    saveEvents(updatedEvents);
  };

  if (view === 'LOGIN' || view === 'SIGNUP') {
    return (
      <Auth 
        mode={view} 
        onSuccess={handleLogin} 
        onToggleMode={() => setView(view === 'LOGIN' ? 'SIGNUP' : 'LOGIN')} 
      />
    );
  }

  const renderContent = () => {
    switch (view) {
      case 'HOME':
        return (
            <Home 
                featuredEvents={events} 
                onNavigateEvents={() => setView('EVENTS')}
                onEventClick={handleEventClick}
            />
        );
      case 'DASHBOARD':
        return <Dashboard events={events.map(e => ({
          ...e, 
          registeredCount: e.ticketTypes.reduce((acc, t) => acc + t.sold, 0),
          price: Math.min(...e.ticketTypes.map(t => t.price)) || 0
        }))} />;
      case 'CREATE_EVENT':
        return <CreateEvent onSave={handleCreateEvent} onCancel={() => setView('EVENTS')} />;
      case 'EVENT_DETAILS':
        const event = events.find(e => e.id === selectedEventId);
        return event 
          ? <EventDetails event={event} onBack={() => setView('EVENTS')} onPurchase={handlePurchase} /> 
          : <div>Event not found</div>;
      case 'EVENTS':
      default:
        return (
          <EventsList 
            events={events} 
            onEventClick={handleEventClick} 
            onCreateClick={() => user ? setView('CREATE_EVENT') : setView('LOGIN')} 
          />
        );
    }
  };

  // Only show sidebar for admin-style views when logged in
  const showSidebar = user && (view === 'DASHBOARD' || view === 'CREATE_EVENT');

  const NavItem = ({ viewName, icon: Icon, label }: { viewName: ViewState, icon: any, label: string }) => (
    <button
      onClick={() => setView(viewName)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
        ${view === viewName 
          ? 'bg-primary-50 text-primary-700' 
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Layout with optional sidebar */}
      <div className="flex flex-1">
        {/* Sidebar - Only visible when logged in and in Dashboard/Management views */}
        {showSidebar && (
            <aside className={`
                fixed inset-y-0 left-0 z-20 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
                md:translate-x-0 md:static
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mr-3">
                        <CalendarIcon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900 font-heading">EventHorizon</span>
                </div>

                <div className="p-4 space-y-1 flex flex-col h-[calc(100vh-4rem)]">
                    <div className="space-y-1">
                        <NavItem viewName="DASHBOARD" icon={LayoutDashboard} label="Dashboard" />
                        <NavItem viewName="EVENTS" icon={CalendarIcon} label="All Events" />
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-100 space-y-1">
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                            <Settings className="w-5 h-5" />
                            Settings
                        </button>
                    </div>
                </div>
            </aside>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <Navbar 
                user={user} 
                onNavigate={setView} 
                onLogout={handleLogout} 
                currentView={view}
            />
            
            <main className={`flex-1 overflow-y-auto ${showSidebar ? 'p-4 md:p-8' : ''} ${view === 'HOME' ? 'p-0' : 'p-4 md:p-8'}`}>
                {renderContent()}
            </main>
            
            {/* Footer only on Home and Event Listing for public */}
            {!showSidebar && <Footer />}
        </div>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && showSidebar && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default App;