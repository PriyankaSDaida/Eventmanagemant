import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Event, EventStatus } from '../types';

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const getStatusColor = (status: EventStatus) => {
    switch (status) {
      case EventStatus.PUBLISHED: return 'bg-green-100 text-green-800';
      case EventStatus.DRAFT: return 'bg-gray-100 text-gray-800';
      case EventStatus.CANCELLED: return 'bg-red-100 text-red-800';
      case EventStatus.COMPLETED: return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const prices = event.ticketTypes.map(t => t.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceDisplay = prices.length === 0 
    ? 'No Tickets' 
    : minPrice === 0 
        ? 'Free' 
        : minPrice === maxPrice 
            ? `$${minPrice}` 
            : `$${minPrice} - $${maxPrice}`;

  const totalCapacity = event.ticketTypes.reduce((acc, t) => acc + t.capacity, 0);
  const totalRegistered = event.ticketTypes.reduce((acc, t) => acc + t.sold, 0);

  return (
    <div 
      onClick={() => onClick(event)}
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden flex flex-col"
    >
      <div className="h-32 w-full relative">
        <img 
          src={event.imageUrl} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
            {event.status}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-1">{event.title}</h3>
        
        <div className="space-y-2 mb-4 flex-1">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(event.date).toLocaleDateString()}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-2" />
            {totalRegistered} / {totalCapacity} registered
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <span className="font-semibold text-primary-700">
            {priceDisplay}
          </span>
          <div className="flex gap-1">
            {event.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};