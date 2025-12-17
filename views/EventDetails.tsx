import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Users, Share2, CheckCircle, Clock } from 'lucide-react';
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
      <div className="max-w-md mx-auto mt-12 text-center p-8 glass rounded-2xl animate-fade-in border-t-4 border-teal-500">
        <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <CheckCircle className="w-10 h-10 text-teal-600" />
        </div>
        <h2 className="text-3xl font-bold font-heading text-slate-900 mb-2">You're In!</h2>
        <p className="text-slate-600 mb-8">Registration confirmed for <span className="font-semibold text-primary-600">{event.title}</span>.</p>
        <button
          onClick={onBack}
          className="w-full py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
        >
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-20">
      <button
        onClick={onBack}
        className="group flex items-center text-sm font-medium text-slate-500 hover:text-primary-600 transition-colors"
      >
        <div className="p-1 rounded-full bg-white group-hover:bg-primary-50 mr-2 transition-colors border border-slate-200 group-hover:border-primary-200">
          <ArrowLeft className="w-4 h-4" />
        </div>
        Back to Events
      </button>

      <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50">
        <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full text-white">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                {event.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold border border-white/20 uppercase tracking-wide">
                    {tag}
                  </span>
                ))}
                <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wide
                            ${event.status === 'PUBLISHED' ? 'bg-teal-500/20 border-teal-400 text-teal-200' : 'bg-slate-500/30 border-slate-400 text-slate-200'}`}>
                  {event.status}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-white leading-tight">{event.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-slate-200">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                    <Calendar className="w-5 h-5 text-primary-300" />
                  </div>
                  <span className="font-medium">
                    {new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                    <MapPin className="w-5 h-5 text-secondary-300" />
                  </div>
                  <span className="font-medium">{event.location}</span>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl transition-all hover:-translate-y-1 border border-white/20 font-medium">
              <Share2 className="w-4 h-4" />
              Share Event
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <section className="glass p-8 rounded-3xl border-white/60">
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-6 flex items-center gap-3">
              About this Event
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-lg">
                {event.description}
              </p>
            </div>
          </section>

          <section className="glass p-8 rounded-3xl border-white/60">
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-8">Event Agenda</h2>
            <div className="relative border-l-2 border-primary-100 ml-3 space-y-10 pb-2">
              {event.agenda.length > 0 ? event.agenda.map((item, index) => (
                <div key={item.id} className="relative pl-8 group">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-primary-500 shadow-sm group-hover:scale-125 transition-transform" />
                  <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 mb-3">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-primary-50 text-primary-700 text-sm font-bold border border-primary-100 whitespace-nowrap min-w-[80px]">
                      {item.time}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{item.title}</h3>
                      {item.speaker && (
                        <div className="inline-flex items-center gap-1.5 mt-1 text-sm font-medium text-slate-500">
                          <Users className="w-4 h-4 text-secondary-500" />
                          <span>{item.speaker}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {item.description && (
                    <p className="text-slate-600 bg-slate-50/50 p-4 rounded-xl border border-slate-100/50 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              )) : (
                <div className="pl-8 text-slate-500 italic flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Full agenda coming soon.
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="glass p-6 rounded-3xl border-white/60 sticky top-24 shadow-xl shadow-slate-200/40">
            <div className="mb-6">
              <h3 className="font-bold font-heading text-slate-900 text-xl mb-1">Select Tickets</h3>
              <p className="text-sm text-slate-500">Choose your pass to access the event.</p>
            </div>

            <div className="space-y-3 mb-8">
              {event.ticketTypes.map(ticket => {
                const isSoldOut = ticket.sold >= ticket.capacity;
                const isSelected = selectedTicket === ticket.id;
                return (
                  <div
                    key={ticket.id}
                    onClick={() => !isSoldOut && setSelectedTicket(ticket.id)}
                    className={`group p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden
                          ${isSelected
                        ? 'border-primary-500 bg-primary-50/50 ring-1 ring-primary-500/50'
                        : isSoldOut
                          ? 'border-slate-100 bg-slate-50 opacity-60 cursor-not-allowed'
                          : 'border-slate-200 bg-white hover:border-primary-300 hover:shadow-md'
                      }
                        `}
                  >
                    <div className="flex justify-between items-start mb-2 relative z-10">
                      <div>
                        <span className={`block font-bold text-lg ${isSelected ? 'text-primary-900' : 'text-slate-900'}`}>{ticket.name}</span>
                        <span className="text-xs text-slate-500">{isSoldOut ? 'Sold Out' : `${ticket.capacity - ticket.sold} remaining`}</span>
                      </div>
                      <span className={`font-bold text-xl ${isSelected ? 'text-primary-700' : 'text-slate-700'}`}>
                        {ticket.price === 0 ? 'Free' : `$${ticket.price}`}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="absolute top-0 right-0 p-2">
                        <div className="bg-primary-500 rounded-bl-xl rounded-tr-xl p-1">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="space-y-4 mb-8 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Total Capacity</span>
                <span className="font-bold text-slate-900">{totalCapacity}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500 font-medium">Registered</span>
                <span className="font-bold text-primary-600">{totalRegistered}</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: totalCapacity > 0 ? `${(totalRegistered / totalCapacity) * 100}%` : '0%' }}
                />
              </div>
            </div>

            <button
              onClick={handleBuy}
              disabled={!selectedTicket || isPurchasing}
              className="w-full py-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold rounded-xl shadow-lg shadow-slate-900/20 hover:shadow-slate-900/40 transition-all flex items-center justify-center gap-3 transform active:scale-95"
            >
              {isPurchasing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>Book Ticket</>
              )}
            </button>

            <p className="text-xs text-center text-slate-400 mt-4 font-medium">
              Secure checkout powered by Stripe
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary-900 to-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary-500/30 transition-all duration-700"></div>

            <h3 className="font-bold font-heading text-xl mb-2 relative z-10">Have questions?</h3>
            <p className="text-slate-300 text-sm mb-6 relative z-10">
              Contact the event organizer directly for any inquiries.
            </p>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 hover:text-white backdrop-blur-md rounded-xl text-sm font-bold transition-all border border-white/10 relative z-10">
              Contact Organizer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};