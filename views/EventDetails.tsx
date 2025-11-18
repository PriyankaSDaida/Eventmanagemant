import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Users, Share2, CheckCircle } from 'lucide-react';
import { Event, TicketType } from '../types';

interface EventDetailsProps {
  event: Event;
  onBack: () => void;
  onPurchase: (eventId: string, ticketTypeId: string) => void;
}

export const EventDetails: React.FC<EventDetailsProps> = ({ event, onBack, onPurchase }) => {
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const handleBuy = () => {
    if (selectedTicket) {
      setIsPurchasing(true);
      // Simulate API call
      setTimeout(() => {
        onPurchase(event.id, selectedTicket);
        setIsPurchasing(false);
        setPurchaseSuccess(true);
      }, 1000);
    }
  };

  const totalCapacity = event.ticketTypes.reduce((acc, t) => acc + t.capacity, 0);
  const totalRegistered = event.ticketTypes.reduce((acc, t) => acc + t.sold, 0);

  if (purchaseSuccess) {
    return (
      <div className="max-w-md mx-auto mt-12 text-center p-8 bg-white rounded-xl shadow-lg animate-fade-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
        <p className="text-gray-600 mb-6">You have successfully registered for {event.title}.</p>
        <button 
          onClick={onBack}
          className="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      <button 
        onClick={onBack}
        className="flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Events
      </button>

      <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-md">
        <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full text-white">
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        {event.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md text-xs font-medium border border-white/10">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 shadow-sm">{event.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm md:text-base text-gray-100">
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {event.location}
                        </div>
                    </div>
                </div>
                <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-lg transition-colors text-sm font-medium">
                    <Share2 className="w-4 h-4" />
                    Share
                </button>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About this Event</h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {event.description}
                </p>
            </section>

            <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Agenda</h2>
                <div className="relative border-l-2 border-gray-100 ml-3 space-y-8">
                    {event.agenda.length > 0 ? event.agenda.map((item) => (
                        <div key={item.id} className="relative pl-8">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary-500 border-4 border-white shadow-sm" />
                            <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4 mb-2">
                                <span className="text-sm font-bold text-primary-600 whitespace-nowrap min-w-[80px]">
                                    {item.time}
                                </span>
                                <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
                            </div>
                            {item.description && (
                                <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                            )}
                            {item.speaker && (
                                <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded text-xs text-gray-500 mt-1">
                                    <Users className="w-3 h-3" />
                                    <span>{item.speaker}</span>
                                </div>
                            )}
                        </div>
                    )) : (
                        <p className="text-gray-500 pl-8 italic">Agenda to be announced.</p>
                    )}
                </div>
            </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm sticky top-24">
                <h3 className="font-bold text-gray-900 text-lg mb-4">Select Tickets</h3>
                
                <div className="space-y-3 mb-6">
                  {event.ticketTypes.map(ticket => {
                    const isSoldOut = ticket.sold >= ticket.capacity;
                    return (
                      <div 
                        key={ticket.id}
                        onClick={() => !isSoldOut && setSelectedTicket(ticket.id)}
                        className={`p-3 rounded-lg border transition-all cursor-pointer
                          ${selectedTicket === ticket.id 
                            ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500' 
                            : isSoldOut 
                              ? 'border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed' 
                              : 'border-gray-200 hover:border-primary-300'
                          }
                        `}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-gray-900">{ticket.name}</span>
                          <span className="font-bold text-gray-900">
                            {ticket.price === 0 ? 'Free' : `$${ticket.price}`}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{isSoldOut ? 'Sold Out' : `${ticket.capacity - ticket.sold} left`}</span>
                          {selectedTicket === ticket.id && <CheckCircle className="w-4 h-4 text-primary-600" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-4 mb-6 border-t border-gray-100 pt-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Capacity</span>
                        <span className="font-medium">{totalCapacity}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Total Registered</span>
                        <span className="font-medium">{totalRegistered}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                        <div 
                            className="bg-primary-500 h-2 rounded-full transition-all duration-500" 
                            style={{ width: totalCapacity > 0 ? `${(totalRegistered / totalCapacity) * 100}%` : '0%' }}
                        />
                    </div>
                </div>

                <button 
                  onClick={handleBuy}
                  disabled={!selectedTicket || isPurchasing}
                  className="w-full py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white font-semibold rounded-lg shadow-md shadow-primary-200 transition-all flex items-center justify-center gap-2"
                >
                  {isPurchasing ? 'Processing...' : 'Book Ticket'}
                </button>
                
                <p className="text-xs text-center text-gray-500 mt-3">
                    Sales end 1 hour before the event starts.
                </p>
            </div>

            <div className="bg-primary-900 rounded-xl p-6 text-white shadow-lg">
                <h3 className="font-semibold text-lg mb-2">Need Help?</h3>
                <p className="text-primary-200 text-sm mb-4">
                    Contact our support team for any questions about this event.
                </p>
                <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors">
                    Contact Organizer
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};