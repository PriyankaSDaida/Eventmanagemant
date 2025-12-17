import React, { useState, useMemo } from 'react';
import { Plus, Search, Filter, X, SlidersHorizontal, Calendar, ArrowUpRight } from 'lucide-react';
import { Event } from '../types';
import { EventCard } from '../components/EventCard';

interface EventsListProps {
  events: Event[];
  onEventClick: (event: Event) => void;
  onCreateClick: () => void;
}

export const EventsList: React.FC<EventsListProps> = ({ events, onEventClick, onCreateClick }) => {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    startDate: '',
    endDate: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => {
    const tags = new Set<string>();
    events.forEach(e => e.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // Search Text
      const searchMatch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase());

      if (!searchMatch) return false;

      // Category Filter
      if (filters.category && !event.tags.includes(filters.category)) return false;

      // Date Range
      if (filters.startDate && new Date(event.date) < new Date(filters.startDate)) return false;
      if (filters.endDate && new Date(event.date) > new Date(filters.endDate)) return false;

      // Price Range
      const prices = event.ticketTypes.map(t => t.price);
      const minEventPrice = prices.length ? Math.min(...prices) : 0;
      const maxEventPrice = prices.length ? Math.max(...prices) : 0;

      if (filters.minPrice && maxEventPrice < Number(filters.minPrice)) return false;
      if (filters.maxPrice && minEventPrice > Number(filters.maxPrice)) return false;

      return true;
    });
  }, [events, search, filters]);

  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      startDate: '',
      endDate: ''
    });
    setSearch('');
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold font-heading text-slate-900 mb-2">Explore Events</h1>
          <p className="text-slate-500">Discover trending events, workshops, and conferences happening around you.</p>
        </div>

        <button
          onClick={onCreateClick}
          className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold transition-all shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40 hover:-translate-y-1 w-full md:w-auto justify-center group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Host Event
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="glass p-6 rounded-3xl border-white/60 shadow-xl shadow-slate-200/40">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-primary-600 transition-colors" />
            <input
              type="text"
              placeholder="Search events by name, location, or description..."
              className="w-full pl-12 pr-4 py-3 bg-white/50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 placeholder-slate-400 transition-all font-medium"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-6 py-3 border rounded-xl font-bold flex items-center gap-2 transition-all
              ${showFilters
                ? 'bg-primary-50 border-primary-200 text-primary-700 shadow-inner'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'}`}
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="hidden md:inline">Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6 mt-4 border-t border-slate-200/50 animate-fade-in">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Category</label>
              <select
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:ring-2 focus:ring-primary-500/20 outline-none"
                value={filters.category}
                onChange={e => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="">All Categories</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Price Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min $"
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 outline-none"
                  value={filters.minPrice}
                  onChange={e => setFilters({ ...filters, minPrice: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Max $"
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary-500/20 outline-none"
                  value={filters.maxPrice}
                  onChange={e => setFilters({ ...filters, maxPrice: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Start Date</label>
              <input
                type="date"
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 focus:ring-2 focus:ring-primary-500/20 outline-none"
                value={filters.startDate}
                onChange={e => setFilters({ ...filters, startDate: e.target.value })}
              />
            </div>
            <div className="relative space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">End Date</label>
              <input
                type="date"
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 focus:ring-2 focus:ring-primary-500/20 outline-none"
                value={filters.endDate}
                onChange={e => setFilters({ ...filters, endDate: e.target.value })}
              />

              {(filters.category || filters.minPrice || filters.maxPrice || filters.startDate || filters.endDate) && (
                <button
                  onClick={clearFilters}
                  className="absolute top-0 right-0 -mt-7 text-xs font-bold text-red-500 hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded-lg transition-colors flex items-center gap-1"
                >
                  <X className="w-3 h-3" /> Clear
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <EventCard key={event.id} event={event} onClick={onEventClick} />
          ))
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold font-heading text-slate-900 mb-2">No events found</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-8">
              We couldn't find any events matching your current filters. Try adjusting your search criteria or browse all events.
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all shadow-sm"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};