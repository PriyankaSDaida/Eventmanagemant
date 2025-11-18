import React from 'react';
import { Search, Calendar, ArrowRight, Users, Award, Zap, Music, Briefcase, Coffee, Activity } from 'lucide-react';
import { Event } from '../types';
import { EventCard } from '../components/EventCard';

interface HomeProps {
  featuredEvents: Event[];
  onNavigateEvents: () => void;
  onEventClick: (event: Event) => void;
}

export const Home: React.FC<HomeProps> = ({ featuredEvents, onNavigateEvents, onEventClick }) => {
  const categories = [
    { name: 'Technology', icon: Zap, color: 'bg-blue-100 text-blue-600' },
    { name: 'Music', icon: Music, color: 'bg-pink-100 text-pink-600' },
    { name: 'Business', icon: Briefcase, color: 'bg-purple-100 text-purple-600' },
    { name: 'Lifestyle', icon: Coffee, color: 'bg-orange-100 text-orange-600' },
    { name: 'Health', icon: Activity, color: 'bg-green-100 text-green-600' },
  ];

  const stats = [
    { value: '10K+', label: 'Events Hosted', icon: Calendar },
    { value: '2M+', label: 'Happy Attendees', icon: Users },
    { value: '99%', label: 'Satisfaction Rate', icon: Award },
  ];

  const testimonials = [
    {
      text: "EventHorizon completely transformed how we manage our tech conferences. The AI features are a game changer!",
      author: "Sarah Johnson",
      role: "Event Director, TechFlow",
      avatar: "https://picsum.photos/seed/sarah/100/100"
    },
    {
      text: "The booking process is seamless. I love how easy it is to find and register for events in my city.",
      author: "Michael Chen",
      role: "Attendee",
      avatar: "https://picsum.photos/seed/michael/100/100"
    },
    {
      text: "As a venue owner, this platform gives me the visibility and tools I need to fill my calendar.",
      author: "Jessica Williams",
      role: "Venue Manager",
      avatar: "https://picsum.photos/seed/jessica/100/100"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-secondary-900 mix-blend-multiply" />
            <img 
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
                alt="Event Crowd" 
                className="w-full h-full object-cover"
            />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-32 sm:pb-32">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-6xl font-bold font-heading text-white tracking-tight mb-6">
              Experience Events <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">Like Never Before</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10">
              Discover, book, and organize unforgettable experiences. From intimate workshops to massive global conferences.
            </p>
            
            <div className="max-w-2xl mx-auto bg-white p-2 rounded-full shadow-xl flex items-center">
              <div className="pl-4 flex items-center flex-1">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input 
                  type="text" 
                  placeholder="Search for events, concerts, workshops..." 
                  className="w-full py-3 outline-none text-gray-700 placeholder-gray-400"
                />
              </div>
              <button 
                onClick={onNavigateEvents}
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-full font-medium transition-colors flex items-center gap-2"
              >
                Explore
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="mt-8 flex justify-center gap-8 text-gray-400 text-sm">
              <span>Popular:</span>
              <span className="hover:text-white cursor-pointer underline decoration-dotted">Music Festivals</span>
              <span className="hover:text-white cursor-pointer underline decoration-dotted">Tech Conferences</span>
              <span className="hover:text-white cursor-pointer underline decoration-dotted">Yoga Workshops</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Explore by Category</h2>
            <p className="text-gray-600">Find the events that match your passion</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <div key={cat.name} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer group border border-gray-100 text-center">
                <div className={`w-14 h-14 rounded-full ${cat.color} mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <cat.icon className="w-7 h-7" />
                </div>
                <h3 className="font-semibold text-gray-900">{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Featured Events</h2>
              <p className="text-gray-600">Don't miss out on these trending experiences</p>
            </div>
            <button 
              onClick={onNavigateEvents}
              className="hidden md:flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              View all events <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.slice(0, 3).map(event => (
              <EventCard key={event.id} event={event} onClick={onEventClick} />
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
             <button 
                onClick={onNavigateEvents}
                className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
             >
              View all events <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
             {stats.map((stat, idx) => (
               <div key={idx} className="space-y-2">
                 <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                    <stat.icon className="w-8 h-8 text-secondary-400" />
                 </div>
                 <div className="text-4xl font-bold font-heading">{stat.value}</div>
                 <div className="text-primary-200">{stat.label}</div>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">What People Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Hear from the community of organizers and attendees who trust EventHorizon.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-6">
                  <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-gray-900">{t.author}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">{t.role}</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
           <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-3xl p-10 md:p-16 text-white shadow-2xl relative overflow-hidden">
             <div className="relative z-10">
                <h2 className="text-3xl font-bold font-heading mb-4">Never Miss an Event</h2>
                <p className="text-primary-100 mb-8 max-w-xl mx-auto">Subscribe to our newsletter to get the latest updates on upcoming events, special offers, and exclusive deals.</p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 px-6 py-3 rounded-full text-gray-900 outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button className="px-8 py-3 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-colors">
                    Subscribe
                  </button>
                </div>
             </div>
             {/* Decorative circles */}
             <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
             <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
           </div>
        </div>
      </section>
    </div>
  );
};