import { Whiteboard } from '@/types/whiteboard';

export const ULTRA_MEMBERS = [
  { id: 'u1', name: 'Alex Rivera', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', role: 'Admin' },
  { id: 'u2', name: 'Sarah Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', role: 'Editor' },
  { id: 'u3', name: 'Jordan Hayes', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan', role: 'Viewer' },
  { id: 'u4', name: 'Lisa Wang', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa', role: 'Editor' },
];

export const ULTRA_BOARDS: Whiteboard[] = [
  {
    id: 'project-alpha-123',
    title: 'Enterprise Architecture v4',
    userId: 'u1',
    visibility: 'PUBLIC',
    shareCode: 'ALPHA-9922',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: 'ux-research-flow',
    title: 'User Journey Mapping',
    userId: 'u1',
    visibility: 'PRIVATE',
    shareCode: 'UXFLOW-1100',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'marketing-sprint-2026',
    title: 'Q3 Marketing Strategy',
    userId: 'u2',
    visibility: 'PUBLIC',
    shareCode: 'SPRINT-Q3',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 'brainstorming-session',
    title: 'New Product Ideas',
    userId: 'u1',
    visibility: 'PRIVATE',
    shareCode: 'BRAIN-001',
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
];

export const ULTRA_ACTIVITIES = [
  { id: 'a1', user: 'Alex Rivera', action: 'edited', target: 'Enterprise Architecture', time: '2 mins ago' },
  { id: 'a2', user: 'Sarah Chen', action: 'shared', target: 'Marketing Strategy', time: '1 hour ago' },
  { id: 'a3', user: 'Jordan Hayes', action: 'joined', target: 'User Journey Mapping', time: '3 hours ago' },
  { id: 'a4', user: 'Lisa Wang', action: 'commented on', target: 'New Product Ideas', time: 'Yesterday' },
];
