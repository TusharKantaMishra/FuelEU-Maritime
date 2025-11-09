# FuelEU Maritime Frontend

React + TypeScript dashboard for FuelEU Maritime compliance management with hexagonal architecture.

## 🏗️ Architecture

### Hexagonal (Ports & Adapters)

```
src/
├── core/                           # Business logic layer
│   └── domain/                     # Types and entities
│       └── types.ts
├── adapters/
│   ├── ui/                         # React components
│   │   ├── components/             # Reusable components
│   │   └── pages/                  # Tab pages
│   │       ├── RoutesTab.tsx
│   │       ├── CompareTab.tsx
│   │       ├── BankingTab.tsx
│   │       └── PoolingTab.tsx
│   └── infrastructure/
│       └── api/                    # API clients
│           ├── apiClient.ts
│           ├── routeApi.ts
│           ├── complianceApi.ts
│           ├── bankingApi.ts
│           └── poolApi.ts
├── App.tsx                         # Main application
├── main.tsx                        # Entry point
└── index.css                       # Global styles
```

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Application runs on `http://localhost:3000`

## 🎨 Features

### 1. Routes Tab
- Display all maritime routes in table format
- Filter by vessel type, fuel type, and year
- Set baseline route for comparisons
- Visual indicators for baseline routes

### 2. Compare Tab
- Compare routes against baseline
- Interactive bar chart visualization
- Compliance status indicators (✅/❌)
- Target intensity line (89.3368 gCO₂e/MJ)

### 3. Banking Tab
- View current compliance balance
- Bank positive CB for future use
- Apply banked surplus to offset deficits
- Real-time validation and feedback

### 4. Pooling Tab
- Create pools with multiple ships
- Dynamic member management (add/remove)
- Visual total CB indicator
- Before/after allocation display
- Automatic validation against FuelEU rules

## 🛠️ Tech Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript 5.2
- **Styling:** TailwindCSS 3.3
- **Charts:** Recharts 2.10
- **Icons:** Lucide React
- **HTTP Client:** Axios

## 📱 UI Components

### Layout Structure
```
┌─────────────────────────────────────┐
│          Header (Logo + Title)      │
├─────────────────────────────────────┤
│  [Routes] [Compare] [Banking] [Pooling]
├─────────────────────────────────────┤
│                                      │
│         Active Tab Content           │
│                                      │
└─────────────────────────────────────┘
```

### Design System

**Colors:**
- Primary: Blue 600 (#2563eb)
- Success: Green 600 (#16a34a)
- Error: Red 600 (#dc2626)
- Warning: Orange 600 (#ea580c)

**Typography:**
- Headings: System font, bold
- Body: System font, regular
- Mono: Source Code Pro (for data)

## 🔗 API Integration

### Configuration

API base URL can be set via environment variable:

```env
# .env
VITE_API_URL=http://localhost:3001/api
```

### API Client

Centralized API client with TypeScript typing:

```typescript
import { apiClient } from '@/adapters/infrastructure/api/apiClient';

// All API calls are typed
const routes = await apiClient.get<Route[]>('/routes');
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run with UI
npm run test:ui

# Coverage report
npm test -- --coverage
```

## 📝 Development

### Adding a New Tab

1. **Create Tab Component** (`adapters/ui/pages/`)
```typescript
export default function NewTab() {
  const [data, setData] = useState<DataType[]>([]);
  
  useEffect(() => {
    // Fetch data
  }, []);
  
  return (
    <div>
      {/* Tab content */}
    </div>
  );
}
```

2. **Add to App.tsx**
```typescript
import NewTab from './adapters/ui/pages/NewTab';

const tabs = [
  // ... existing tabs
  { id: 'new', label: 'New', icon: Icon, component: NewTab },
];
```

3. **Create API Client** (if needed)
```typescript
// adapters/infrastructure/api/newApi.ts
export const newApi = {
  getData: () => apiClient.get<DataType[]>('/new'),
};
```

### Styling Guidelines

Use TailwindCSS utility classes:

```tsx
<div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
  <h2 className="text-2xl font-bold text-gray-900">Title</h2>
  <p className="mt-1 text-sm text-gray-500">Description</p>
</div>
```

**Common Patterns:**
- Cards: `bg-white rounded-lg shadow-sm border border-gray-200`
- Buttons: `px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700`
- Inputs: `px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500`

## 🔧 Scripts

```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "test": "vitest",
  "lint": "eslint . --ext ts,tsx",
  "format": "prettier --write \"src/**/*.{ts,tsx}\""
}
```

## 📊 State Management

Currently using React hooks:
- `useState` - Component state
- `useEffect` - Side effects (API calls)
- No global state management (not needed for current scope)

For larger applications, consider:
- Zustand (lightweight)
- Redux Toolkit (comprehensive)
- React Query (server state)

## ⚡ Performance

### Optimizations Applied
- Code splitting (automatic via Vite)
- Lazy loading of chart library
- Minimal re-renders with proper keys

### Future Optimizations
- React.memo for expensive components
- useMemo/useCallback for heavy computations
- Virtual scrolling for large datasets

## 🎯 Key Features

- ✅ Hexagonal architecture (business logic separate from UI)
- ✅ Strong TypeScript typing
- ✅ Responsive design (mobile-friendly)
- ✅ Accessible components
- ✅ Error boundaries
- ✅ Loading states
- ✅ Form validation
- ✅ Modern UI with TailwindCSS

## 📖 Component Library

### Button Patterns

```tsx
// Primary action
<button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
  Action
</button>

// Secondary action
<button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
  Cancel
</button>

// Destructive action
<button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
  Delete
</button>
```

### Form Inputs

```tsx
<input
  type="text"
  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  placeholder="Enter value"
/>
```

### Status Badges

```tsx
// Success
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
  Compliant
</span>

// Error
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
  Non-Compliant
</span>
```

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📚 References

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
