interface ILog {
  id: string;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
  text: string;
}

// Shared data store for logs
// In production, this should be replaced with a proper database
export const logs: ILog[] = [
  {
    id: '1',
    owner: 'Alice Johnson',
    text: 'Successfully deployed the new authentication system. All tests are passing.',
    createdAt: new Date('2025-07-19T08:30:00Z'),
    updatedAt: new Date('2025-07-19T08:30:00Z')
  },
  {
    id: '2', 
    owner: 'Bob Smith',
    text: 'Database migration completed. Performance improved by 25%.',
    createdAt: new Date('2025-07-19T09:15:00Z'),
    updatedAt: new Date('2025-07-19T09:15:00Z')
  },
  {
    id: '3',
    owner: 'Carol Davis',
    text: 'Fixed critical bug in payment processing. Issue was with currency conversion.',
    createdAt: new Date('2025-07-19T09:45:00Z'),
    updatedAt: new Date('2025-07-19T09:45:00Z')
  },
  {
    id: '4',
    owner: 'David Wilson',
    text: 'New API endpoints are ready for testing. Documentation has been updated.',
    createdAt: new Date('2025-07-19T10:20:00Z'),
    updatedAt: new Date('2025-07-19T10:20:00Z')
  },
  {
    id: '5',
    owner: 'Eva Martinez',
    text: 'Security audit completed. All vulnerabilities have been addressed.',
    createdAt: new Date('2025-07-19T11:00:00Z'),
    updatedAt: new Date('2025-07-19T11:00:00Z')
  },
  {
    id: '6',
    owner: 'Frank Thompson',
    text: 'Updated user interface components. New design system implemented.',
    createdAt: new Date('2025-07-19T11:30:00Z'),
    updatedAt: new Date('2025-07-19T11:30:00Z')
  },
  {
    id: '7',
    owner: 'Grace Lee',
    text: 'Load testing completed. System can handle 10k concurrent users.',
    createdAt: new Date('2025-07-19T12:00:00Z'),
    updatedAt: new Date('2025-07-19T12:00:00Z')
  },
  {
    id: '8',
    owner: 'Henry Chen',
    text: 'Integrated third-party analytics service. Real-time dashboards are now available.',
    createdAt: new Date('2025-07-19T12:30:00Z'),
    updatedAt: new Date('2025-07-19T12:30:00Z')
  },
  {
    id: '9',
    owner: 'Isabella Rodriguez',
    text: 'Mobile app optimization complete. App size reduced by 40%.',
    createdAt: new Date('2025-07-19T13:00:00Z'),
    updatedAt: new Date('2025-07-19T13:00:00Z')
  },
  {
    id: '10',
    owner: 'Jack Anderson',
    text: 'Backup and disaster recovery procedures tested successfully.',
    createdAt: new Date('2025-07-19T13:30:00Z'),
    updatedAt: new Date('2025-07-19T13:30:00Z')
  },
  {
    id: '11',
    owner: 'Kate Williams',
    text: 'Email notification system upgraded. Now supports rich HTML templates.',
    createdAt: new Date('2025-07-19T14:00:00Z'),
    updatedAt: new Date('2025-07-19T14:00:00Z')
  },
  {
    id: '12',
    owner: 'Liam Brown',
    text: 'API rate limiting implemented. Prevents abuse and ensures fair usage.',
    createdAt: new Date('2025-07-19T14:30:00Z'),
    updatedAt: new Date('2025-07-19T14:30:00Z')
  },
  {
    id: '13',
    owner: 'Maya Patel',
    text: 'Search functionality enhanced with full-text indexing. Results are 3x faster.',
    createdAt: new Date('2025-07-19T15:00:00Z'),
    updatedAt: new Date('2025-07-19T15:00:00Z')
  },
  {
    id: '14',
    owner: 'Noah Taylor',
    text: 'Automated testing pipeline configured. All PRs now require passing tests.',
    createdAt: new Date('2025-07-19T15:30:00Z'),
    updatedAt: new Date('2025-07-19T15:30:00Z')
  },
  {
    id: '15',
    owner: 'Olivia Garcia',
    text: 'User feedback system implemented. Customers can now rate features directly.',
    createdAt: new Date('2025-07-19T16:00:00Z'),
    updatedAt: new Date('2025-07-19T16:00:00Z')
  }
];

// Counter for generating new IDs - needs to be mutable
export const state = {
  nextId: 16
};

export type { ILog };
