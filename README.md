# FuelEU Maritime Compliance Platform

A full-stack application for managing maritime fuel compliance according to EU Regulation 2023/1805 (FuelEU Maritime).

## 🏗️ Architecture

This project implements **Hexagonal Architecture** (Ports & Adapters / Clean Architecture) with clear separation of concerns:

```
Core Domain ← Ports (Interfaces) ← Adapters (Infrastructure)
```

### Backend Architecture
```
backend/src/
├── core/                    # Business logic (framework-independent)
│   ├── domain/             # Entities and value objects
│   ├── application/        # Use cases
│   └── ports/              # Interfaces
│       ├── inbound/        # Use case interfaces
│       └── outbound/       # Repository interfaces
├── adapters/
│   ├── inbound/http/       # Express controllers & routes
│   └── outbound/postgres/  # Prisma repository implementations
└── infrastructure/
    ├── db/                 # Database configuration
    └── server/             # Express app setup
```

### Frontend Architecture
```
frontend/src/
├── core/                    # Business logic (framework-independent)
│   └── domain/             # Types and entities
├── adapters/
│   ├── ui/                 # React components
│   │   ├── components/     # Reusable components
│   │   └── pages/          # Tab pages
│   └── infrastructure/
│       └── api/            # API clients
└── shared/                 # Utilities
```

## 🚀 Features

### 1. Routes Management
- View all maritime routes
- Set baseline route for comparisons
- Filter by vessel type, fuel type, and year
- Display GHG intensity and emissions data

### 2. Comparison Analysis
- Compare routes against baseline
- Visual charts using Recharts
- Compliance indicators (✅/❌)
- Target intensity: 89.3368 gCO₂e/MJ (2% below 91.16)

### 3. Banking (Article 20)
- Bank positive compliance balance
- Apply banked surplus to offset deficits
- Validation: Cannot bank negative CB
- Real-time CB calculations

### 4. Pooling (Article 21)
- Create pools with multiple ships
- Greedy allocation algorithm
- Validation rules:
  - Total CB ≥ 0
  - Deficit ships cannot exit worse
  - Surplus ships cannot exit negative

## 📊 Core Formulas

```
Target Intensity (2025) = 89.3368 gCO₂e/MJ
Energy in Scope (MJ) = Fuel Consumption (t) × 41,000 MJ/t
Compliance Balance = (Target - Actual) × Energy in Scope
Percent Difference = ((Comparison / Baseline) - 1) × 100
```

## 🛠️ Tech Stack

**Backend:**
- Node.js + TypeScript
- Express.js
- PostgreSQL + Prisma ORM
- Jest for testing

**Frontend:**
- React 18 + TypeScript
- Vite
- TailwindCSS
- Recharts for visualizations
- Axios for API calls
- Lucide React for icons

## 📦 Setup & Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL 14+
- npm or yarn

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env and set your DATABASE_URL

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database
npm run prisma:seed

# Start development server
npm run dev
```

Backend will run on `http://localhost:3001`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000`

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📁 Project Structure

```
.
├── backend/               # Node.js backend
│   ├── prisma/           # Database schema & migrations
│   ├── src/              # Source code
│   └── tests/            # Test files
├── frontend/             # React frontend
│   ├── src/              # Source code
│   └── tests/            # Test files
├── AGENT_WORKFLOW.md     # AI agent usage documentation
├── REFLECTION.md         # Learning and reflections
└── README.md            # This file
```

## 🎯 KPI Dataset

| Route ID | Vessel Type | Fuel Type | Year | GHG Intensity | Fuel (t) | Distance (km) | Emissions (t) |
|----------|-------------|-----------|------|---------------|----------|---------------|---------------|
| R001     | Container   | HFO       | 2024 | 91.0          | 5000     | 12000         | 4500          |
| R002     | BulkCarrier | LNG       | 2024 | 88.0          | 4800     | 11500         | 4200          |
| R003     | Tanker      | MGO       | 2024 | 93.5          | 5100     | 12500         | 4700          |
| R004     | RoRo        | HFO       | 2025 | 89.2          | 4900     | 11800         | 4300          |
| R005     | Container   | LNG       | 2025 | 90.5          | 4950     | 11900         | 4400          |

## 🔗 API Endpoints

### Routes
- `GET /api/routes` - Get all routes
- `POST /api/routes/:id/baseline` - Set baseline route
- `GET /api/routes/comparison` - Get comparison data

### Compliance
- `GET /api/compliance/cb?shipId=&year=` - Get compliance balance
- `GET /api/compliance/adjusted-cb?shipId=&year=` - Get adjusted CB

### Banking
- `GET /api/banking/records?shipId=&year=` - Get bank records
- `POST /api/banking/bank` - Bank surplus
- `POST /api/banking/apply` - Apply banked surplus

### Pooling
- `POST /api/pools` - Create pool

## 📝 Documentation

- **[AGENT_WORKFLOW.md](./AGENT_WORKFLOW.md)** - AI agent usage documentation
- **[REFLECTION.md](./REFLECTION.md)** - Learning and reflections
- **[Backend README](./backend/README.md)** - Backend-specific documentation
- **[Frontend README](./frontend/README.md)** - Frontend-specific documentation

## 🎓 References

- [FuelEU Maritime Regulation (EU) 2023/1805](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1805)
- Annex IV: GHG emission factors
- Articles 20-21: Banking and Pooling mechanisms

## 📄 License

MIT

## 👨‍💻 Author

Created as part of the FuelEU Maritime Full-Stack Developer Assignment.
