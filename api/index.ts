import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ILog {
  id: string;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
  text: string;
}

// In-memory storage for logs (in production, use a database like Planetscale, Supabase, etc.)
const logs: ILog[] = [
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

let nextId = 16;

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.status(200).json({});
    return;
  }

  // Add CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  const { method, url } = req;
  const path = url?.replace('/api', '') || '';

  try {
    // Health check
    if (method === 'GET' && path === '/health') {
      return res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
      });
    }

    // GET /logs
    if (method === 'GET' && path === '/logs') {
      // Add artificial delay to see loading state
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return res.status(200).json({
        success: true,
        data: logs,
        message: 'Logs fetched successfully'
      });
    }

    // POST /logs
    if (method === 'POST' && path === '/logs') {
      // Add artificial delay to see loading state
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const { owner, text } = req.body;
      
      if (!owner || !text) {
        return res.status(400).json({
          success: false,
          message: 'Owner and text are required'
        });
      }

      const newLog: ILog = {
        id: String(nextId++),
        owner,
        text,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      logs.push(newLog);

      return res.status(201).json({
        success: true,
        data: newLog,
        message: 'Log created successfully'
      });
    }

    // PUT /logs/:id
    if (method === 'PUT' && path.startsWith('/logs/')) {
      // Add artificial delay to see loading state
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      const id = path.split('/')[2];
      const { owner, text } = req.body;
      
      if (!owner || !text) {
        return res.status(400).json({
          success: false,
          message: 'Owner and text are required'
        });
      }

      const logIndex = logs.findIndex(log => log.id === id);
      
      if (logIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Log not found'
        });
      }

      logs[logIndex] = {
        ...logs[logIndex],
        owner,
        text,
        updatedAt: new Date()
      };

      return res.status(200).json({
        success: true,
        data: logs[logIndex],
        message: 'Log updated successfully'
      });
    }

    // DELETE /logs/:id
    if (method === 'DELETE' && path.startsWith('/logs/')) {
      // Add artificial delay to see loading state
      await new Promise(resolve => setTimeout(resolve, 1600));
      
      const id = path.split('/')[2];
      const logIndex = logs.findIndex(log => log.id === id);
      
      if (logIndex === -1) {
        return res.status(404).json({
          success: false,
          message: 'Log not found'
        });
      }

      const deletedLog = logs.splice(logIndex, 1)[0];

      return res.status(200).json({
        success: true,
        data: deletedLog,
        message: 'Log deleted successfully'
      });
    }

    // Route not found
    return res.status(404).json({
      success: false,
      message: 'Route not found'
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
