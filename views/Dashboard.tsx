import React, { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Calendar, DollarSign, TrendingUp, Users } from 'lucide-react';
import { Event, DashboardStats } from '../types';

interface DashboardProps {
  events: Event[];
}

export const Dashboard: React.FC<DashboardProps> = ({ events }) => {
  
  const stats: DashboardStats = useMemo(() => {
    return {
      totalEvents: events.length,
      // Calculate distinct attendees if possible, otherwise sum sold tickets
      totalAttendees: events.reduce((acc, e) => acc + e.ticketTypes.reduce((tAcc, t) => tAcc + t.sold, 0), 0),
      totalRevenue: events.reduce((acc, e) => acc + e.ticketTypes.reduce((tAcc, t) => tAcc + (t.sold * t.price), 0), 0),
      upcomingEventsCount: events.filter(e => new Date(e.date) > new Date()).length
    };
  }, [events]);

  const chartData = useMemo(() => {
    // Sort events by date and take last 5 for the chart
    const sorted = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return sorted.map(e => ({
      name: e.title.substring(0, 10) + '...',
      attendees: e.ticketTypes.reduce((acc, t) => acc + t.sold, 0),
      capacity: e.ticketTypes.reduce((acc, t) => acc + t.capacity, 0)
    }));
  }, [events]);

  const StatCard = ({ title, value, icon: Icon, color }: { title: string, value: string, icon: any, color: string }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <div className="flex items-center mt-2 text-sm text-green-600">
        <TrendingUp className="w-3 h-3 mr-1" />
        <span>+12% from last month</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`$${stats.totalRevenue.toLocaleString()}`} 
          icon={DollarSign} 
          color="bg-green-500" 
        />
        <StatCard 
          title="Total Attendees" 
          value={stats.totalAttendees.toLocaleString()} 
          icon={Users} 
          color="bg-secondary-500" 
        />
        <StatCard 
          title="Total Events" 
          value={stats.totalEvents.toString()} 
          icon={Calendar} 
          color="bg-primary-500" 
        />
        <StatCard 
          title="Upcoming" 
          value={stats.upcomingEventsCount.toString()} 
          icon={TrendingUp} 
          color="bg-orange-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Registration Overview</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="attendees" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="capacity" fill="#e0e7ff" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 font-medium">New registration for <span className="text-primary-600">Tech Summit 2025</span></p>
                  <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm text-primary-600 font-medium hover:bg-primary-50 rounded-lg transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};