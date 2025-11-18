import React, { useState, useMemo } from 'react';
import { Plus, Search, Filter, X } from 'lucide-react';
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
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">All Events</h1>
        <button 
          onClick={onCreateClick}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors shadow-sm w-full md:w-auto justify-center"
        >
          <Plus className="w-4 h-4" />
          New Event
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search events by name, location, or description..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 border rounded-lg text-sm font-medium flex items-center gap-2 transition-colors
              ${showFilters ? 'bg-primary-50 border-primary-200 text-primary-700' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100 animate-fade-in">
            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                <select 
                  className="w-full p-2 text-sm border border-gray-200 rounded-lg"
                  value={filters.category}
                  onChange={e => setFilters({...filters, category: e.target.value})}
                >
                    <option value="">All Categories</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Price Range</label>
                <div className="flex gap-2">
                    <input 
                        type="number" 
                        placeholder="Min" 
                        className="w-full p-2 text-sm border border-gray-200 rounded-lg"
                        value={filters.minPrice}
                        onChange={e => setFilters({...filters, minPrice: e.target.value})}
                    />
                    <input 
                        type="number" 
                        placeholder="Max" 
                        className="w-full p-2 text-sm border border-gray-200 rounded-lg"
                        value={filters.maxPrice}
                        onChange={e => setFilters({...filters, maxPrice: e.target.value})}
                    />
                </div>
            </div>
            <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
                <input 
                    type="date" 
                    className="w-full p-2 text-sm border border-gray-200 rounded-lg"
                    value={filters.startDate}
                    onChange={e => setFilters({...filters, startDate: e.target.value})}
                />
            </div>
            <div className="relative">
                <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
                <input 
                    type="date" 
                    className="w-full p-2 text-sm border border-gray-200 rounded-lg"
                    value={filters.endDate}
                    onChange={e => setFilters({...filters, endDate: e.target.value})}
                />
                {(filters.category || filters.minPrice || filters.maxPrice || filters.startDate || filters.endDate) && (
                    <button 
                        onClick={clearFilters}
                        className="absolute -bottom-8 right-0 text-xs text-red-600 hover:underline flex items-center gap-1"
                    >
                        <X className="w-3 h-3" /> Clear Filters
                    </button>
                )}
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <EventCard key={event.id} event={event} onClick={onEventClick} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No events found</h3>
            <p className="text-gray-500 mt-1">Try adjusting your search or filters</p>
            <button 
                onClick={clearFilters}
                className="mt-4 text-primary-600 font-medium hover:underline"
            >
                Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};