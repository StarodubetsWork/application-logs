import type { VercelRequest, VercelResponse } from '@vercel/node';
import { logs } from '../data';

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

  const { method, query } = req;
  const id = query.id as string;

  try {
    // PUT /api/logs/:id
    if (method === 'PUT') {
      // Add artificial delay to see loading state
      await new Promise(resolve => setTimeout(resolve, 1800));
      
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

    // DELETE /api/logs/:id
    if (method === 'DELETE') {
      // Add artificial delay to see loading state
      await new Promise(resolve => setTimeout(resolve, 1600));
      
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

    // Method not allowed
    return res.status(405).json({
      success: false,
      message: `Method ${method} not allowed`
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
