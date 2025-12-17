import React from 'react';
import { Search, Calendar, ArrowRight, Users, Award, Zap, Music, Briefcase, Coffee, Activity, Sparkles } from 'lucide-react';
import { Event } from '../types';
import { EventCard } from '../components/EventCard';

interface HomeProps {
  featuredEvents: Event[];
  onNavigateEvents: () => void;
  onEventClick: (event: Event) => void;
}

export const Home: React.FC<HomeProps> = ({ featuredEvents, onNavigateEvents, onEventClick }) => {
  const categories = [
    { name: 'Tech & AI', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-100' },
    { name: 'Music & Arts', icon: Music, color: 'text-pink-500', bg: 'bg-pink-100' },
    { name: 'Business', icon: Briefcase, color: 'text-blue-500', bg: 'bg-blue-100' },
    { name: 'Social', icon: Coffee, color: 'text-emerald-500', bg: 'bg-emerald-100' },
  ];

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 max-w-7xl mx-auto flex flex-col items-center text-center animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border-primary-200">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
          </span>
          <span className="text-primary-700 font-medium text-sm">The Future of Event Management</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 tracking-tight text-slate-900 leading-tight">
          Craft <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">Unforgettable</span><br />
          Experiences
        </h1>

        <p className="text-slate-600 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          Platform-agnostic event orchestration for the modern era. Seamlessly plan, manage, and analyze your events with our AI-powered suite.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-4 rounded-xl glass text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all shadow-sm"
              placeholder="Find your next event..."
            />
          </div>
          <button
            onClick={onNavigateEvents}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
          >
            Explore <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 w-full max-w-4xl">
          {[
            { label: 'Active Users', value: '10k+' },
            { label: 'Events Hosted', value: '2.5k' },
            { label: 'Countries', value: '120+' },
            { label: 'Satisfaction', value: '4.9/5' }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</span>
              <span className="text-slate-500 text-sm font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 py-10 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
          <Activity className="w-6 h-6 text-primary-600" /> Trending Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div key={cat.name} className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer group hover:bg-white">
              <div className={`p-4 rounded-full ${cat.bg} group-hover:scale-110 transition-transform duration-300`}>
                <cat.icon className={`h-8 w-8 ${cat.color}`} />
              </div>
              <h3 className="font-semibold text-slate-800">{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Events */}
      <section className="px-6 py-10 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Events</h2>
            <p className="text-slate-500">Curated experiences just for you.</p>
          </div>
          <button onClick={onNavigateEvents} className="text-primary-600 font-semibold hover:text-primary-700 transition-colors flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {featuredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.slice(0, 3).map((event) => (
              <div key={event.id} onClick={() => onEventClick(event)}>
                <EventCard event={event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass rounded-3xl border-dashed border-2 border-slate-300">
            <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-700">No events found</h3>
            <p className="text-slate-500">Check back later for upcoming experiences.</p>
          </div>
        )}
      </section>

      {/* Newsletter / CTA */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="glass rounded-3xl p-12 relative overflow-hidden text-center bg-gradient-to-br from-primary-600 to-secondary-600 text-white shadow-2xl shadow-primary-500/30">
          <div className="relative z-10 max-w-2xl mx-auto">
            <Sparkles className="w-12 h-12 mx-auto mb-6 text-yellow-300 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Ready to host your next masterpiece?</h2>
            <p className="text-white/90 text-lg mb-8">Join thousands of organizers creating unforgettable moments with EventHorizon's AI-powered tools.</p>
            <button className="px-8 py-4 bg-white text-primary-600 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              Get Started for Free
            </button>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
      </section>
    </div>
  );
};