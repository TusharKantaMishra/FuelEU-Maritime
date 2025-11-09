# FuelEU Maritime - Implementation Plan

## Project Overview
Full-stack Fuel EU Maritime compliance platform with hexagonal architecture.

## Tech Stack
- **Frontend:** React + TypeScript + TailwindCSS + Vite
- **Backend:** Node.js + TypeScript + Express + PostgreSQL + Prisma
- **Architecture:** Hexagonal (Ports & Adapters)

---

## Phase 1: Backend Setup ✓

### 1.1 Project Structure
```
backend/
├── src/
│   ├── core/
│   │   ├── domain/           # Entities, Value Objects
│   │   ├── application/      # Use Cases
│   │   └── ports/            # Interfaces (inbound & outbound)
│   ├── adapters/
│   │   ├── inbound/
│   │   │   └── http/         # Express controllers & routes
│   │   └── outbound/
│   │       └── postgres/     # Prisma repositories
│   ├── infrastructure/
│   │   ├── db/               # Database config & migrations
│   │   └── server/           # Express app setup
│   └── shared/               # Common utilities
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
└── tests/
```

### 1.2 Database Schema
- **routes:** id, route_id, vessel_type, fuel_type, year, ghg_intensity, fuel_consumption, distance, total_emissions, is_baseline
- **ship_compliance:** id, ship_id, year, cb_gco2eq
- **bank_entries:** id, ship_id, year, amount_gco2eq, created_at
- **pools:** id, year, created_at
- **pool_members:** id, pool_id, ship_id, cb_before, cb_after

### 1.3 Core Domain Models
- Route (RouteId, VesselType, FuelType, Year, GhgIntensity, etc.)
- ComplianceBalance (ShipId, Year, CB)
- BankEntry (ShipId, Year, Amount)
- Pool (PoolId, Members, Year)

### 1.4 Use Cases
- ComputeComparisonUseCase
- ComputeCBUseCase
- BankSurplusUseCase
- ApplyBankedUseCase
- CreatePoolUseCase
- SetBaselineUseCase
- GetRoutesUseCase

### 1.5 API Endpoints
**Routes:**
- GET /routes
- POST /routes/:id/baseline
- GET /routes/comparison

**Compliance:**
- GET /compliance/cb?shipId&year
- GET /compliance/adjusted-cb?shipId&year

**Banking:**
- GET /banking/records?shipId&year
- POST /banking/bank
- POST /banking/apply

**Pools:**
- POST /pools

---

## Phase 2: Frontend Setup ✓

### 2.1 Project Structure
```
frontend/
├── src/
│   ├── core/
│   │   ├── domain/           # Entities, types
│   │   ├── application/      # Use cases
│   │   └── ports/            # Interfaces
│   ├── adapters/
│   │   ├── ui/
│   │   │   ├── components/   # React components
│   │   │   ├── pages/        # Dashboard tabs
│   │   │   └── hooks/        # Custom hooks
│   │   └── infrastructure/
│   │       └── api/          # API clients
│   └── shared/               # Utilities
└── tests/
```

### 2.2 Dashboard Tabs
1. **Routes Tab**
   - Display all routes in table
   - Set baseline button
   - Filters: vessel type, fuel type, year

2. **Compare Tab**
   - Baseline vs comparison routes
   - Chart visualization
   - Compliance indicators

3. **Banking Tab**
   - Show current CB
   - Bank positive CB
   - Apply banked surplus

4. **Pooling Tab**
   - List ships with adjusted CB
   - Create pool with validation
   - Show before/after allocations

---

## Phase 3: Core Formulas & Business Logic

### Formulas
```
Target Intensity (2025) = 89.3368 gCO₂e/MJ
Energy in scope (MJ) = fuelConsumption × 41,000 MJ/t
Compliance Balance = (Target - Actual) × Energy in scope
Percent Diff = ((comparison / baseline) - 1) × 100
```

### Banking Rules (Article 20)
- Only positive CB can be banked
- Banked amount limited to available surplus
- Applied amount cannot exceed banked total

### Pooling Rules (Article 21)
- Sum of adjusted CB ≥ 0
- Deficit ship cannot exit worse
- Surplus ship cannot exit negative
- Greedy allocation: sort desc by CB, transfer to deficits

---

## Phase 4: Testing Strategy

### Backend Tests
- Unit: Use cases (compute CB, banking, pooling)
- Integration: API endpoints with Supertest
- Edge cases: Negative CB, over-apply, invalid pool

### Frontend Tests
- Unit: Components, hooks
- Integration: Tab workflows
- E2E: User flows with Playwright (optional)

---

## Phase 5: Documentation

### Required Files
1. **AGENT_WORKFLOW.md**
   - Agents used
   - Prompts & outputs
   - Validation/corrections
   - Observations & best practices

2. **README.md**
   - Project overview
   - Architecture summary
   - Setup instructions
   - API documentation

3. **REFLECTION.md**
   - Learning from AI agents
   - Efficiency gains
   - Future improvements

---

## Implementation Order

1. ✅ Backend database schema & migrations
2. ✅ Backend core domain models
3. ✅ Backend use cases
4. ✅ Backend repositories
5. ✅ Backend API endpoints
6. ✅ Backend tests
7. ✅ Frontend structure
8. ✅ Frontend API clients
9. ✅ Frontend components & tabs
10. ✅ Frontend tests
11. ✅ Documentation files
12. ✅ Seed data
13. ✅ Integration testing

---

## KPI Dataset (Seed Data)

| routeId | vesselType   | fuelType | year | ghgIntensity | fuelConsumption | distance | totalEmissions |
|---------|-------------|----------|------|--------------|-----------------|----------|----------------|
| R001    | Container   | HFO      | 2024 | 91.0         | 5000            | 12000    | 4500           |
| R002    | BulkCarrier | LNG      | 2024 | 88.0         | 4800            | 11500    | 4200           |
| R003    | Tanker      | MGO      | 2024 | 93.5         | 5100            | 12500    | 4700           |
| R004    | RoRo        | HFO      | 2025 | 89.2         | 4900            | 11800    | 4300           |
| R005    | Container   | LNG      | 2025 | 90.5         | 4950            | 11900    | 4400           |

---

## Timeline
- **Day 1:** Backend setup, database, core logic
- **Day 2:** Frontend setup, components, integration
- **Day 3:** Testing, documentation, refinement

---

## Success Criteria
- ✅ Hexagonal architecture properly implemented
- ✅ All endpoints functional
- ✅ All tabs working correctly
- ✅ Tests passing
- ✅ Documentation complete
- ✅ AI agent usage documented
