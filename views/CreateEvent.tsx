import React, { useState } from 'react';
import { Sparkles, Calendar, MapPin, DollarSign, Image as ImageIcon, X, ChevronRight, CheckCircle } from 'lucide-react';
import { Event, EventStatus, TicketType } from '../types';
import { generateEventMetadata } from '../services/geminiService';

interface CreateEventProps {
  onSave: (event: Event) => void;
  onCancel: () => void;
}

export const CreateEvent: React.FC<CreateEventProps> = ({ onSave, onCancel }) => {
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const [formData, setFormData] = useState<Partial<Event>>({
    title: '',
    date: '',
    location: '',
    description: '',
    shortDescription: '',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80',
    status: EventStatus.DRAFT,
    tags: [],
    agenda: [],
    ticketTypes: []
  });

  const [tickets, setTickets] = useState<TicketType[]>([
    { id: '1', name: 'General Admission', price: 0, capacity: 100, sold: 0 }
  ]);

  const updateField = (field: keyof Event, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateAI = async () => {
    if (!formData.title || !formData.description) return;

    setIsGenerating(true);
    try {
      const metadata = await generateEventMetadata(
        formData.title,
        formData.description,
        formData.date || '',
        formData.location || ''
      );

      setFormData(prev => ({
        ...prev,
        description: metadata.description,
        shortDescription: metadata.description.slice(0, 150) + '...',
        tags: metadata.tags,
        agenda: metadata.agenda
      }));
    } catch (error) {
      console.error("AI Generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: Event = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData as Event,
      ticketTypes: tickets,
      organizerId: '1',
      registeredCount: 0
    };
    onSave(newEvent);
  };

  const addTicket = () => {
    setTickets([...tickets, { id: Math.random().toString(), name: 'VIP', price: 50, capacity: 50, sold: 0 }]);
  };

  const updateTicket = (id: string, field: keyof TicketType, value: any) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const removeTicket = (id: string) => {
    if (tickets.length > 1) {
      setTickets(tickets.filter(t => t.id !== id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-heading text-slate-900">Host an Event</h1>
          <p className="text-slate-500">Create something extraordinary.</p>
        </div>

        {/* Steps Indicator */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
          {[1, 2, 3].map(i => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${step >= i ? 'bg-indigo-600 scale-125 shadow-lg shadow-indigo-500/30' : 'bg-slate-200'}`}
            />
          ))}
          <span className="ml-2 text-xs font-medium text-slate-500">Step {step} of 3</span>
        </div>
      </div>

      <div className="glass rounded-2xl p-8 border border-slate-200">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Basic Details */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary-600" /> Event Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-600 mb-2">Event Title</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                    placeholder="e.g., Future Tech Summit 2025"
                    value={formData.title}
                    onChange={e => updateField('title', e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') e.preventDefault();
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">Date & Time</label>
                  <input
                    type="datetime-local"
                    required
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                    value={formData.date}
                    onChange={e => updateField('date', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      required
                      className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                      placeholder="Venue or Online Link"
                      value={formData.location}
                      onChange={e => updateField('location', e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-600 mb-2">Cover Image URL</label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="url"
                      className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                      placeholder="https://..."
                      value={formData.imageUrl}
                      onChange={e => updateField('imageUrl', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Content & AI */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-secondary-500" /> Content & AI Magic
                </h2>
                <button
                  type="button"
                  onClick={handleGenerateAI}
                  disabled={isGenerating || !formData.title}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-bold shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 disabled:opacity-50 transition-all"
                >
                  {isGenerating ? <Sparkles className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  {isGenerating ? 'Designing...' : 'Auto-Generate with AI'}
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Description</label>
                <textarea
                  rows={6}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-primary-500 outline-none transition-all resize-none"
                  placeholder="Tell us about the event..."
                  value={formData.description}
                  onChange={e => updateField('description', e.target.value)}
                />
                <p className="text-xs text-slate-500 mt-2">Tip: Use the AI button to expand a brief summary into a full description with agenda and tags.</p>
              </div>

              {formData.tags && formData.tags.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-2">Tags (AI Generated)</label>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium border border-primary-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Tickets & Review */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-teal-500" /> Tickets & Review
              </h2>

              <div className="space-y-4">
                {tickets.map((ticket, index) => (
                  <div key={ticket.id} className="glass p-4 rounded-xl border border-slate-200 flex flex-wrap gap-4 items-end bg-white/50">
                    <div className="flex-1 min-w-[200px]">
                      <label className="block text-xs text-slate-500 mb-1">Ticket Name</label>
                      <input
                        type="text"
                        value={ticket.name}
                        onChange={e => updateTicket(ticket.id, 'name', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-sm"
                      />
                    </div>
                    <div className="w-24">
                      <label className="block text-xs text-slate-500 mb-1">Price ($)</label>
                      <input
                        type="number"
                        value={ticket.price}
                        onChange={e => updateTicket(ticket.id, 'price', parseFloat(e.target.value))}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-sm"
                      />
                    </div>
                    <div className="w-24">
                      <label className="block text-xs text-slate-500 mb-1">Capacity</label>
                      <input
                        type="number"
                        value={ticket.capacity}
                        onChange={e => updateTicket(ticket.id, 'capacity', parseInt(e.target.value))}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 text-sm"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeTicket(ticket.id)}
                      className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addTicket}
                  className="w-full py-3 border border-dashed border-slate-300 rounded-xl text-slate-500 hover:text-primary-600 hover:border-primary-400 transition-all flex items-center justify-center gap-2"
                >
                  <DollarSign className="w-4 h-4" /> Add Ticket Type
                </button>
              </div>
            </div>
          )}

          {/* Navigation Actions */}
          <div className="flex justify-between pt-8 mt-8 border-t border-slate-200">
            <button
              type="button"
              onClick={step === 1 ? onCancel : () => setStep(s => s - 1)}
              className="px-6 py-3 rounded-xl text-slate-500 hover:text-slate-800 font-medium transition-colors"
            >
              {step === 1 ? 'Cancel' : 'Back'}
            </button>

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(s => s + 1)}
                className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg hover:shadow-slate-900/20"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary-500/25 transition-all"
              >
                <CheckCircle className="w-4 h-4" /> Publish Event
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};