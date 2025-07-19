import type { VercelRequest, VercelResponse } from '@vercel/node';
import { logs, state, type ILog } from './data';

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

  // Parse URL to extract ID for PUT/DELETE operations
  const urlPath = url?.split('?')[0] || '';
  const pathParts = urlPath.split('/').filter(Boolean);
  const isIdOperation = pathParts.length >= 3 && pathParts[1] === 'logs' && pathParts[2] !== '';
  const id = isIdOperation ? pathParts[2] : null;

  console.log('API Request:', { method, urlPath, pathParts, isIdOperation, id });

  try {
    // GET /api/logs
    if (method === 'GET' && !isIdOperation) {
      // Add artificial delay to see loading state
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return res.status(200).json({
        success: true,
        data: logs,
        message: 'Logs fetched successfully'
      });
    }

    // POST /api/logs
    if (method === 'POST' && !isIdOperation) {
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
        id: String(state.nextId++),
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

    // PUT /api/logs/:id
    if (method === 'PUT' && isIdOperation && id) {
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
    if (method === 'DELETE' && isIdOperation && id) {
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

    // Route not found
    return res.status(404).json({
      success: false,
      message: 'Route not found',
      debug: { method, urlPath, pathParts, isIdOperation, id }
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
}
