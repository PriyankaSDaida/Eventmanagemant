export enum EventStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface AgendaItem {
  id: string;
  time: string;
  title: string;
  speaker?: string;
  description?: string;
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  capacity: number;
  sold: number;
  description?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  shortDescription?: string;
  imageUrl: string;
  ticketTypes: TicketType[]; // Replaces single price/capacity
  status: EventStatus;
  tags: string[];
  agenda: AgendaItem[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export interface DashboardStats {
  totalEvents: number;
  totalAttendees: number;
  totalRevenue: number;
  upcomingEventsCount: number;
}

export type ViewState = 'HOME' | 'LOGIN' | 'SIGNUP' | 'DASHBOARD' | 'EVENTS' | 'CREATE_EVENT' | 'EVENT_DETAILS';

export interface CreateEventFormData {
  title: string;
  date: string;
  location: string;
  notes: string;
}