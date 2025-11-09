# FuelEU Maritime Backend API

Node.js + TypeScript backend implementing FuelEU Maritime compliance calculations with hexagonal architecture.

## 🏗️ Architecture

### Hexagonal (Ports & Adapters)

```
src/
├── core/                           # Business logic layer
│   ├── domain/                     # Entities and value objects
│   │   ├── Route.ts
│   │   ├── ComplianceBalance.ts
│   │   ├── BankEntry.ts
│   │   └── Pool.ts
│   ├── application/                # Use cases (business rules)
│   │   ├── RouteUseCasesImpl.ts
│   │   ├── ComplianceUseCasesImpl.ts
│   │   ├── BankingUseCasesImpl.ts
│   │   └── PoolingUseCasesImpl.ts
│   └── ports/                      # Interfaces
│       ├── inbound/                # Use case interfaces
│       └── outbound/               # Repository interfaces
├── adapters/
│   ├── inbound/http/               # Express controllers
│   │   ├── RouteController.ts
│   │   ├── ComplianceController.ts
│   │   ├── BankingController.ts
│   │   ├── PoolingController.ts
│   │   └── routes.ts
│   └── outbound/postgres/          # Prisma repositories
│       ├── PrismaRouteRepository.ts
│       ├── PrismaComplianceRepository.ts
│       ├── PrismaBankRepository.ts
│       └── PrismaPoolRepository.ts
└── infrastructure/
    ├── db/                         # Database configuration
    │   └── prisma.ts
    └── server/                     # Express setup
        └── app.ts
```

## 📦 Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your database credentials
# DATABASE_URL="postgresql://user:password@localhost:5432/fueleu_maritime"

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed database with sample data
npm run prisma:seed
```

## 🚀 Running

```bash
# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Server runs on `http://localhost:3001`

## 🔗 API Endpoints

### Routes
```http
GET    /api/routes
GET    /api/routes/comparison
POST   /api/routes/:id/baseline
```

### Compliance
```http
GET    /api/compliance/cb?shipId=SHIP-001&year=2024
GET    /api/compliance/adjusted-cb?shipId=SHIP-001&year=2024
```

### Banking
```http
GET    /api/banking/records?shipId=SHIP-001&year=2024
POST   /api/banking/bank
POST   /api/banking/apply
```

### Pooling
```http
POST   /api/pools
```

### Example Requests

**Create Pool:**
```bash
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

## 🧮 Core Formulas

```typescript
// Target Intensity for 2025 (2% below 91.16)
TARGET_INTENSITY_2025 = 89.3368 gCO₂e/MJ

// Energy calculation
Energy (MJ) = fuelConsumption (t) × 41,000 MJ/t

// Compliance Balance
CB = (Target - Actual) × Energy

// Positive CB = Surplus (can bank)
// Negative CB = Deficit (cannot bank)
```

## 🗄️ Database Schema

```sql
-- Routes with GHG intensity data
routes (
  id, route_id, vessel_type, fuel_type, year,
  ghg_intensity, fuel_consumption, distance,
  total_emissions, is_baseline
)

-- Computed compliance balances
ship_compliance (
  id, ship_id, year, cb_gco2eq
)

-- Banking transactions
bank_entries (
  id, ship_id, year, amount_gco2eq, created_at
)

-- Pooling
pools (id, year, created_at)
pool_members (pool_id, ship_id, cb_before, cb_after)
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Watch mode
npm run test:watch
```

## 📝 Development

### Adding a New Feature

1. **Define Domain Model** (`core/domain/`)
```typescript
export interface NewFeature {
  id: number;
  // ... properties
}
```

2. **Create Port Interface** (`core/ports/`)
```typescript
export interface NewFeatureRepository {
  findById(id: number): Promise<NewFeature>;
}
```

3. **Implement Use Case** (`core/application/`)
```typescript
export class NewFeatureUseCaseImpl {
  constructor(private repo: NewFeatureRepository) {}
  async execute(id: number) {
    return this.repo.findById(id);
  }
}
```

4. **Implement Repository** (`adapters/outbound/`)
```typescript
export class PrismaNewFeatureRepository implements NewFeatureRepository {
  // ... implementation
}
```

5. **Create Controller** (`adapters/inbound/http/`)
```typescript
export class NewFeatureController {
  // ... HTTP handlers
}
```

## 🔧 Scripts

```json
{
  "dev": "tsx watch src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js",
  "test": "jest --coverage",
  "prisma:generate": "prisma generate",
  "prisma:migrate": "prisma migrate dev",
  "prisma:seed": "tsx prisma/seed.ts",
  "prisma:studio": "prisma studio"
}
```

## 🛡️ Error Handling

All endpoints return consistent error format:

```json
{
  "error": "Descriptive error message"
}
```

HTTP Status Codes:
- `200` - Success
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

## 📚 Technologies

- **Runtime:** Node.js 18+
- **Language:** TypeScript 5.3
- **Framework:** Express 4.18
- **Database:** PostgreSQL 14+
- **ORM:** Prisma 5.7
- **Testing:** Jest 29
- **Validation:** Zod 3.22

## 🎯 Key Features

- ✅ Hexagonal architecture (framework-independent core)
- ✅ Strong TypeScript typing
- ✅ Dependency injection
- ✅ Repository pattern
- ✅ Clean separation of concerns
- ✅ Comprehensive error handling
- ✅ Database migrations
- ✅ Seed data for testing

## 📖 References

- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [FuelEU Maritime Regulation](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1805)
