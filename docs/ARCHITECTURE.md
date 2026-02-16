# 🏗️ Architecture Documentation

> สถาปัตยกรรมระบบของ bl1nk-bookmarks

---

## 📋 สารบัญ

1. [ภาพรวม](#ภาพรวม)
2. [Technology Stack](#technology-stack)
3. [System Architecture](#system-architecture)
4. [Data Flow](#data-flow)
5. [Component Architecture](#component-architecture)
6. [State Management](#state-management)
7. [Security](#security)
8. [Performance](#performance)

---

## ภาพรวม

bl1nk-bookmarks เป็นแอปพลิเคชันจัดการบุ๊กมาร์กที่สร้างด้วย **Next.js 16** และ **Supabase** โดยมีสถาปัตยกรรมแบบ **Modern Full-Stack**

### Key Features
- 🎨 **Modern UI/UX** - Glassmorphism design
- 🔐 **Secure Authentication** - Supabase Auth
- 📱 **Responsive Design** - Mobile-first approach
- ⚡ **Fast Performance** - Server-side rendering
- 🎯 **Type Safe** - TypeScript throughout

---

## Technology Stack

### Frontend Layer

```
┌─────────────────────────────────────────┐
│           Presentation Layer            │
├─────────────────────────────────────────┤
│  Next.js 16 (App Router)                │
│  React 19                               │
│  TypeScript                             │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│            UI Components                │
├─────────────────────────────────────────┤
│  shadcn/ui                              │
│  Tailwind CSS v4                        │
│  Lucide Icons                           │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│          State Management               │
├─────────────────────────────────────────┤
│  Zustand (Client State)                 │
│  React Hook Form (Forms)                │
│  Zod (Validation)                       │
└─────────────────────────────────────────┘
```

### Backend Layer

```
┌─────────────────────────────────────────┐
│            API Layer                    │
├─────────────────────────────────────────┤
│  Next.js API Routes                     │
│  Supabase Client                        │
│  Middleware (Auth)                      │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│         Database Layer                  │
├─────────────────────────────────────────┤
│  Supabase (PostgreSQL)                  │
│  Row Level Security                     │
│  Real-time Subscriptions                │
└─────────────────────────────────────────┘
```

---

## System Architecture

### High-Level Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Client                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                   Browser                           │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐   │  │
│  │  │  Dashboard │  │ Collections│  │   Search   │   │  │
│  │  └────────────┘  └────────────┘  └────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Server                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                 App Router                          │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐   │  │
│  │  │   Pages    │  │  Layouts   │  │   API      │   │  │
│  │  └────────────┘  └────────────┘  └────────────┘   │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Middleware (Auth)                      │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Supabase                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              PostgreSQL Database                    │  │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐           │  │
│  │  │ bookmarks│ │collections│ │  tags   │           │  │
│  │  └──────────┘ └──────────┘ └──────────┘           │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Authentication                         │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Row Level Security                        │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### 1. User Authentication Flow

```
User Login
    │
    ▼
┌─────────────────┐
│  Login Form     │
│  (Client)       │
└─────────────────┘
    │
    │ Submit Credentials
    ▼
┌─────────────────┐
│  Supabase Auth  │
│  (API)          │
└─────────────────┘
    │
    │ Verify
    ▼
┌─────────────────┐
│  Create Session │
│  (Cookie)       │
└─────────────────┘
    │
    │ Redirect
    ▼
┌─────────────────┐
│  Dashboard      │
│  (Protected)    │
└─────────────────┘
```

### 2. Bookmark Creation Flow

```
User Clicks "Add Bookmark"
    │
    ▼
┌─────────────────┐
│  Open Dialog    │
│  (Client)       │
└─────────────────┘
    │
    │ Fill Form
    ▼
┌─────────────────┐
│  Validate       │
│  (Zod Schema)   │
└─────────────────┘
    │
    │ Submit
    ▼
┌─────────────────┐
│  Supabase       │
│  Insert         │
└─────────────────┘
    │
    │ Return Data
    ▼
┌─────────────────┐
│  Update Store   │
│  (Zustand)      │
└─────────────────┘
    │
    │ Re-render
    ▼
┌─────────────────┐
│  Show in List   │
│  (UI)           │
└─────────────────┘
```

### 3. Data Fetching Flow

```
Page Load
    │
    ▼
┌─────────────────┐
│  Check Auth     │
│  (Middleware)   │
└─────────────────┘
    │
    │ Authenticated
    ▼
┌─────────────────┐
│  Fetch Data     │
│  (Supabase)     │
└─────────────────┘
    │
    │ Return Data
    ▼
┌─────────────────┐
│  Store in       │
│  Zustand        │
└─────────────────┘
    │
    │ Render
    ▼
┌─────────────────┐
│  Display UI     │
│  (React)        │
└─────────────────┘
```

---

## Component Architecture

### Component Hierarchy

```
App
├── RootLayout
│   ├── Providers (Theme, Auth)
│   └── Page
│       ├── AuthLayout (Public)
│       │   ├── LoginPage
│       │   └── SignupPage
│       │
│       └── DashboardLayout (Protected)
│           ├── Sidebar
│           ├── Header
│           └── Main Content
│               ├── DashboardPage
│               │   ├── BookmarkGrid
│               │   │   └── BookmarkCard
│               │   └── CollectionSidebar
│               │
│               ├── CollectionsPage
│               │   ├── CollectionGrid
│               │   │   └── CollectionCard
│               │   └── CreateCollectionDialog
│               │
│               └── SearchPage
│                   ├── SearchBar
│                   ├── FilterSidebar
│                   └── SearchResults
```

### Component Types

#### 1. **Layout Components**
```tsx
// src/app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

// src/app/(dashboard)/layout.tsx
export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
```

#### 2. **Page Components**
```tsx
// src/app/(dashboard)/dashboard/page.tsx
export default async function DashboardPage() {
  const bookmarks = await getBookmarks();
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <BookmarkGrid bookmarks={bookmarks} />
    </div>
  );
}
```

#### 3. **Client Components**
```tsx
// src/components/bookmarks/bookmark-card.tsx
'use client';

export function BookmarkCard({ bookmark }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Content */}
    </div>
  );
}
```

#### 4. **Server Components**
```tsx
// src/components/bookmarks/bookmark-list.tsx
export async function BookmarkList() {
  const bookmarks = await getBookmarks();
  
  return (
    <div>
      {bookmarks.map(bookmark => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
}
```

---

## State Management

### Zustand Store Structure

```tsx
// src/lib/store/bookmarks.ts
import { create } from 'zustand';

interface Bookmark {
  id: string;
  url: string;
  title: string;
  description?: string;
  collectionId?: string;
  tags?: Tag[];
  createdAt: Date;
  updatedAt: Date;
}

interface BookmarkStore {
  // State
  bookmarks: Bookmark[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setBookmarks: (bookmarks: Bookmark[]) => void;
  addBookmark: (bookmark: Bookmark) => void;
  updateBookmark: (id: string, bookmark: Partial<Bookmark>) => void;
  removeBookmark: (id: string) => void;
  getFilteredBookmarks: () => Bookmark[];
}

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  // Initial State
  bookmarks: [],
  isLoading: false,
  error: null,
  
  // Actions
  setBookmarks: (bookmarks) => set({ bookmarks }),
  
  addBookmark: (bookmark) => set((state) => ({
    bookmarks: [...state.bookmarks, bookmark]
  })),
  
  updateBookmark: (id, updated) => set((state) => ({
    bookmarks: state.bookmarks.map(b => 
      b.id === id ? { ...b, ...updated } : b
    )
  })),
  
  removeBookmark: (id) => set((state) => ({
    bookmarks: state.bookmarks.filter(b => b.id !== id)
  })),
  
  getFilteredBookmarks: () => {
    const { bookmarks } = get();
    // Filter logic
    return bookmarks;
  }
}));
```

### Store Organization

```
src/lib/store/
├── auth.ts           # Authentication state
├── bookmarks.ts      # Bookmarks state
├── collections.ts    # Collections state
└── index.ts          # Store exports
```

---

## Security

### Authentication Flow

```tsx
// Middleware for protected routes
// src/middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const supabase = createServerClient(/* ... */);
  
  const { data: { session } } = await supabase.auth.getSession();
  
  // Protected routes
  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Auth routes (redirect if logged in)
  if (session && ['/login', '/signup'].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}
```

### Row Level Security (RLS)

```sql
-- Enable RLS
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own bookmarks
CREATE POLICY "Users can view own bookmarks"
  ON bookmarks
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own bookmarks
CREATE POLICY "Users can insert own bookmarks"
  ON bookmarks
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own bookmarks
CREATE POLICY "Users can update own bookmarks"
  ON bookmarks
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Policy: Users can delete their own bookmarks
CREATE POLICY "Users can delete own bookmarks"
  ON bookmarks
  FOR DELETE
  USING (auth.uid() = user_id);
```

---

## Performance

### Optimization Strategies

#### 1. **Server Components**
```tsx
// ✅ Good - Server Component (fetches data on server)
export default async function Dashboard() {
  const bookmarks = await getBookmarks();
  return <BookmarkGrid bookmarks={bookmarks} />;
}

// ❌ Bad - Client Component (fetches on client)
'use client';
export default function Dashboard() {
  const [bookmarks, setBookmarks] = useState([]);
  useEffect(() => {
    fetchBookmarks().then(setBookmarks);
  }, []);
  return <BookmarkGrid bookmarks={bookmarks} />;
}
```

#### 2. **Lazy Loading**
```tsx
import dynamic from 'next/dynamic';

const BookmarkChart = dynamic(
  () => import('@/components/bookmarks/chart'),
  { loading: () => <Skeleton /> }
);
```

#### 3. **Image Optimization**
```tsx
import Image from 'next/image';

<Image
  src={bookmark.thumbnail}
  alt={bookmark.title}
  width={400}
  height={225}
  className="object-cover"
  loading="lazy"
/>
```

#### 4. **Pagination**
```tsx
// Limit data fetch
const { data } = await supabase
  .from('bookmarks')
  .select('*')
  .range(0, 19); // First 20 items
```

### Performance Metrics

| Metric | Target | Current |
|--------|--------|---------|
| First Contentful Paint | < 1.5s | ~1.2s |
| Largest Contentful Paint | < 2.5s | ~2.0s |
| Time to Interactive | < 3.5s | ~3.0s |
| Cumulative Layout Shift | < 0.1 | ~0.05 |

---

## Deployment Architecture

```
┌─────────────────────────────────────────┐
│            Vercel Edge Network          │
│  (CDN, DDoS Protection, SSL)            │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│         Vercel Serverless               │
│  (Next.js App, API Routes)              │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│            Supabase                     │
│  (PostgreSQL, Auth, Storage)            │
└─────────────────────────────────────────┘
```

---

## Monitoring & Logging

### Error Tracking

```tsx
// Error Boundary
'use client';

export function ErrorBoundary({ children }) {
  return (
    <ErrorBoundary fallback={ErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}

function ErrorFallback({ error }) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Error:', error);
  }, [error]);
  
  return <div>Something went wrong</div>;
}
```

---

## Resources

- [Next.js Architecture](https://nextjs.org/docs/architecture)
- [Supabase Documentation](https://supabase.com/docs)
- [Zustand Guide](https://zustand-demo.pmnd.rs/)
- [React Server Components](https://react.dev/reference/react/use-server)

---

**Last Updated:** February 17, 2026  
**Version:** 1.0.0
