# Quick Start Guide

Get the FuelEU Maritime platform running in 5 minutes.

## Prerequisites

Ensure you have installed:
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **PostgreSQL** 14+ ([Download](https://www.postgresql.org/download/))
- **npm** (comes with Node.js)

## Step 1: Database Setup

```bash
# Start PostgreSQL service (if not running)
# Windows: Start from Services or pgAdmin
# Mac: brew services start postgresql
# Linux: sudo systemctl start postgresql

# Create database
psql -U postgres
CREATE DATABASE fueleu_maritime;
\q
```

## Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your database credentials
# DATABASE_URL="postgresql://postgres:your_password@localhost:5432/fueleu_maritime"

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed database with sample data
npm run prisma:seed

# Start backend server
npm run dev
```

Backend will be running at `http://localhost:3001`

Verify: Open `http://localhost:3001/health` - should see `{"status":"ok"}`

## Step 3: Frontend Setup

Open a NEW terminal window:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be running at `http://localhost:3000`

## Step 4: Test the Application

1. Open browser to `http://localhost:3000`
2. Navigate through tabs:
   - **Routes:** View routes, set R001 as baseline
   - **Compare:** See comparison charts
   - **Banking:** Test with shipId=SHIP-001, year=2024
   - **Pooling:** Create pool with sample ships

## Sample Data Loaded

After seeding, you'll have:

**Routes:**
- R001 (Container, HFO, 2024) - Set as baseline
- R002 (BulkCarrier, LNG, 2024)
- R003 (Tanker, MGO, 2024)
- R004 (RoRo, HFO, 2025)
- R005 (Container, LNG, 2025)

**Ships:**
- SHIP-001, SHIP-002, SHIP-003 with calculated CB

## Quick Test Flow

### Test 1: View Routes
1. Go to Routes tab
2. See 5 routes listed
3. R001 should show "Baseline" badge
4. Try filtering by year: 2024

### Test 2: Compare Routes
1. Go to Compare tab
2. See bar chart comparing routes
3. R002 (LNG) should be compliant ✅
4. R003 (MGO) should be non-compliant ❌

### Test 3: Banking
1. Go to Banking tab
2. Enter: Ship ID = SHIP-002, Year = 2024
3. Click "Fetch CB"
4. If CB is positive, try banking 10000 gCO₂eq
5. Try applying 5000 gCO₂eq back

### Test 4: Pooling
1. Go to Pooling tab
2. Default ships already loaded
3. Adjust CB values:
   - SHIP-001: -50000 (deficit)
   - SHIP-002: 80000 (surplus)
4. Click "Create Pool"
5. See allocation: surplus transfers to deficit

## Troubleshooting

### Backend won't start
- Check PostgreSQL is running
- Verify DATABASE_URL in `.env`
- Run `npm run prisma:generate` again

### Frontend won't start
- Check Node version: `node --version` (should be 18+)
- Delete `node_modules` and run `npm install` again
- Check port 3000 is not in use

### Database errors
- Ensure database exists: `psql -U postgres -l | grep fueleu`
- Reset database:
  ```bash
  npm run prisma:migrate -- reset
  npm run prisma:seed
  ```

### CORS errors in browser
- Backend should allow CORS from localhost:3000
- Check backend console for errors
- Verify backend is running on port 3001

## Next Steps

1. Read [README.md](./README.md) for detailed architecture
2. Review [AGENT_WORKFLOW.md](./AGENT_WORKFLOW.md) to understand AI usage
3. Check [REFLECTION.md](./REFLECTION.md) for learnings
4. Explore the code starting from:
   - Backend: `backend/src/infrastructure/server/app.ts`
   - Frontend: `frontend/src/App.tsx`

## API Testing with cURL

```bash
# Get all routes
curl http://localhost:3001/api/routes

# Set baseline
curl -X POST http://localhost:3001/api/routes/R001/baseline

# Get comparison
curl http://localhost:3001/api/routes/comparison

# Get compliance balance
curl "http://localhost:3001/api/compliance/cb?shipId=SHIP-001&year=2024"

# Bank surplus
curl -X POST http://localhost:3001/api/banking/bank \
  -H "Content-Type: application/json" \
  -d '{"shipId":"SHIP-002","year":2024,"amount":10000}'

# Create pool
curl -X POST http://localhost:3001/api/pools \
  -H "Content-Type: application/json" \
  -d '{
    "year": 2024,
    "members": [
      {"shipId": "SHIP-001", "cbBefore": -50000},
      {"shipId": "SHIP-002", "cbBefore": 80000}
    ]
  }'
```

## Development Commands

**Backend:**
```bash
npm run dev          # Start with hot reload
npm run build        # Build for production
npm test             # Run tests
npm run prisma:studio # Open Prisma Studio (DB GUI)
```

**Frontend:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm test             # Run tests
npm run lint         # Check code quality
```

## Project Structure Overview

```
.
├── backend/
│   ├── prisma/              # Database schema
│   ├── src/
│   │   ├── core/            # Business logic
│   │   ├── adapters/        # Controllers & Repositories
│   │   └── infrastructure/  # DB & Server setup
│   └── tests/
│
├── frontend/
│   ├── src/
│   │   ├── core/            # Domain types
│   │   ├── adapters/        # UI & API clients
│   │   ├── App.tsx
│   │   └── main.tsx
│   └── tests/
│
└── Documentation files (.md)
```

## Need Help?

- Check backend logs in terminal
- Check browser console (F12) for frontend errors
- Review error messages - they're descriptive
- Refer to API documentation in backend/README.md

Happy coding! 🚀
