import express from 'express';
import cors from 'cors';

interface ILog {
  id: string;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
  text: string;
}

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for logs (replace with database in production)
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

app.get('/logs', async (req, res) => {
  // Add artificial delay to see loading state
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  res.json({
    success: true,
    data: logs,
    message: 'Logs fetched successfully'
  });
});

app.post('/logs', async (req, res) => {
  // Add artificial delay to see loading state
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  try {
    const { owner, text } = req.body;
    
    if (!owner || !text) {
      return res.status(400).json({
        success: false,
        message: 'Owner and text are required'
      });
    }

    const newLog: ILog = {
      id: nextId.toString(),
      owner,
      text,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    logs.push(newLog);
    nextId++;

    res.status(201).json({
      success: true,
      data: newLog,
      message: 'Log created successfully'
    });
  } catch (error) {
    console.error('Error creating log:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create log'
    });
  }
});

app.put('/logs/:id', async (req, res) => {
  // Add artificial delay to see loading state
  await new Promise(resolve => setTimeout(resolve, 1800));
  
  try {
    const { id } = req.params;
    const { owner, text } = req.body;

    const logIndex = logs.findIndex(log => log.id === id);
    
    if (logIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Log not found'
      });
    }

    logs[logIndex] = {
      ...logs[logIndex],
      ...(owner && { owner }),
      ...(text && { text }),
      updatedAt: new Date()
    };

    res.json({
      success: true,
      data: logs[logIndex],
      message: 'Log updated successfully'
    });
  } catch (error) {
    console.error('Error updating log:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update log'
    });
  }
});

app.delete('/logs/:id', async (req, res) => {
  // Add artificial delay to see loading state
  await new Promise(resolve => setTimeout(resolve, 1600));
  
  try {
    const { id } = req.params;
    const logIndex = logs.findIndex(log => log.id === id);
    
    if (logIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Log not found'
      });
    }

    const deletedLog = logs.splice(logIndex, 1)[0];

    res.json({
      success: true,
      data: deletedLog,
      message: 'Log deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting log:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete log'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 Available endpoints:`);
  console.log(`   GET    /logs      - Fetch all logs`);
  console.log(`   POST   /logs      - Create a new log`);
  console.log(`   PUT    /logs/:id  - Update a log`);
  console.log(`   DELETE /logs/:id  - Delete a log`);
  console.log(`   GET    /health    - Health check`);
});

export default app;
