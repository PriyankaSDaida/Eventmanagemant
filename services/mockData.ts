import { Event, EventStatus } from '../types';

export const INITIAL_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Tech Summit 2025',
    date: '2025-11-15',
    location: 'San Francisco, CA',
    description: 'The premier technology conference bringing together industry leaders, innovators, and developers for three days of cutting-edge discussions on AI, Cloud Computing, and the future of software.',
    shortDescription: 'Join industry leaders for a 3-day summit on AI, Cloud Computing, and the future of software.',
    imageUrl: 'https://picsum.photos/seed/techsummit/800/400',
    ticketTypes: [
        { id: 't1', name: 'Early Bird', price: 199, capacity: 100, sold: 100 },
        { id: 't2', name: 'General Admission', price: 299, capacity: 300, sold: 150 },
        { id: 't3', name: 'VIP', price: 599, capacity: 50, sold: 20 }
    ],
    status: EventStatus.PUBLISHED,
    tags: ['Tech', 'AI', 'Networking'],
    agenda: [
      { id: 'a1', time: '09:00 AM', title: 'Keynote Speech', speaker: 'Jane Doe', description: 'Opening remarks on the future of AI.' },
      { id: 'a2', time: '11:00 AM', title: 'Cloud Architectures', speaker: 'John Smith', description: 'Scaling systems in 2025.' }
    ]
  },
  {
    id: '2',
    title: 'Sustainable Living Expo',
    date: '2025-12-01',
    location: 'Austin, TX',
    description: 'Discover the latest in green technology, sustainable home building, and organic gardening. A family-friendly event with workshops and demonstrations.',
    shortDescription: 'Discover green technology and sustainable living at this family-friendly expo.',
    imageUrl: 'https://picsum.photos/seed/green/800/400',
    ticketTypes: [
        { id: 't4', name: 'General Entry', price: 25, capacity: 200, sold: 45 }
    ],
    status: EventStatus.PUBLISHED,
    tags: ['Sustainability', 'Green', 'Lifestyle'],
    agenda: [
      { id: 'b1', time: '10:00 AM', title: 'Solar Basics', speaker: 'Green Energy Co.', description: 'Intro to home solar.' }
    ]
  },
  {
    id: '3',
    title: 'Global Marketing Retreat',
    date: '2026-01-20',
    location: 'Bali, Indonesia',
    description: 'An exclusive retreat for marketing executives to brainstorm, network, and relax in a tropical paradise.',
    shortDescription: 'Network and brainstorm with top marketing executives in a tropical paradise.',
    imageUrl: 'https://picsum.photos/seed/bali/800/400',
    ticketTypes: [
        { id: 't5', name: 'All Access Retreat', price: 1500, capacity: 50, sold: 50 }
    ],
    status: EventStatus.COMPLETED,
    tags: ['Business', 'Marketing', 'Travel'],
    agenda: []
  }
];

export const getStoredEvents = (): Event[] => {
  const stored = localStorage.getItem('eh_events');
  if (stored) {
    return JSON.parse(stored);
  }
  return INITIAL_EVENTS;
};

export const saveEvents = (events: Event[]): void => {
  localStorage.setItem('eh_events', JSON.stringify(events));
};