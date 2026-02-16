# 🚀 bl1nk-bookmarks

> **Modern Bookmark Manager with Beautiful UI/UX**  
> จัดการบุ๊กมาร์กของคุณอย่างมีประสิทธิภาพ ด้วยอินเทอร์เฟซที่ทันสมัย รองรับทั้ง Light และ Dark Mode

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Latest-3ECF8E?logo=supabase)

---

## 📋 สารบัญ

- [คุณสมบัติ](#คุณสมบัติ)
- [เทคโนโลยีที่ใช้](#เทคโนโลยีที่ใช้)
- [เริ่มต้นใช้งาน](#เริ่มต้นใช้งาน)
- [โครงสร้างโปรเจกต์](#โครงสร้างโปรเจกต์)
- [Design System](#design-system)
- [คุณสมบัติหลัก](#คุณสมบัติหลัก)
- [การ Deploy](#การ-deploy)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ คุณสมบัติ

### 🎨 UI/UX ทันสมัย
- **Glassmorphism Design** - ดีไซน์กระจกเบลอที่ทันสมัยและมีระดับ
- **Light & Dark Mode** - รองรับทั้งสองโหมด พร้อมการเปลี่ยนอย่างลื่นไหล
- **Responsive Design** - ใช้งานได้ดีทุกอุปกรณ์ (Mobile, Tablet, Desktop)
- **Smooth Animations** - การเคลื่อนไหวที่ลื่นไหล ไม่กระตุก

### 📑 การจัดการ Bookmark
- **Organize by Collections** - จัดกลุ่มบุ๊กมาร์กเป็นหมวดหมู่
- **Tagging System** - เพิ่มแท็กเพื่อค้นหาได้ง่าย
- **Full-text Search** - ค้นหาบุ๊กมาร์กอย่างรวดเร็ว
- **Rich Previews** - แสดงตัวอย่างลิงก์พร้อมรูปภาพ

### 🔒 ความปลอดภัย
- **Authentication** - ระบบยืนยันตัวตนที่ปลอดภัย
- **User Isolation** - ข้อมูลของแต่ละผู้ใช้แยกจากกัน
- **Supabase Backend** - ฐานข้อมูลที่ปลอดภัยและน่าเชื่อถือ

---

## 🛠 เทคโนโลยีที่ใช้

### Frontend
| Technology | Version | Description |
|------------|---------|-------------|
| [Next.js](https://nextjs.org/) | 16.1.6 | React Framework |
| [TypeScript](https://www.typescriptlang.org/) | 5.0 | Type Safety |
| [Tailwind CSS](https://tailwindcss.com/) | 4.0 | Utility-first CSS |
| [shadcn/ui](https://ui.shadcn.com/) | Latest | UI Components |
| [Lucide Icons](https://lucide.dev/) | Latest | Icon Library |

### State Management & Forms
| Technology | Version | Description |
|------------|---------|-------------|
| [Zustand](https://zustand-demo.pmnd.rs/) | 5.0.11 | State Management |
| [React Hook Form](https://react-hook-form.com/) | 7.71.1 | Form Handling |
| [Zod](https://zod.dev/) | 4.3.6 | Schema Validation |

### Backend & Database
| Technology | Version | Description |
|------------|---------|-------------|
| [Supabase](https://supabase.com/) | 2.95.3 | Backend as a Service |
| [PostgreSQL](https://www.postgresql.org/) | Latest | Database |

### Utilities
| Technology | Version | Description |
|------------|---------|-------------|
| [date-fns](https://date-fns.org/) | 4.1.0 | Date Manipulation |
| [clsx](https://github.com/lukeed/clsx) | 2.1.1 | Conditional Classes |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | 3.4.1 | Merge Tailwind Classes |

---

## 🚀 เริ่มต้นใช้งาน

### ความต้องการของระบบ
- Node.js 18+ 
- npm / pnpm / yarn
- Supabase Account (สำหรับ backend)

### 1. Clone Repository

```bash
git clone https://github.com/bl1nk-bot/bl1nk-bookmarks.git
cd bl1nk-bookmarks
```

### 2. ติดตั้ง Dependencies

```bash
npm install
# หรือ
pnpm install
# หรือ
yarn install
```

### 3. ตั้งค่า Environment Variables

คัดลอกไฟล์ `.env.example` และแก้ไขค่า:

```bash
cp .env.example .env.local
```

แก้ไข `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Application Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. รัน Development Server

```bash
npm run dev
# หรือ
pnpm dev
# หรือ
yarn dev
```

เปิด [http://localhost:3000](http://localhost:3000) ในเบราว์เซอร์

---

## 📁 โครงสร้างโปรเจกต์

```
bl1nk-bookmarks/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication Pages
│   │   │   ├── login/
│   │   │   └── signup/
│   │   ├── (dashboard)/       # Dashboard Pages
│   │   │   ├── dashboard/
│   │   │   ├── collections/
│   │   │   └── search/
│   │   ├── api/               # API Routes
│   │   ├── auth/              # Auth Callback
│   │   ├── globals.css        # Global Styles
│   │   ├── layout.tsx         # Root Layout
│   │   └── page.tsx           # Home Page
│   ├── components/
│   │   ├── ui/                # shadcn UI Components
│   │   ├── layout/            # Layout Components (Sidebar, Header)
│   │   ├── bookmarks/         # Bookmark Components
│   │   ├── collections/       # Collection Components
│   │   └── providers/         # Context Providers
│   ├── hooks/                 # Custom Hooks
│   │   ├── use-bookmarks.ts
│   │   ├── use-collections.ts
│   │   └── use-auth.ts
│   ├── lib/                   # Utilities & Types
│   │   ├── types/             # TypeScript Types
│   │   ├── store/             # Zustand Stores
│   │   ├── supabase/          # Supabase Client
│   │   └── utils.ts
│   └── middleware.ts          # Next.js Middleware
├── docs/                      # Documentation
│   └── design-system/         # Design System Docs
├── public/                    # Static Assets
├── design-system/             # UI/UX Design System
│   └── bl1nk-bookmarks/
├── .env.example              # Environment Template
├── components.json           # shadcn/ui Config
├── tailwind.config.ts        # Tailwind Configuration
├── tsconfig.json             # TypeScript Configuration
└── package.json              # Dependencies
```

---

## 🎨 Design System

เอกสาร Design System ครบถ้วนอยู่ใน:
- **Design System Master**: [`docs/design-system/bl1nk-bookmarks/MASTER.md`](docs/design-system/bl1nk-bookmarks/MASTER.md)
- **UI/UX Redesign Proposal**: [`docs/design-system/bl1nk-bookmarks/UI-UX-REDESIGN-PROPOSAL.md`](docs/design-system/bl1nk-bookmarks/UI-UX-REDESIGN-PROPOSAL.md)

### Color Palette

#### Light Mode
| Color | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Background | `#F5F3FF` | `bg-indigo-50` | Page Background |
| Primary | `#6366F1` | `bg-indigo-500` | Buttons, Links |
| Secondary | `#818CF8` | `bg-indigo-400` | Hover States |
| CTA | `#10B981` | `bg-emerald-500` | Call to Action |
| Text | `#1E1B4B` | `text-slate-900` | Body Text |

#### Dark Mode
| Color | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Background | `#020617` | `bg-slate-950` | Page Background |
| Primary | `#818CF8` | `bg-indigo-400` | Buttons, Links |
| Secondary | `#1E293B` | `bg-slate-800` | Cards |
| CTA | `#22C55E` | `bg-green-500` | Call to Action |
| Text | `#F8FAFC` | `text-slate-50` | Body Text |

### Typography

```css
/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

/* Usage */
font-family: 'Inter', sans-serif;
```

| Element | Font | Weight | Size |
|---------|------|--------|------|
| H1 | Inter | 700 | 32px |
| H2 | Inter | 600 | 24px |
| H3 | Inter | 600 | 20px |
| Body | Inter | 400 | 16px |
| Small | Inter | 400 | 14px |

### Key Design Features

#### Glassmorphism
```tsx
<div className="
  bg-white/70 dark:bg-slate-900/70 
  backdrop-blur-lg
  border border-white/50 dark:border-white/10
  rounded-xl shadow-md
  hover:shadow-xl hover:-translate-y-1
  transition-all duration-200
">
  {/* Content */}
</div>
```

#### Interactive States
```tsx
<button className="
  cursor-pointer
  hover:scale-105 
  active:scale-95
  transition-transform duration-200
">
  {/* Content */}
</button>
```

---

## 🎯 คุณสมบัติหลัก

### 1. Dashboard
- แสดงบุ๊กมาร์กล่าสุด
- Quick access collections
- สถิติและการใช้งาน
- Grid Layout (3-4 columns)

### 2. Collections
- จัดกลุ่มบุ๊กมาร์กเป็นหมวดหมู่
- Gradient Cards พร้อมไอคอน
- เพิ่ม/แก้ไข/ลบ collection
- Grid Layout (2-3 columns)

### 3. Search
- Full-text search
- Filter by tags, collections
- Sort by date, title
- Responsive results grid

### 4. Authentication
- Email/Password login
- Google OAuth (พร้อมใช้งาน)
- Secure session management
- Protected routes

---

## 📦 Scripts

```bash
# Development
npm run dev          # รัน development server

# Production
npm run build        # Build สำหรับ production
npm run start        # รัน production server

# Code Quality
npm run lint         # ESLint checking
```

---

## 🚀 การ Deploy

### Deploy on Vercel

วิธีที่ง่ายที่สุดในการ deploy คือใช้ [Vercel Platform](https://vercel.com/new):

1. Push code ขึ้น GitHub
2. ไปที่ [Vercel Dashboard](https://vercel.com/new)
3. Import repository
4. ตั้งค่า Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy!

ดูคู่มือเพิ่มเติมที่ [Next.js Deployment Documentation](https://nextjs.org/docs/app/building-your-application/deploying)

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

---

## 🤝 Contributing

เรายินดีต้อนรับการมีส่วนร่วม! กรุณาอ่าน [Contributing Guidelines](.github/CONTRIBUTING.md) ก่อนเริ่ม

### การพัฒนา

1. Fork the repository
2. สร้าง Feature Branch (`git checkout -b feature/amazing-feature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add amazing feature'`)
4. Push ขึ้น Branch (`git push origin feature/amazing-feature`)
5. เปิด Pull Request

### Code Style

- ใช้ TypeScript สำหรับ type safety
- ปฏิบัติตาม ESLint rules
- เขียน tests สำหรับ features ใหม่
- รักษามาตรฐานการตั้งชื่อ

---

## 📄 License

โปรเจกต์นี้อยู่ภายใต้ [MIT License](LICENSE)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React Framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI Components
- [Supabase](https://supabase.com/) - Backend Platform
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Lucide Icons](https://lucide.dev/) - Icon Library

---

## 📞 Contact

- **Repository**: [github.com/bl1nk-bot/bl1nk-bookmarks](https://github.com/bl1nk-bot/bl1nk-bookmarks)
- **Issues**: [GitHub Issues](https://github.com/bl1nk-bot/bl1nk-bookmarks/issues)

---

**Made with ❤️ by the bl1nk team**
