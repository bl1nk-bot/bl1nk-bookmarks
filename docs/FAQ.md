# ❓ FAQ - Frequently Asked Questions

> คำถามที่พบบ่อยเกี่ยวกับ bl1nk-bookmarks

---

## 📋 สารบัญ

1. [ทั่วไป](#ทั่วไป)
2. [การติดตั้ง](#การติดตั้ง)
3. [การใช้งาน](#การใช้งาน)
4. [เทคนิค](#เทคนิค)
5. [การแก้ปัญหา](#การแก้ปัญหา)

---

## ทั่วไป

### Q: bl1nk-bookmarks คืออะไร?

**A:** bl1nk-bookmarks เป็นแอปพลิเคชันจัดการบุ๊กมาร์กที่ทันสมัย ช่วยให้คุณจัดเก็บ จัดหมวดหมู่ และค้นหาบุ๊กมาร์กได้อย่างมีประสิทธิภาพ ด้วย UI/UX ที่สวยงามและใช้งานง่าย

### Q: ใช้งานฟรีไหม?

**A:** ใช่! โปรเจกต์นี้เป็น Open Source และใช้งานฟรีภายใต้ MIT License

### Q: ข้อมูลของฉันปลอดภัยไหม?

**A:** ใช่! ข้อมูลทั้งหมดถูกเก็บใน Supabase ซึ่งมีระบบความปลอดภัยระดับสูง รวมถึง Row Level Security ที่確保ว่าแต่ละผู้ใช้เข้าถึงได้เฉพาะข้อมูลของตัวเอง

### Q: มี Mobile App ไหม?

**A:** ปัจจุบันเป็น Web Application ที่รองรับ Responsive Design ใช้งานได้ดีทั้งบน Mobile, Tablet และ Desktop

---

## การติดตั้ง

### Q: ความต้องการของระบบคืออะไร?

**A:** 
- Node.js 18+
- npm / pnpm / yarn
- Supabase Account (ฟรี)
- Web Browser (Chrome, Firefox, Safari, Edge)

### Q: ติดตั้งอย่างไร?

**A:**
```bash
# 1. Clone
git clone https://github.com/bl1nk-bot/bl1nk-bookmarks.git
cd bl1nk-bookmarks

# 2. Install
npm install

# 3. Setup Environment
cp .env.example .env.local
# แก้ไข .env.local ให้ตรงกับ Supabase project

# 4. Run
npm run dev
```

### Q: ต้องมี Supabase ไหม?

**A:** ใช่! คุณต้องมี Supabase project สำหรับเก็บข้อมูล ดูวิธีตั้งค่าได้ที่ [Getting Started Guide](./GETTING-STARTED.md)

### Q: ได้ Error "Supabase not configured" ต้องทำอย่างไร?

**A:** 
1. ตรวจสอบว่า `.env.local` มีค่าครบถ้วน
2. ตรวจสอบว่า Supabase URL และ Key ถูกต้อง
3. ลอง restart development server

```env
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Q: ใช้ Database อะไร?

**A:** ใช้ PostgreSQL ผ่าน Supabase ซึ่งเป็น Managed Database Service

---

## การใช้งาน

### Q: วิธีสร้างบุ๊กมาร์กแรก?

**A:**
1. Login เข้าระบบ
2. ไปที่หน้า Dashboard
3. คลิก "+ Add Bookmark"
4. วาง URL ที่ต้องการ
5. เลือก Collection (ถ้ามี)
6. คลิก "Save"

### Q: วิธีสร้าง Collection?

**A:**
1. ไปที่หน้า Collections
2. คลิก "+ New Collection"
3. ตั้งชื่อและคำอธิบาย
4. เลือกไอคอนและสี
5. คลิก "Save"

### Q: วิธีค้นหาบุ๊กมาร์ก?

**A:**
1. ไปที่หน้า Search
2. พิมพ์คำค้นหาในช่อง Search
3. ใช้ Filter เพื่อกรองผลลัพธ์
4. คลิกที่บุ๊กมาร์กเพื่อดูรายละเอียด

### Q: วิธีเปลี่ยน Light/Dark Mode?

**A:**
คลิกที่ไอคอน Moon/Sun ที่มุมขวาบนของหน้าจอ

### Q: วิธีแก้ไขบุ๊กมาร์ก?

**A:**
1. Hover เหนือบุ๊กมาร์กที่ต้องการแก้ไข
2. คลิกไอคอน Edit (ดินสอ)
3. แก้ไขข้อมูล
4. คลิก "Save"

### Q: วิธีลบบุ๊กมาร์ก?

**A:**
1. Hover เหนือบุ๊กมาร์กที่ต้องการลบ
2. คลิกไอคอน Delete (ถังขยะ)
3. ยืนยันการลบ

---

## เทคนิค

### Q: ใช้ Stack อะไร?

**A:**
- **Frontend:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS v4, shadcn/ui
- **State:** Zustand, React Hook Form
- **Backend:** Supabase (PostgreSQL)
- **Icons:** Lucide Icons

### Q: มี API ไหม?

**A:** มี! ใช้ Next.js API Routes และ Supabase Client

### Q: วิธี Deploy ขึ้น Production?

**A:**
1. Push code ขึ้น GitHub
2. ไปที่ Vercel
3. Import repository
4. ตั้งค่า Environment Variables
5. Deploy!

ดูคู่มือเต็มได้ที่ [Development Guide](./DEVELOPMENT.md)

### Q: วิธี Contribute?

**A:**
1. Fork repository
2. สร้าง Feature Branch
3. Commit การเปลี่ยนแปลง
4. Push และสร้าง Pull Request

ดูรายละเอียดที่ [Contributing Guidelines](../.github/CONTRIBUTING.md)

### Q: มี TypeScript Types ไหม?

**A:** ใช่! โปรเจกต์เขียนด้วย TypeScript 100% พร้อม Type Definitions ครบถ้วน

---

## การแก้ปัญหา

### Q: Login ไม่ได้ ต้องทำอย่างไร?

**A:**
**ตรวจสอบ:**
- Email และ Password ถูกต้อง
- Email confirmation (ถ้าเปิดใช้งาน)
- Supabase credentials ถูกต้อง

**วิธีแก้:**
```bash
# 1. ตรวจสอบ .env.local
cat .env.local

# 2. ลอง Clear cache
rm -rf .next
npm run dev

# 3. ลอง Reset Password
```

### Q: ข้อมูลไม่แสดง?

**A:**
**ตรวจสอบ:**
- Database schema ถูกต้อง
- Row Level Security policies
- Console errors ในเบราว์เซอร์

**วิธีแก้:**
```sql
-- ตรวจสอบตาราง
SELECT * FROM bookmarks LIMIT 10;

-- ตรวจสอบ RLS policies
SELECT * FROM pg_policies WHERE tablename = 'bookmarks';
```

### Q: UI ไม่สวยงาม?

**A:**
**วิธีแก้:**
```bash
# 1. ลบ .next folder
rm -rf .next

# 2. Install ใหม่
npm install

# 3. Run ใหม่
npm run dev
```

### Q: Build Error?

**A:**
```bash
# ตรวจสอบ TypeScript errors
npx tsc --noEmit

# ตรวจสอบ ESLint errors
npm run lint

# ลอง Clean Build
rm -rf .next node_modules
npm install
npm run build
```

### Q: Supabase Connection Error?

**A:**
**ตรวจสอบ:**
1. Supabase project ยัง active
2. URL และ Key ถูกต้อง
3. Network connection

**วิธีแก้:**
```bash
# ทดสอบ connection
curl https://your-project.supabase.co/rest/v1/ \
  -H "apikey: your-anon-key" \
  -H "Authorization: Bearer your-anon-key"
```

### Q: Tailwind CSS ไม่ทำงาน?

**A:**
**ตรวจสอบ:**
- `tailwind.config.ts` มีอยู่
- `globals.css` มี `@tailwind` directives
- Browser cache

**วิธีแก้:**
```bash
# Clear cache
rm -rf .next node_modules/.cache

# Rebuild
npm run build
```

### Q: Component ไม่แสดงใน Dark Mode?

**A:**
**ตรวจสอบ:**
- ใช้ `dark:` prefix ครบถ้วน
- สีมี contrast เพียงพอ
- Theme provider ทำงาน

**วิธีแก้:**
```tsx
// ✅ Good
<div className="bg-white dark:bg-slate-900">
  <p className="text-slate-900 dark:text-slate-100">
    Text
  </p>
</div>

// ❌ Bad
<div className="bg-white">
  <p className="text-slate-900">
    Text (will be invisible in dark mode)
  </p>
</div>
```

### Q: Responsive ไม่ทำงาน?

**A:**
**ตรวจสอบ:**
- ใช้ Tailwind breakpoints ถูกต้อง
- ทดสอบใน Browser DevTools
- ไม่มี fixed width

**วิธีแก้:**
```tsx
// ✅ Good - Responsive
<div className="w-full sm:w-1/2 lg:w-1/3">

// ❌ Bad - Fixed width
<div className="w-96">
```

### Q: Performance ช้า?

**A:**
**วิธีแก้:**
1. ใช้ Server Components
2. Lazy load components
3. Optimize images
4. ใช้ Pagination

```tsx
// Server Component
export default async function Page() {
  const data = await fetchData();
  return <Component data={data} />;
}

// Lazy Loading
const Chart = dynamic(() => import('./chart'), {
  loading: () => <Skeleton />
});
```

---

## ยังไม่ได้คำตอบ?

### ช่องทางติดต่อ

- 📖 อ่าน [Documentation](./README.md)
- 💬 สร้าง [GitHub Issue](https://github.com/bl1nk-bot/bl1nk-bookmarks/issues)
- 📧 ติดต่อทีมพัฒนา

### Resources

- [Getting Started](./GETTING-STARTED.md)
- [Development Guide](./DEVELOPMENT.md)
- [Architecture](./ARCHITECTURE.md)
- [UI Components](./UI-COMPONENTS.md)

---

**Last Updated:** February 17, 2026

**ยังหาคำตอบไม่ได้? สร้าง Issue ได้เลย! 🚀**
