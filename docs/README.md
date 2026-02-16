# 📚 bl1nk-bookmarks Documentation

> คู่มือการใช้งานและการพัฒนา bl1nk-bookmarks แบบครบถ้วน

---

## 📖 สารบัญเอกสาร

### สำหรับผู้ใช้
1. [Getting Started](./GETTING-STARTED.md) - เริ่มต้นใช้งาน
2. [User Guide](./USER-GUIDE.md) - คู่มือการใช้งาน
3. [FAQ](./FAQ.md) - คำถามที่พบบ่อย

### สำหรับนักพัฒนา
4. [Development Guide](./DEVELOPMENT.md) - คู่มือการพัฒนา
5. [Architecture](./ARCHITECTURE.md) - สถาปัตยกรรมระบบ
6. [API Reference](./API.md) - API Documentation
7. [Database Schema](./DATABASE.md) - ฐานข้อมูล

### Design & UI/UX
8. [Design System](./design-system/bl1nk-bookmarks/MASTER.md) - ระบบการออกแบบ
9. [UI Components](./UI-COMPONENTS.md) - ส่วนประกอบ UI
10. [Accessibility Guide](./ACCESSIBILITY.md) - การเข้าถึง

---

## 📋 ด่วน

### 🚀 เริ่มต้นใช้งานอย่างรวดเร็ว

```bash
# 1. Clone
git clone https://github.com/bl1nk-bot/bl1nk-bookmarks.git
cd bl1nk-bookmarks

# 2. Install
npm install

# 3. Setup Environment
cp .env.example .env.local
# แก้ไข .env.local ให้ตรงกับ Supabase project ของคุณ

# 4. Run
npm run dev
```

### 🎨 Design System Quick Reference

#### Colors
```tsx
// Light Mode
bg-indigo-50      // Background
text-slate-900    // Text
bg-indigo-500     // Primary
bg-emerald-500    // CTA

// Dark Mode
bg-slate-950      // Background
text-slate-50     // Text
bg-indigo-400     // Primary
bg-green-500      // CTA
```

#### Glassmorphism Component
```tsx
<div className="
  bg-white/70 dark:bg-slate-900/70 
  backdrop-blur-lg
  border border-white/50 dark:border-white/10
  rounded-xl p-6
  hover:shadow-xl hover:-translate-y-1
  transition-all duration-200
">
  {/* Your content */}
</div>
```

### 📱 Responsive Breakpoints

| Breakpoint | Min Width | Device |
|------------|-----------|--------|
| `sm` | 640px | Mobile Landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Laptop |
| `xl` | 1280px | Desktop |
| `2xl` | 1400px | Large Desktop |

---

## 🔗 ลิงก์เอกสาร

### เอกสารหลัก
- [README](../README.md) - ภาพรวมโปรเจกต์
- [Design System](./design-system/bl1nk-bookmarks/MASTER.md) - UI/UX Guidelines
- [UI-UX Proposal](./design-system/bl1nk-bookmarks/UI-UX-REDESIGN-PROPOSAL.md) - การออกแบบใหม่

### GitHub
- [Repository](https://github.com/bl1nk-bot/bl1nk-bookmarks)
- [Issues](https://github.com/bl1nk-bot/bl1nk-bookmarks/issues)
- [Pull Requests](https://github.com/bl1nk-bot/bl1nk-bookmarks/pulls)

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 📞 การสนับสนุน

### สำหรับผู้ใช้
- 📖 อ่าน [User Guide](./USER-GUIDE.md)
- ❓ ดู [FAQ](./FAQ.md)
- 💬 สร้าง Issue ใน GitHub

### สำหรับนักพัฒนา
- 🏗️ ศึกษา [Architecture](./ARCHITECTURE.md)
- 🛠️ อ่าน [Development Guide](./DEVELOPMENT.md)
- 🎨 ดู [Design System](./design-system/bl1nk-bookmarks/MASTER.md)

---

## 📝 Last Updated

**เอกสารนี้อัพปเดตล่าสุด:** 17 กุมภาพันธ์ 2026  
**เวอร์ชัน:** 1.0.0  
**สถานะ:** ✅ ทันสมัยกับ UI/UX ใหม่

---

**Happy Coding! 🚀**
