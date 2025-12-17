import React from 'react';
import { Calendar, MapPin, Tag } from 'lucide-react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onClick?: (event: Event) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED': return 'bg-teal-100 text-teal-700 border-teal-200';
      case 'DRAFT': return 'bg-slate-100 text-slate-600 border-slate-200';
      case 'COMPLETED': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div
      onClick={() => onClick?.(event)}
      className="group glass-card rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 hover:shadow-xl transition-all duration-300 relative border border-transparent hover:border-indigo-200/60"
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent z-10" />
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(event.status)} backdrop-blur-md shadow-sm`}>
          {event.status}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-sm font-medium text-primary-600 mb-2">
          <Calendar className="w-4 h-4" />
          {new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors">
          {event.title}
        </h3>

        <p className="text-slate-500 text-sm mb-4 line-clamp-2">
          {event.shortDescription || event.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-1.5 text-slate-500 text-sm">
            <MapPin className="w-4 h-4" />
            <span className="truncate max-w-[120px]">{event.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">
              {event.ticketTypes[0]?.price > 0 ? `$${event.ticketTypes[0].price}` : 'Free'}
            </span>
          </div>
        </div>

        {event.tags && event.tags.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
            {event.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="px-2 py-1 bg-slate-50 text-slate-600 rounded text-xs border border-slate-200">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};