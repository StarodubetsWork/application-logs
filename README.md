# Logs Management Application

A full-stack React TypeScript application with Express.js backend for managing logs.

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Path Aliases** for clean imports (`@components`, `@pages`, `@interfaces`)

### Backend
- **Express.js** with TypeScript
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

## Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── interfaces/     # TypeScript interfaces
│   └── ...
├── server/             # Backend Express.js server
│   ├── index.ts        # Server entry point
│   ├── package.json    # Server dependencies
│   └── tsconfig.json   # Server TypeScript config
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
