# 🚀 Getting Started with bl1nk-bookmarks

> คู่มือเริ่มต้นใช้งาน bl1nk-bookmarks สำหรับผู้ใช้ใหม่

---

## 📋 สารบัญ

1. [สิ่งที่ต้องมี](#สิ่งที่ต้องมี)
2. [การติดตั้ง](#การติดตั้ง)
3. [การตั้งค่า](#การตั้งค่า)
4. [การใช้งานครั้งแรก](#การใช้งานครั้งแรก)
5. [ขั้นตอนถัดไป](#ขั้นตอนถัดไป)

---

## สิ่งที่ต้องมี

### ความต้องการของระบบ
- ✅ **Node.js** เวอร์ชัน 18 หรือใหม่กว่า
- ✅ **npm** / **pnpm** / **yarn**
- ✅ **Supabase Account** (สมัครฟรีที่ [supabase.com](https://supabase.com))
- ✅ **Web Browser** (Chrome, Firefox, Safari, Edge)

### ความรู้เบื้องต้น
- ความรู้พื้นฐานเกี่ยวกับ Command Line
- ความเข้าใจเกี่ยวกับ Git (พื้นฐาน)

---

## การติดตั้ง

### ขั้นตอนที่ 1: Clone Repository

```bash
git clone https://github.com/bl1nk-bot/bl1nk-bookmarks.git
cd bl1nk-bookmarks
```

### ขั้นตอนที่ 2: ติดตั้ง Dependencies

เลือก package manager ที่คุณถนัด:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

### ขั้นตอนที่ 3: ตั้งค่า Environment Variables

1. คัดลอกไฟล์ template:

```bash
cp .env.example .env.local
```

2. เปิดไฟล์ `.env.local` และแก้ไข:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Application (Optional)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 📖 วิธีรับ Supabase Credentials

1. ไปที่ [Supabase Dashboard](https://app.supabase.com)
2. เลือก Project ของคุณ (หรือสร้างใหม่)
3. ไปที่ **Settings** → **API**
4. คัดลอกค่า:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## การตั้งค่า

### สร้าง Database Schema

หากคุณใช้ Supabase เป็นครั้งแรก คุณต้องสร้างตารางในฐานข้อมูล:

1. ไปที่ **Supabase Dashboard** → **SQL Editor**
2. รัน SQL Script จากไฟล์ `supabase/schema.sql` (ถ้ามี)
3. หรือใช้ Supabase UI เพื่อสร้างตาราง:

#### ตารางที่จำเป็น:

**collections**
```sql
CREATE TABLE collections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  template_type TEXT DEFAULT 'default',
  color TEXT DEFAULT '#6366F1',
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**bookmarks**
```sql
CREATE TABLE bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  collection_id UUID REFERENCES collections(id),
  url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  thumbnail_url TEXT,
  favicon_url TEXT,
  custom_fields JSONB DEFAULT '{}',
  search_vector TSVECTOR,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**tags**
```sql
CREATE TABLE tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  color TEXT DEFAULT '#6366F1',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**bookmark_tags**
```sql
CREATE TABLE bookmark_tags (
  bookmark_id UUID REFERENCES bookmarks(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (bookmark_id, tag_id)
);
```

---

## การใช้งานครั้งแรก

### 1. รัน Development Server

```bash
npm run dev
```

เปิดเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

### 2. สร้างบัญชีผู้ใช้

1. คลิก **Sign Up** ที่หน้า Login
2. กรอก Email และ Password
3. ยืนยัน Email (ถ้าเปิดใช้งาน)
4. Login ด้วยบัญชีของคุณ

### 3. สร้าง Collection แรก

1. ไปที่หน้า **Collections**
2. คลิก **+ New Collection**
3. ตั้งชื่อและคำอธิบาย
4. เลือกไอคอนและสี
5. บันทึก

### 4. เพิ่ม Bookmark แรก

1. ไปที่หน้า **Dashboard**
2. คลิก **+ Add Bookmark**
3. วาง URL
4. เลือก Collection
5. เพิ่ม Tags (ถ้าต้องการ)
6. บันทึก

---

## 🎨 การใช้งาน UI

### Light/Dark Mode Toggle

- คลิกที่ไอคอน **Moon/Sun** ที่มุมขวาบน
- หรือใช้คีย์ลัด (ถ้ามี)

### Keyboard Shortcuts

| คีย์ลัด | คำอธิบาย |
|---------|----------|
| `Ctrl/Cmd + K` | เปิด Search |
| `Ctrl/Cmd + N` | Bookmark ใหม่ |
| `Esc` | ปิด Modal |
| `?` | ดู Keyboard Shortcuts |

### Navigation

- **Sidebar** - เมนูหลักด้านซ้าย
- **Top Bar** - Search และ User Menu
- **Breadcrumbs** - ตำแหน่งปัจจุบัน

---

## 🎯 ฟีเจอร์หลัก

### 1. Dashboard
- แสดงบุ๊กมาร์กล่าสุด
- Quick stats
- Recent collections

### 2. Collections
- จัดกลุ่มบุ๊กมาร์ก
- Gradient cards
- Drag & drop (ถ้ามี)

### 3. Search
- Full-text search
- Filter by tags/collections
- Sort options

### 4. Tags
- เพิ่มแท็กได้ไม่จำกัด
- สีแท็กที่กำหนดเอง
- แท็กแนะนำ

---

## ❓ การแก้ปัญหา

### ปัญหา: ไม่สามารถ Login ได้

**วิธีแก้:**
1. ตรวจสอบว่า Supabase credentials ถูกต้อง
2. ตรวจสอบว่า Email confirmation เปิดใช้งาน
3. ลอง Reset Password

### ปัญหา: ข้อมูลไม่แสดง

**วิธีแก้:**
1. ตรวจสอบ Database schema
2. ตรวจสอบ Row Level Security policies
3. ดู Console errors ในเบราว์เซอร์

### ปัญหา: UI ไม่สวยงาม

**วิธีแก้:**
1. ลบ `.next` folder
2. รัน `npm install` อีกครั้ง
3. รัน `npm run dev` ใหม่

---

## 📱 Responsive Usage

### Mobile
- Hamburger menu
- Touch-friendly buttons
- Swipe gestures

### Tablet
- Adaptive layout
- Split view

### Desktop
- Full sidebar
- Multi-column grids
- Keyboard shortcuts

---

## 🎓 ขั้นตอนถัดไป

### สำหรับผู้ใช้
1. อ่าน [User Guide](./USER-GUIDE.md) - คู่มือการใช้งานแบบละเอียด
2. ดู [FAQ](./FAQ.md) - คำถามที่พบบ่อย
3. สำรวจฟีเจอร์ทั้งหมด

### สำหรับนักพัฒนา
1. อ่าน [Development Guide](./DEVELOPMENT.md) - คู่มือการพัฒนา
2. ศึกษา [Architecture](./ARCHITECTURE.md) - สถาปัตยกรรมระบบ
3. ดู [Design System](./design-system/bl1nk-bookmarks/MASTER.md) - UI/UX guidelines

---

## 📞 ต้องการความช่วยเหลือ?

- 📖 อ่าน [Documentation](./README.md)
- 💬 สร้าง [GitHub Issue](https://github.com/bl1nk-bot/bl1nk-bookmarks/issues)
- 📧 ติดต่อทีมพัฒนา

---

**พร้อมแล้ว! เริ่มจัดการบุ๊กมาร์กของคุณได้เลย 🚀**
