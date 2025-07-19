# Application Logs - Monitor & Manage

A modern full-stack React TypeScript application with serverless backend for managing application logs.

## 🚀 Features

- **Real-time Log Management**: Create, read, update, and delete application logs
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with React 19, TypeScript, and Tailwind CSS
- **Serverless Backend**: Deployed on Vercel with serverless functions
- **Fast Development**: Vite for lightning-fast development experience
- **Comprehensive Testing**: Complete test suite with Vitest

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Path Aliases** for clean imports (`@components`, `@pages`, `@interfaces`)
- **React Hook Form** for performant forms
- **React Hot Toast** for notifications

### Backend
- **Vercel Serverless Functions** - Scalable serverless backend (Production)
- **Express.js** with TypeScript - Local development server
- **CORS** enabled for cross-origin requests
- **In-memory storage** (easily replaceable with database)

## Getting Started

### Environment Setup
Create a `.env.local` file in the root directory (copy from `.env.example`):
```bash
cp .env.example .env.local
```

Edit the environment variables as needed:
```bash
# Backend API Configuration
VITE_API_BASE_URL=http://localhost:3001
```

### Install Dependencies
```bash
yarn install
```

### Start Development Servers

#### Frontend (React + Vite)
```bash
yarn dev
# Runs on http://localhost:5173
```

#### Backend (Express.js)
```bash
yarn server
# Runs on http://localhost:3001
```

## API Endpoints

The backend server provides the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/logs` | Fetch all logs |
| `POST` | `/logs` | Create a new log |
| `PUT` | `/logs/:id` | Update a log by ID |
| `DELETE` | `/logs/:id` | Delete a log by ID |
| `GET` | `/health` | Health check |

### API Examples

#### Create a new log
```bash
curl -X POST http://localhost:3001/logs \
  -H "Content-Type: application/json" \
  -d '{"owner": "John Doe", "text": "Sample log message"}'
```

#### Get all logs
```bash
curl http://localhost:3001/logs
```

#### Update a log
```bash
curl -X PUT http://localhost:3001/logs/1 \
  -H "Content-Type: application/json" \
  -d '{"text": "Updated log message"}'
```

#### Delete a log
```bash
curl -X DELETE http://localhost:3001/logs/1
```

## 🌐 Deployment to Vercel

### Option 1: Automatic Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy application"
   git push origin main
   ```

2. **Deploy via Vercel Dashboard**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Import Project"
   - Connect your GitHub repository
   - Vercel will auto-detect your settings
   - Click "Deploy"

3. **Set Environment Variables**
   - In your Vercel project settings, add:
   ```
   VITE_API_BASE_URL=https://your-app-name.vercel.app/api
   NODE_ENV=production
   ```

### Option 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

### Important Files for Vercel Deployment

- `vercel.json` - Vercel deployment configuration
- `api/index.ts` - Serverless function handler
- `.env.production` - Production environment variables

## Project Structure

```
├── api/                    # Vercel serverless functions
│   └── index.ts           # Main API handler (production backend)
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Page components
│   ├── interfaces/        # TypeScript interfaces
│   └── ...
├── server/                # Express.js server (local development)
│   ├── index.ts           # Server entry point
│   ├── package.json       # Server dependencies
│   └── tsconfig.json      # Server TypeScript config
├── vercel.json            # Vercel deployment config
├── tailwind.config.js     # Tailwind configuration
└── ...
```

## Path Aliases

Clean imports using configured aliases:
```typescript
import { ILog } from '@interfaces';
import { HomePage } from '@pages';
import { Table } from '@components';
```

## Development Scripts

- `yarn dev` - Start React development server
- `yarn server` - Start Express.js backend server
- `yarn build` - Build React app for production
- `yarn lint` - Run ESLint
- `yarn preview` - Preview production build
