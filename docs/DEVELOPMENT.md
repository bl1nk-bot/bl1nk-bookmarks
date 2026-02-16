# 🛠️ Development Guide

> คู่มือการพัฒนา bl1nk-bookmarks สำหรับนักพัฒนา

---

## 📋 สารบัญ

1. [ความ prerequisites](#ความ-prerequisites)
2. [การตั้งค่า Development Environment](#การตั้งค่า-development-environment)
3. [Project Structure](#project-structure)
4. [Coding Standards](#coding-standards)
5. [Component Development](#component-development)
6. [Testing](#testing)
7. [Debugging](#debugging)
8. [Deployment](#deployment)

---

## ความ Prerequisites

### ซอฟต์แวร์ที่ต้องมี
- ✅ **Node.js** 18+ (แนะนำ 20+)
- ✅ **npm** 9+ หรือ **pnpm** 8+
- ✅ **Git** 2.0+
- ✅ **VS Code** (แนะนำ) หรือ Code Editor อื่นๆ

### VS Code Extensions (แนะนำ)
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript
- Next.js

---

## การตั้งค่า Development Environment

### 1. Clone และ ติดตั้ง

```bash
# Clone repository
git clone https://github.com/bl1nk-bot/bl1nk-bookmarks.git
cd bl1nk-bookmarks

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local
```

### 2. ตั้งค่า Environment

แก้ไข `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. รัน Development Server

```bash
npm run dev
```

เปิด [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
bl1nk-bookmarks/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/              # Authentication Routes
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── signup/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/         # Protected Routes
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── collections/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   └── search/
│   │   │       └── page.tsx
│   │   ├── api/                 # API Routes
│   │   │   └── metadata/
│   │   │       └── route.ts
│   │   ├── auth/
│   │   │   └── callback/
│   │   │       └── route.ts
│   │   ├── globals.css          # Global Styles
│   │   ├── layout.tsx           # Root Layout
│   │   └── page.tsx             # Home Page
│   │
│   ├── components/
│   │   ├── ui/                  # shadcn Components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   ├── layout/              # Layout Components
│   │   │   ├── sidebar.tsx
│   │   │   ├── header.tsx
│   │   │   └── ...
│   │   ├── bookmarks/           # Bookmark Components
│   │   │   ├── bookmark-card.tsx
│   │   │   ├── bookmark-list.tsx
│   │   │   └── ...
│   │   ├── collections/         # Collection Components
│   │   │   └── ...
│   │   └── providers/           # Context Providers
│   │       └── theme-provider.tsx
│   │
│   ├── hooks/                   # Custom Hooks
│   │   ├── use-bookmarks.ts
│   │   ├── use-collections.ts
│   │   └── use-auth.ts
│   │
│   └── lib/                     # Utilities
│       ├── types/               # TypeScript Types
│       │   ├── database.types.ts
│       │   └── index.ts
│       ├── store/               # Zustand Stores
│       │   ├── auth.ts
│       │   ├── bookmarks.ts
│       │   └── collections.ts
│       ├── supabase/            # Supabase Client
│       │   ├── client.ts
│       │   └── server.ts
│       └── utils.ts
│
├── docs/                        # Documentation
├── design-system/               # Design System
├── public/                      # Static Assets
└── ...
```

---

## Coding Standards

### TypeScript

```tsx
// ✅ Good - Type annotations
interface Bookmark {
  id: string;
  url: string;
  title: string | null;
  createdAt: Date;
}

const fetchBookmark = async (id: string): Promise<Bookmark> => {
  // Implementation
};

// ❌ Bad - Any type
const fetchBookmark = async (id: any): Promise<any> => {
  // Implementation
};
```

### Component Structure

```tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface BookmarkCardProps {
  id: string;
  title: string;
  url: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function BookmarkCard({ 
  id, 
  title, 
  url,
  onEdit,
  onDelete 
}: BookmarkCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => {
    setIsLoading(true);
    onEdit?.(id);
    setIsLoading(false);
  };

  return (
    <div className="
      bg-white/70 dark:bg-slate-900/70 
      backdrop-blur-lg
      rounded-xl p-4
      hover:shadow-xl hover:-translate-y-1
      transition-all duration-200
    ">
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-400">{url}</p>
      
      <div className="flex gap-2 mt-4">
        <Button 
          onClick={handleEdit}
          disabled={isLoading}
          variant="secondary"
        >
          Edit
        </Button>
        <Button 
          onClick={() => onDelete?.(id)}
          variant="destructive"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
```

### Naming Conventions

```tsx
// Files & Folders
// ✅ PascalCase for components: BookmarkCard.tsx
// ✅ kebab-case for routes: /dashboard/page.tsx
// ✅ camelCase for utilities: utils.ts

// Variables & Functions
// ✅ camelCase: const bookmarkData = {}
// ✅ PascalCase: interface BookmarkCardProps
// ✅ UPPER_CASE: const MAX_BOOKMARKS = 100

// CSS Classes
// ✅ Use Tailwind utilities
// ✅ Custom classes in globals.css with BEM
```

---

## Component Development

### Creating New Components

1. **สร้างไฟล์ใหม่** ใน `src/components/`

```tsx
// src/components/bookmarks/bookmark-form.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const bookmarkSchema = z.object({
  url: z.string().url('Invalid URL'),
  title: z.string().optional(),
  description: z.string().optional(),
});

type BookmarkFormData = z.infer<typeof bookmarkSchema>;

interface BookmarkFormProps {
  onSubmit?: (data: BookmarkFormData) => void;
}

export function BookmarkForm({ onSubmit }: BookmarkFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<BookmarkFormData>({
    resolver: zodResolver(bookmarkSchema),
  });

  const handleFormSubmit = (data: BookmarkFormData) => {
    onSubmit?.(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <Input 
          {...register('url')}
          placeholder="https://example.com"
          label="URL"
        />
        {errors.url && (
          <p className="text-sm text-red-500">{errors.url.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Add Bookmark
      </Button>
    </form>
  );
}
```

2. **Export** จาก `index.ts` (ถ้ามี)

```tsx
// src/components/bookmarks/index.ts
export { BookmarkCard } from './bookmark-card';
export { BookmarkList } from './bookmark-list';
export { BookmarkForm } from './bookmark-form';
```

### Design System Compliance

ปฏิบัติตาม [Design System](./design-system/bl1nk-bookmarks/MASTER.md):

```tsx
// ✅ Good - Follows design system
<div className="
  bg-white/70 dark:bg-slate-900/70 
  backdrop-blur-lg
  border border-white/50 dark:border-white/10
  rounded-xl p-6
  shadow-md hover:shadow-xl
  transition-all duration-200 
  hover:-translate-y-1
  cursor-pointer
">

// ❌ Bad - Doesn't follow design system
<div className="bg-gray-100 p-4 rounded border">
```

---

## Testing

### Manual Testing Checklist

ก่อน commit ทุกครั้ง:

- [ ] ทดสอบ Light Mode
- [ ] ทดสอบ Dark Mode
- [ ] ทดสอบ Responsive (Mobile, Tablet, Desktop)
- [ ] ทดสอบ Keyboard Navigation
- [ ] ทดสอบ Form Validation
- [ ] ทดสอบ Error States
- [ ] ทดสอบ Loading States

### Browser Testing

```bash
# Chrome
npm run dev
# Open http://localhost:3000

# Firefox
npm run dev
# Open http://localhost:3000

# Safari
npm run dev
# Open http://localhost:3000
```

### DevTools Testing

1. **Responsive Design Mode**
   - Chrome: `Ctrl+Shift+M` / `Cmd+Shift+M`
   - ทดสอบที่ 375px, 768px, 1024px, 1440px

2. **Dark Mode**
   - Chrome DevTools → Rendering → Emulate CSS prefers-color-scheme

3. **Performance**
   - Chrome DevTools → Lighthouse
   - Target: 90+ ทั้งหมด

---

## Debugging

### Common Issues

#### 1. Supabase Connection Error

```tsx
// Check if Supabase is configured
import { createClient } from '@/lib/supabase/client';

const supabase = createClient();
if (!supabase) {
  console.error('Supabase not configured!');
}
```

#### 2. Type Errors

```bash
# Check TypeScript errors
npx tsc --noEmit

# Watch mode
npx tsc --noEmit --watch
```

#### 3. ESLint Errors

```bash
# Check linting
npm run lint

# Auto-fix
npm run lint -- --fix
```

### Debug Tools

```tsx
// Debug state changes
import { useEffect } from 'react';

useEffect(() => {
  console.log('State changed:', { bookmarks, collections });
}, [bookmarks, collections]);

// Debug renders
const renderCount = useRef(0);
useEffect(() => {
  renderCount.current += 1;
  console.log('Component rendered:', renderCount.current);
});
```

---

## Deployment

### Build for Production

```bash
# Build
npm run build

# Preview build locally
npm run start
```

### Deploy to Vercel

1. **Push to GitHub**

```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

2. **Connect to Vercel**
   - ไปที่ [Vercel Dashboard](https://vercel.com)
   - Import repository
   - ตั้งค่า Environment Variables
   - Deploy!

3. **Environment Variables on Vercel**

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Post-Deployment Checklist

- [ ] ทดสอบ Production URL
- [ ] ตรวจสอบ Environment Variables
- [ ] ทดสอบ Authentication
- [ ] ทดสอบ Database Connections
- [ ] ตรวจสอบ Error Logs

---

## Git Workflow

### Branch Naming

```bash
# Features
git checkout -b feature/add-bookmark-tags

# Bug Fixes
git checkout -b fix/login-error-handling

# Documentation
git checkout -b docs/update-readme

# Refactoring
git checkout -b refactor/component-structure
```

### Commit Messages

```bash
# Format: type(scope): description

feat(bookmarks): add tagging system
fix(auth): resolve session timeout issue
docs(readme): update installation guide
refactor(components): improve component structure
test(ui): add component tests
```

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Tested in browser
- [ ] Tested responsive

## Checklist
- [ ] Code follows style guidelines
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Documentation updated
```

---

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/docs)
- [Supabase](https://supabase.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)

### Design System
- [Design System Master](./design-system/bl1nk-bookmarks/MASTER.md)
- [UI-UX Proposal](./design-system/bl1nk-bookmarks/UI-UX-REDESIGN-PROPOSAL.md)

### Tools
- [VS Code](https://code.visualstudio.com/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Git](https://git-scm.com/docs)

---

**Happy Coding! 🚀**
