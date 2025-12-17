import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Users, DollarSign, TrendingUp, Clock, ArrowUpRight, Activity } from 'lucide-react';
import { Event } from '../types';

interface DashboardProps {
  events: (Event & { registeredCount: number; price: number })[];
}

export const Dashboard: React.FC<DashboardProps> = ({ events }) => {
  // Calculate summary stats
  const totalEvents = events.length;
  const totalRegistrations = events.reduce((acc, e) => acc + e.registeredCount, 0);
  const totalRevenue = events.reduce((acc, e) => {
    // Estimate revenue based on sold tickets (simplified)
    const eventRevenue = e.ticketTypes.reduce((sum, t) => sum + (t.price * t.sold), 0);
    return acc + eventRevenue;
  }, 0);

  // Mock data for charts - in a real app this would be historical data
  const activityData = [
    { name: 'Mon', active: 4000, new: 2400 },
    { name: 'Tue', active: 3000, new: 1398 },
    { name: 'Wed', active: 2000, new: 9800 },
    { name: 'Thu', active: 2780, new: 3908 },
    { name: 'Fri', active: 1890, new: 4800 },
    { name: 'Sat', active: 2390, new: 3800 },
    { name: 'Sun', active: 3490, new: 4300 },
  ];

  const statusData = [
    { name: 'Published', value: events.filter(e => e.status === 'PUBLISHED').length, color: '#14b8a6' }, // Teal
    { name: 'Draft', value: events.filter(e => e.status === 'DRAFT').length, color: '#94a3b8' }, // Slate-400
    { name: 'Completed', value: events.filter(e => e.status === 'COMPLETED').length, color: '#6366f1' }, // Indigo
  ];

  // Helper for status data if empty
  const graphData = statusData.every(d => d.value === 0)
    ? [{ name: 'No Events', value: 1, color: '#e2e8f0' }]
    : statusData;

  const colorMap: Record<string, { icon: string; bg: string; text: string; ring: string }> = {
    primary: { icon: 'text-indigo-600', bg: 'bg-indigo-50', text: 'text-indigo-600', ring: 'ring-indigo-100' },
    secondary: { icon: 'text-pink-600', bg: 'bg-pink-50', text: 'text-pink-600', ring: 'ring-pink-100' },
    teal: { icon: 'text-teal-600', bg: 'bg-teal-50', text: 'text-teal-600', ring: 'ring-teal-100' },
    accent: { icon: 'text-teal-600', bg: 'bg-teal-50', text: 'text-teal-600', ring: 'ring-teal-100' },
    blue: { icon: 'text-blue-600', bg: 'bg-blue-50', text: 'text-blue-600', ring: 'ring-blue-100' },

    pink: { icon: 'text-pink-600', bg: 'bg-pink-50', text: 'text-pink-600', ring: 'ring-pink-100' },
  };

  interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ElementType;
    trend: string;
    colorKey: string;
  }

  const StatCard = ({ title, value, icon: Icon, trend, colorKey }: StatCardProps) => {
    const theme = colorMap[colorKey] || colorMap.primary;

    return (
      <div className="glass p-6 rounded-2xl relative overflow-hidden group border border-white/60 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300">
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500`}>
          <Icon className={`w-24 h-24 ${theme.text}`} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2.5 rounded-xl ${theme.bg} ${theme.text} ring-1 ${theme.ring}`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-slate-500 font-medium text-sm uppercase tracking-wide">{title}</span>
          </div>
          <div className="text-3xl font-bold font-heading text-slate-900 mb-2">{value}</div>
          <div className="flex items-center text-sm">
            <span className="text-teal-500 flex items-center font-bold bg-teal-50 px-2 py-0.5 rounded-full ring-1 ring-teal-100">
              <TrendingUp className="w-3 h-3 mr-1" /> {trend}
            </span>
            <span className="text-slate-400 ml-2">vs last month</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-900 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-heading text-slate-900 mb-2">Dashboard Overview</h1>
          <p className="text-slate-500">Welcome back! Here's what's happening with your events.</p>
        </div>
        <div className="hidden sm:flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
            Export Report
          </button>
          <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
            New Campaign
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Events"
          value={totalEvents}
          icon={Calendar}
          trend="+12%"
          colorKey="primary"
        />
        <StatCard
          title="Total Registrations"
          value={totalRegistrations}
          icon={Users}
          trend="+24%"
          colorKey="secondary"
        />
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          trend="+8%"
          colorKey="teal"
        />
        <StatCard
          title="Active Now"
          value="142"
          icon={Activity}
          trend="+5%"
          colorKey="accent"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Activity Chart */}
        <div className="lg:col-span-2 glass p-6 rounded-2xl border-white/60">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Engagement Overview</h3>
            <select className="bg-white border border-slate-200 rounded-lg px-3 py-1 text-sm text-slate-600 outline-none focus:ring-2 focus:ring-primary-500">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: '#64748b' }}
                />
                <Area type="monotone" dataKey="active" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorActive)" />
                <Area type="monotone" dataKey="new" stroke="#ec4899" strokeWidth={3} fillOpacity={1} fill="url(#colorNew)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Event Status Distribution */}
        <div className="glass p-6 rounded-2xl flex flex-col border-white/60">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Event Status</h3>
          <div className="flex-1 min-h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={graphData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {graphData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', borderColor: '#e2e8f0', borderRadius: '12px', color: '#0f172a', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  itemStyle={{ color: '#64748b' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800">{events.length}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Total</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {statusData.map(item => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-slate-500">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Mock */}
      <div className="glass p-6 rounded-2xl border-white/60">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mt-1">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-slate-600">
                  <span className="font-bold text-slate-900">New registration</span> for <span className="text-primary-600">Tech Conference 2024</span>
                </p>
                <p className="text-xs text-slate-400 mt-1">2 minutes ago</p>
              </div>
              <button className="p-2 text-slate-400 hover:text-primary-600 transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};