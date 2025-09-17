# Restaurant Frontend

Modern, scalable restaurant frontend application built with React, TypeScript, and Vite.

## 🏗️ Project Structure

```
restaurant-frontend/
├── client/                          # Frontend application
│   ├── public/                      # Static assets
│   │   └── figmaAssets/            # Design assets from Figma
│   └── src/
│       ├── app/                     # App-level configuration
│       ├── features/                # Feature-based modules
│       │   ├── auth/               # Authentication feature
│       │   │   ├── components/     # Auth-specific components
│       │   │   ├── hooks/          # Auth-specific hooks
│       │   │   ├── stores/         # Auth-specific stores
│       │   │   └── index.ts        # Feature exports
│       │   └── restaurant/         # Restaurant feature
│       │       ├── components/     # Restaurant-specific components
│       │       ├── hooks/          # Restaurant-specific hooks
│       │       └── index.ts        # Feature exports
│       ├── pages/                  # Page components
│       ├── shared/                 # Shared resources
│       │   ├── api/               # API layer & clients
│       │   ├── config/            # App configuration
│       │   ├── hooks/             # Reusable hooks
│       │   ├── store/             # Global state management
│       │   ├── types/             # TypeScript type definitions
│       │   ├── ui/                # Reusable UI components
│       │   └── utils/             # Utility functions
│       ├── assets/                # Images, icons, etc.
│       ├── test/                  # Test configuration
│       ├── App.tsx                # Root component
│       └── main.tsx               # Application entry point
├── server/                        # Backend API
├── shared/                        # Shared between client/server
├── __tests__/                     # Test files
│   ├── components/               # Component tests
│   ├── features/                 # Feature tests
│   └── utils/                    # Utility tests
└── dist/                         # Build output

```

## 🚀 Features

- **Modern Tech Stack**: React 18, TypeScript, Vite
- **State Management**: Zustand with persistence
- **UI Components**: Radix UI + Tailwind CSS
- **API Layer**: Type-safe API client with error handling
- **Testing**: Vitest + Testing Library
- **Code Quality**: ESLint, TypeScript strict mode
- **Feature-based Architecture**: Scalable folder structure
- **Responsive Design**: Mobile-first approach

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd restaurant-frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev              # Start full-stack development server
npm run dev:client       # Start only client development server

# Build
npm run build           # Build both client and server
npm run build:client    # Build only client
npm run build:server    # Build only server

# Testing
npm run test            # Run tests
npm run test:ui         # Run tests with UI
npm run test:coverage   # Run tests with coverage

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint errors
npm run check           # TypeScript type checking

# Database
npm run db:push         # Push database schema changes
```

## 📁 Folder Structure Explained

### `/client/src/features/`
Feature-based architecture where each feature contains its own components, hooks, and business logic. This promotes:
- **Scalability**: Easy to add new features
- **Maintainability**: Related code stays together
- **Reusability**: Features can be easily moved or duplicated

### `/client/src/shared/`
Shared resources used across multiple features:
- **`api/`**: HTTP client and API endpoints
- **`store/`**: Global state management (Zustand)
- **`ui/`**: Reusable UI components (Radix + Tailwind)
- **`hooks/`**: Custom hooks used across features
- **`utils/`**: Pure utility functions
- **`types/`**: TypeScript type definitions

### `/client/src/pages/`
Top-level page components that compose features together.

## 🎯 State Management

Using **Zustand** for lightweight, flexible state management:

```typescript
// Example store
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    persist(
      (set) => ({
        // State
        user: null,
        isAuthenticated: false,
        
        // Actions
        login: async (email, password) => {
          // Login logic
        },
        logout: () => {
          set({ user: null, isAuthenticated: false })
        },
      }),
      { name: 'auth-storage' }
    )
  )
)
```

## 🔌 API Layer

Type-safe API client with automatic error handling:

```typescript
// API client
import { apiClient } from '@/shared/api'

export const authApi = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<User>('/auth/login', credentials),
}

// Usage in components
const { login } = useAuthStore()
await login(email, password)
```

## 🧪 Testing

Comprehensive testing setup with Vitest and Testing Library:

```typescript
// Component test example
import { render, screen } from '@testing-library/react'
import { LoginForm } from '@/features/auth'

test('renders login form', () => {
  render(<LoginForm />)
  expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
})
```

## 🎨 UI Components

Built with Radix UI and Tailwind CSS for:
- **Accessibility**: ARIA compliant components
- **Customization**: Easy styling with Tailwind
- **Consistency**: Unified design system

## 📱 Responsive Design

Mobile-first responsive design with Tailwind CSS:
- Breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Flexible layouts with CSS Grid and Flexbox
- Responsive typography and spacing

## 🚀 Deployment

### Production Build

```bash
npm run build
```

### Environment Variables

Create production `.env` file:

```bash
NODE_ENV=production
VITE_API_BASE_URL=https://your-api.com/api
```

### Deployment Platforms

- **Vercel**: Connect GitHub repo for automatic deployments
- **Netlify**: Drag & drop `dist/` folder or connect repo
- **Docker**: Use provided Dockerfile

## 🔧 Configuration

### Vite Configuration

Optimized for development and production:
- **Development**: HMR, source maps, dev tools
- **Production**: Minification, code splitting, optimized bundles

### TypeScript

Strict TypeScript configuration for better code quality:
- Strict null checks
- No implicit any
- Unused variable detection

## 🤝 Contributing

1. Follow the established folder structure
2. Write tests for new features
3. Use TypeScript strict mode
4. Follow the existing code style
5. Update documentation

## 📋 Best Practices

### Component Guidelines

- Use TypeScript interfaces for props
- Keep components small and focused
- Use custom hooks for complex logic
- Follow naming conventions

### State Management

- Use Zustand for global state
- Keep local state in components when possible
- Use proper TypeScript types for stores

### API Integration

- Use the shared API client
- Handle errors consistently
- Use proper TypeScript types for responses

### Testing

- Write unit tests for utilities
- Write integration tests for features
- Use Testing Library best practices

## 🐛 Troubleshooting

### Common Issues

1. **Import errors**: Check path aliases in `vite.config.ts`
2. **Type errors**: Ensure all dependencies have type definitions
3. **Build failures**: Check for unused imports and type errors

### Performance Tips

1. Use code splitting for large features
2. Lazy load pages and components
3. Optimize images and assets
4. Use React.memo for expensive components

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
