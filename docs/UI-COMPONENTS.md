# 🎨 UI Components Guide

> คู่มือการใช้งาน UI Components ของ bl1nk-bookmarks

---

## 📋 สารบัญ

1. [Components ที่มีอยู่](#components-ที่มีอยู่)
2. [Button](#button)
3. [Card](#card)
4. [Input](#input)
5. [Dialog](#dialog)
6. [Dropdown Menu](#dropdown-menu)
7. [Badge](#badge)
8. [Avatar](#avatar)
9. [Tabs](#tabs)
10. [Best Practices](#best-practices)

---

## Components ที่มีอยู่

### shadcn/ui Components

โปรเจกต์ใช้ components จาก [shadcn/ui](https://ui.shadcn.com):

| Component | File | Description |
|-----------|------|-------------|
| Button | `ui/button.tsx` | ปุ่มกดต่างๆ |
| Card | `ui/card.tsx` | การ์ดแสดงผล |
| Input | `ui/input.tsx` | ช่องกรอกข้อมูล |
| Dialog | `ui/dialog.tsx` | Modal/Popup |
| Dropdown Menu | `ui/dropdown-menu.tsx` | Dropdown Menu |
| Badge | `ui/badge.tsx` | Badge/Tag |
| Avatar | `ui/avatar.tsx` | รูปโปรไฟล์ |
| Tabs | `ui/tabs.tsx` | Tab Navigation |
| Label | `ui/label.tsx` | Label สำหรับฟอร์ม |
| Select | `ui/select.tsx` | Dropdown Select |
| Separator | `ui/separator.tsx` | เส้นคั่น |
| Scroll Area | `ui/scroll-area.tsx` | Scrollable Area |
| Skeleton | `ui/skeleton.tsx` | Loading Skeleton |
| Toast | `ui/toast.tsx` | Notification |

---

## Button

### Usage

```tsx
import { Button } from '@/components/ui/button';

// Default Button
<Button>Click Me</Button>

// Variant: Primary (Indigo)
<Button variant="default">Primary</Button>

// Variant: Destructive (Red)
<Button variant="destructive">Delete</Button>

// Variant: Outline
<Button variant="outline">Outline</Button>

// Variant: Secondary
<Button variant="secondary">Secondary</Button>

// Variant: Ghost
<Button variant="ghost">Ghost</Button>

// Variant: Link
<Button variant="link">Link</Button>

// Size: Default
<Button size="default">Default</Button>

// Size: SM
<Button size="sm">Small</Button>

// Size: LG
<Button size="lg">Large</Button>

// Size: Icon
<Button size="icon" variant="ghost">
  <EditIcon className="w-4 h-4" />
</Button>

// Disabled
<Button disabled>Disabled</Button>

// Loading
<Button disabled className="animate-pulse">
  Loading...
</Button>
```

### Custom Variants (Design System)

```tsx
// Indigo Primary (Default)
<Button className="bg-indigo-500 hover:bg-indigo-600">
  Primary Action
</Button>

// Emerald CTA
<Button className="bg-emerald-500 hover:bg-emerald-600">
  Call to Action
</Button>

// Glassmorphism
<Button className="
  bg-white/10 dark:bg-slate-800/50 
  backdrop-blur-lg
  border border-white/20
  hover:bg-white/20
">
  Glass Button
</Button>
```

### With Icons

```tsx
import { Plus, Edit, Trash2 } from 'lucide-react';

// Left Icon
<Button>
  <Plus className="w-4 h-4 mr-2" />
  Add Bookmark
</Button>

// Right Icon
<Button>
  Next Page
  <ChevronRight className="w-4 h-4 ml-2" />
</Button>

// Icon Only
<Button size="icon" variant="ghost">
  <EditIcon className="w-4 h-4" />
</Button>
```

---

## Card

### Usage

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Glassmorphism Card (Design System)

```tsx
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
  <h3 className="font-semibold text-lg mb-2">
    Card Title
  </h3>
  <p className="text-slate-600 dark:text-slate-400">
    Card content with glassmorphism effect
  </p>
</div>
```

### Interactive Card

```tsx
<Card className="
  group
  hover:shadow-xl 
  hover:-translate-y-1 
  transition-all duration-200
  cursor-pointer
">
  <CardHeader>
    <CardTitle className="group-hover:text-indigo-500 transition-colors">
      Interactive Card
    </CardTitle>
  </CardHeader>
  <CardContent>
    <p>Hover over this card to see effects</p>
  </CardContent>
</Card>
```

---

## Input

### Usage

```tsx
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Basic Input
<Input placeholder="Enter text..." />

// With Label
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input 
    id="email" 
    type="email" 
    placeholder="Enter email" 
  />
</div>

// Disabled
<Input disabled placeholder="Disabled" />

// With Error
<Input 
  className="border-red-500 focus-visible:ring-red-500"
  placeholder="Invalid input"
/>
<p className="text-sm text-red-500">Error message</p>

// With Icon
<div className="relative">
  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
  <Input 
    className="pl-10"
    placeholder="Search..." 
  />
</div>
```

### Design System Input

```tsx
<Input 
  className="
    bg-white/50 dark:bg-slate-800/50 
    backdrop-blur-sm
    border-slate-300 dark:border-slate-700
    focus-visible:ring-2 focus-visible:ring-indigo-500
    focus-visible:border-transparent
    transition-all duration-200
  "
  placeholder="Search bookmarks..."
/>
```

---

## Dialog

### Usage

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Dialog description goes here
      </DialogDescription>
    </DialogHeader>
    
    <div className="py-4">
      {/* Dialog content */}
    </div>
    
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Add Bookmark Dialog

```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>
      <Plus className="w-4 h-4 mr-2" />
      Add Bookmark
    </Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[500px]">
    <DialogHeader>
      <DialogTitle>Add New Bookmark</DialogTitle>
      <DialogDescription>
        Add a new bookmark to your collection
      </DialogDescription>
    </DialogHeader>
    
    <form onSubmit={handleSubmit}>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="url">URL</Label>
          <Input 
            id="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input 
            id="title"
            placeholder="Bookmark title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button type="submit">
          Add Bookmark
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
```

---

## Dropdown Menu

### Usage

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <MoreHorizontal className="w-4 h-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <EditIcon className="w-4 h-4 mr-2" />
      Edit
    </DropdownMenuItem>
    <DropdownMenuItem>
      <CopyIcon className="w-4 h-4 mr-2" />
      Copy
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-red-600">
      <TrashIcon className="w-4 h-4 mr-2" />
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### User Menu

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
      <Avatar>
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{user.name[0]}</AvatarFallback>
      </Avatar>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56" align="end">
    <DropdownMenuLabel>
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium">{user.name}</p>
        <p className="text-xs text-slate-500">{user.email}</p>
      </div>
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <UserIcon className="w-4 h-4 mr-2" />
      Profile
    </DropdownMenuItem>
    <DropdownMenuItem>
      <SettingsIcon className="w-4 h-4 mr-2" />
      Settings
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={handleSignOut}>
      <LogoutIcon className="w-4 h-4 mr-2" />
      Log out
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

## Badge

### Usage

```tsx
import { Badge } from '@/components/ui/badge';

// Default
<Badge>Default</Badge>

// Secondary
<Badge variant="secondary">Secondary</Badge>

// Outline
<Badge variant="outline">Outline</Badge>

// Destructive
<Badge variant="destructive">Destructive</Badge>

// Custom Colors
<Badge className="bg-indigo-500 text-white">
  Indigo
</Badge>

<Badge className="bg-emerald-500 text-white">
  Emerald
</Badge>
```

### Tag Badge

```tsx
<Badge 
  className="
    bg-indigo-100 dark:bg-indigo-900/50 
    text-indigo-700 dark:text-indigo-300
    hover:bg-indigo-200 dark:hover:bg-indigo-900
    transition-colors cursor-pointer
  "
>
  {tagName}
</Badge>
```

---

## Avatar

### Usage

```tsx
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>

// With Status
<div className="relative">
  <Avatar>
    <AvatarImage src={user.avatar} />
    <AvatarFallback>{user.name[0]}</AvatarFallback>
  </Avatar>
  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
</div>
```

---

## Tabs

### Usage

```tsx
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

<Tabs defaultValue="account" className="w-full">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    {/* Account settings */}
  </TabsContent>
  <TabsContent value="password">
    {/* Password settings */}
  </TabsContent>
</Tabs>
```

---

## Best Practices

### 1. Consistency

```tsx
// ✅ Good - Consistent styling
<Button className="bg-indigo-500">Primary</Button>
<Button className="bg-emerald-500">CTA</Button>

// ❌ Bad - Mixed colors
<Button className="bg-blue-500">Primary</Button>
<Button className="bg-green-500">CTA</Button>
```

### 2. Accessibility

```tsx
// ✅ Good - Accessible
<Button aria-label="Edit bookmark">
  <EditIcon className="w-4 h-4" />
</Button>

<Input 
  id="email"
  aria-describedby="email-error"
/>
<span id="email-error" className="text-red-500">
  Invalid email
</span>

// ❌ Bad - Not accessible
<Button>
  <EditIcon />
</Button>
```

### 3. Responsive

```tsx
// ✅ Good - Responsive
<div className="flex flex-col sm:flex-row gap-4">
  <Button className="w-full sm:w-auto">Cancel</Button>
  <Button className="w-full sm:w-auto">Save</Button>
</div>

// ❌ Bad - Fixed width
<div className="flex gap-4">
  <Button className="w-32">Cancel</Button>
  <Button className="w-32">Save</Button>
</div>
```

### 4. Loading States

```tsx
// ✅ Good - Loading state
<Button disabled className="animate-pulse">
  <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
  Loading...
</Button>

// ❌ Bad - No feedback
<Button onClick={handleLoad}>
  Load
</Button>
```

### 5. Error States

```tsx
// ✅ Good - Error handling
<Input 
  className={error ? 'border-red-500' : ''}
  aria-invalid={!!error}
/>
{error && (
  <p className="text-sm text-red-500 mt-1" role="alert">
    {error}
  </p>
)}

// ❌ Bad - No error indication
<Input />
```

---

## Component Examples

### Bookmark Card Component

```tsx
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface BookmarkCardProps {
  id: string;
  title: string;
  url: string;
  thumbnail?: string;
  tags?: string[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function BookmarkCard({
  id,
  title,
  url,
  thumbnail,
  tags = [],
  onEdit,
  onDelete,
}: BookmarkCardProps) {
  return (
    <Card className="
      group
      bg-white/70 dark:bg-slate-900/70 
      backdrop-blur-lg
      border-white/50 dark:border-white/10
      hover:shadow-xl hover:-translate-y-1
      transition-all duration-200
      overflow-hidden
    ">
      {/* Thumbnail */}
      {thumbnail && (
        <div className="aspect-video overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="
              w-full h-full object-cover
              group-hover:scale-105
              transition-transform duration-300
            "
          />
        </div>
      )}
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
          {url}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge 
              key={tag}
              variant="secondary"
              className="text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="link" className="px-0" asChild>
          <a href={url} target="_blank" rel="noopener noreferrer">
            Visit →
          </a>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(id)}>
              <EditIcon className="w-4 h-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(id)}
              className="text-red-600"
            >
              <TrashIcon className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
```

---

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
- [Radix UI Primitives](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Design System](./design-system/bl1nk-bookmarks/MASTER.md)

---

**Happy Component Building! 🎨**
