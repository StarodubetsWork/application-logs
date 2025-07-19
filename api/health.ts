import type { VercelRequest, VercelResponse } from '@vercel/node';

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

  return res.status(200).json({
    success: true,
    message: 'Application Logs API is running',
    timestamp: new Date().toISOString(),
    endpoints: {
      'GET /api/logs': 'Fetch all logs',
      'POST /api/logs': 'Create a new log',
      'PUT /api/logs/{id}': 'Update a log by ID', 
      'DELETE /api/logs/{id}': 'Delete a log by ID',
      'GET /api/health': 'API health check'
    },
    note: 'All CRUD operations handled through single /api/logs endpoint with URL parsing'
  });
}
