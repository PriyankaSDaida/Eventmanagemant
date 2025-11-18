import React, { useState } from 'react';
import { Sparkles, Calendar, MapPin, Loader2, Save, X, Plus, Trash2 } from 'lucide-react';
import { CreateEventFormData, Event, EventStatus, AgendaItem, TicketType } from '../types';
import { generateEventMetadata } from '../services/geminiService';

interface CreateEventProps {
  onSave: (event: Event) => void;
  onCancel: () => void;
}

export const CreateEvent: React.FC<CreateEventProps> = ({ onSave, onCancel }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [formData, setFormData] = useState<CreateEventFormData>({
    title: '',
    date: '',
    location: '',
    notes: ''
  });
  
  const [ticketTypes, setTicketTypes] = useState<Omit<TicketType, 'id' | 'sold'>[]>([
    { name: 'General Admission', price: 0, capacity: 100 }
  ]);

  const [generatedContent, setGeneratedContent] = useState<{
    description: string;
    tags: string[];
    agenda: any[];
  } | null>(null);

  const handleGenerateAI = async () => {
    if (!formData.title || !formData.date) {
      alert("Please enter at least a title and date to generate content.");
      return;
    }

    setIsGenerating(true);
    try {
      const content = await generateEventMetadata(
        formData.title,
        formData.notes,
        formData.date,
        formData.location
      );
      setGeneratedContent(content);
    } catch (e) {
      console.error(e);
      alert("Failed to generate content. Please check your API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const addTicketType = () => {
    setTicketTypes([...ticketTypes, { name: '', price: 0, capacity: 50 }]);
  };

  const removeTicketType = (index: number) => {
    if (ticketTypes.length > 1) {
        const newTypes = [...ticketTypes];
        newTypes.splice(index, 1);
        setTicketTypes(newTypes);
    }
  };

  const updateTicketType = (index: number, field: keyof typeof ticketTypes[0], value: string | number) => {
    const newTypes = [...ticketTypes];
    newTypes[index] = { ...newTypes[index], [field]: value };
    setTicketTypes(newTypes);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEvent: Event = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      date: formData.date,
      location: formData.location,
      description: generatedContent?.description || formData.notes,
      imageUrl: `https://picsum.photos/seed/${formData.title.replace(/\s/g, '')}/800/400`,
      ticketTypes: ticketTypes.map((t, i) => ({
        id: `ticket-${Date.now()}-${i}`,
        sold: 0,
        ...t
      })),
      status: EventStatus.PUBLISHED,
      tags: generatedContent?.tags || ['New'],
      agenda: generatedContent?.agenda.map((item, idx) => ({
        id: `agenda-${idx}`,
        ...item
      })) as AgendaItem[] || []
    };

    onSave(newEvent);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Event</h1>
        <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* AI Header with new design system gradient */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                AI-Powered Assistant
              </h2>
              <p className="text-white/90 text-sm mt-1">
                Enter basic details and let Gemini generate your marketing copy and agenda.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Event Title</label>
              <input
                required
                type="text"
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                placeholder="e.g. Annual Tech Summit"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  required
                  type="date"
                  className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                required
                type="text"
                className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                placeholder="City, Venue, or Online Link"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">Ticket Types</label>
                <button type="button" onClick={addTicketType} className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
                    <Plus className="w-3 h-3" /> Add Ticket
                </button>
            </div>
            <div className="space-y-3">
                {ticketTypes.map((ticket, idx) => (
                    <div key={idx} className="flex gap-3 items-start bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <div className="flex-1 space-y-1">
                            <input
                                type="text"
                                placeholder="Ticket Name (e.g. VIP)"
                                className="w-full p-2 border border-gray-300 rounded text-sm"
                                value={ticket.name}
                                onChange={e => updateTicketType(idx, 'name', e.target.value)}
                                required
                            />
                        </div>
                        <div className="w-24 space-y-1">
                            <input
                                type="number"
                                placeholder="Price"
                                min="0"
                                className="w-full p-2 border border-gray-300 rounded text-sm"
                                value={ticket.price}
                                onChange={e => updateTicketType(idx, 'price', parseFloat(e.target.value))}
                                required
                            />
                        </div>
                        <div className="w-24 space-y-1">
                            <input
                                type="number"
                                placeholder="Qty"
                                min="1"
                                className="w-full p-2 border border-gray-300 rounded text-sm"
                                value={ticket.capacity}
                                onChange={e => updateTicketType(idx, 'capacity', parseInt(e.target.value))}
                                required
                            />
                        </div>
                        {ticketTypes.length > 1 && (
                            <button type="button" onClick={() => removeTicketType(idx)} className="p-2 text-gray-400 hover:text-red-500 mt-0.5">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Core details & Notes for AI
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none min-h-[100px]"
              placeholder="Describe the main theme, key speakers, or vibe of the event..."
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={isGenerating || !formData.title}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${isGenerating ? 'bg-gray-100 text-gray-400' : 'bg-primary-50 text-primary-700 hover:bg-primary-100'}
                `}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating content...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Description & Agenda
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Preview Section */}
          {generatedContent && (
            <div className="space-y-6 pt-6 border-t border-gray-100 animate-fade-in">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">AI Generated Description</label>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm text-gray-700 leading-relaxed">
                  {generatedContent.description}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Suggested Agenda</label>
                <div className="space-y-3">
                  {generatedContent.agenda.map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                      <div className="text-sm font-bold text-primary-600 min-w-[80px]">{item.time}</div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Speaker: {item.speaker}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                 <label className="text-sm font-medium text-gray-700">Suggested Tags</label>
                 <div className="flex flex-wrap gap-2">
                    {generatedContent.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-secondary-50 text-secondary-700 rounded text-xs font-medium border border-secondary-100">
                        {tag}
                      </span>
                    ))}
                 </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg shadow-sm shadow-primary-200 transition-all"
            >
              <Save className="w-4 h-4" />
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};