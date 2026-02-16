'use client'

import { useMemo, useState, type ComponentType } from 'react'
import {
  BookOpen,
  CheckSquare,
  Clapperboard,
  Gamepad2,
  Mic2,
  Monitor,
  Music2,
  Palette,
  Sparkles,
  Wand2,
  Eye,
  EyeOff,
  LayoutGrid,
  List,
  ArrowUpDown,
  Check,
  ChevronRight,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type IconOption = {
  id: string
  name: string
  icon: ComponentType<{ className?: string }>
  gradient: string
}

const iconOptions: IconOption[] = [
  { id: 'todo', name: 'To-Do', icon: CheckSquare, gradient: 'from-emerald-500 to-teal-500' },
  { id: 'movies', name: 'Movies', icon: Clapperboard, gradient: 'from-red-500 to-orange-500' },
  { id: 'tv', name: 'TV Shows', icon: Monitor, gradient: 'from-indigo-500 to-purple-500' },
  { id: 'music', name: 'Music', icon: Music2, gradient: 'from-pink-500 to-rose-500' },
  { id: 'podcasts', name: 'Podcasts', icon: Mic2, gradient: 'from-amber-500 to-orange-500' },
  { id: 'books', name: 'Books', icon: BookOpen, gradient: 'from-indigo-500 to-violet-500' },
  { id: 'games', name: 'Games', icon: Gamepad2, gradient: 'from-fuchsia-500 to-pink-500' },
]

const colors = [
  { name: 'Indigo', value: '#6366F1', gradient: 'from-indigo-500 to-indigo-600' },
  { name: 'Purple', value: '#8B5CF6', gradient: 'from-purple-500 to-purple-600' },
  { name: 'Emerald', value: '#10B981', gradient: 'from-emerald-500 to-emerald-600' },
  { name: 'Teal', value: '#14B8A6', gradient: 'from-teal-500 to-teal-600' },
  { name: 'Amber', value: '#F59E0B', gradient: 'from-amber-500 to-amber-600' },
  { name: 'Red', value: '#EF4444', gradient: 'from-red-500 to-red-600' },
  { name: 'Pink', value: '#EC4899', gradient: 'from-pink-500 to-pink-600' },
  { name: 'Blue', value: '#3B82F6', gradient: 'from-blue-500 to-blue-600' },
]

export default function CollectionsPage() {
  const [title, setTitle] = useState('Movies')
  const [selectedIconId, setSelectedIconId] = useState('movies')
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [sortMode, setSortMode] = useState<'recent' | 'manual'>('recent')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [note, setNote] = useState('')

  const selectedIcon = useMemo(
    () => iconOptions.find((item) => item.id === selectedIconId) ?? iconOptions[0],
    [selectedIconId]
  )

  const PreviewIcon = selectedIcon.icon

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 pb-24 antialiased selection:bg-indigo-500/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      {/* Decorative background elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-40 -top-40 h-96 w-96 animate-glow rounded-full bg-gradient-to-r from-purple-400 to-pink-500 opacity-20 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 animate-float rounded-full bg-gradient-to-r from-indigo-400 to-emerald-400 opacity-20 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-emerald-500 shadow-lg shadow-indigo-500/25">
              <Wand2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Collection Builder
              </h1>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Design and customize your collections
              </p>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
          {/* Left Panel - Settings */}
          <article className="space-y-4">
            {/* Title Card */}
            <div className="overflow-hidden rounded-2xl border border-slate-200/50 bg-white/70 p-6 shadow-md backdrop-blur-lg dark:border-slate-700/50 dark:bg-slate-900/70">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Collection Details</h2>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="collection-title" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Collection Title
                  </Label>
                  <Input
                    id="collection-title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Enter collection title"
                    className="h-12 rounded-xl border-slate-300 bg-white/80 text-base font-medium transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-900/50"
                  />
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">Choose an Icon</p>
                  <div className="grid grid-cols-4 gap-2">
                    {iconOptions.map((item) => {
                      const Icon = item.icon
                      const active = selectedIconId === item.id
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedIconId(item.id)}
                          className={cn(
                            'group relative flex h-12 cursor-pointer items-center justify-center rounded-xl border-2 transition-all duration-200',
                            active
                              ? `border-transparent bg-gradient-to-br ${item.gradient} text-white shadow-md`
                              : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300 hover:bg-white hover:shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-slate-600'
                          )}
                          aria-label={item.name}
                        >
                          <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                          {active && (
                            <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md">
                              <Check className="h-3 w-3 text-slate-900" />
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="collection-note" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Add a Note
                  </Label>
                  <textarea
                    id="collection-note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="min-h-24 w-full rounded-xl border-2 border-slate-200 bg-white/80 px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-900/50 dark:text-white"
                    placeholder="Optional note for this collection..."
                  />
                </div>
              </div>
            </div>

            {/* Theme Card */}
            <div className="overflow-hidden rounded-2xl border border-slate-200/50 bg-white/70 p-6 shadow-md backdrop-blur-lg dark:border-slate-700/50 dark:bg-slate-900/70">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500 to-rose-500">
                  <Palette className="h-4 w-4 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Theme Color</h2>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {colors.map((color) => {
                  const active = selectedColor.value === color.value
                  return (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        'group relative flex h-12 cursor-pointer items-center justify-center rounded-xl border-2 transition-all duration-200',
                        active
                          ? 'scale-105 border-slate-900 shadow-lg dark:border-white'
                          : 'border-transparent hover:scale-105 hover:shadow-md'
                      )}
                      style={{ background: `linear-gradient(135deg, ${color.value}, ${color.value}dd)` }}
                      aria-label={color.name}
                    >
                      {active && (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md">
                          <Check className="h-4 w-4" style={{ color: color.value }} />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </article>

          {/* Right Panel - Preview & Options */}
          <div className="space-y-4">
            {/* Preview Card */}
            <article className="overflow-hidden rounded-2xl border border-slate-200/50 bg-white/70 shadow-md backdrop-blur-lg dark:border-slate-700/50 dark:bg-slate-900/70">
              <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/50 to-purple-50/50 px-8 py-16 dark:from-slate-800 dark:via-indigo-950/50 dark:to-purple-950/50">
                {/* Decorative elements */}
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-400/20 to-purple-400/20 blur-2xl" />
                <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-400/20 to-teal-400/20 blur-2xl" />

                <div className="relative text-center">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Preview
                  </p>

                  {/* Collection Preview - Gradient Card */}
                  <div className="mx-auto max-w-sm">
                    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-emerald-500 p-6 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/20">
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white blur-2xl" />
                        <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white blur-2xl" />
                      </div>

                      <div className="relative">
                        <div className="mb-5 flex items-start justify-between">
                          <div className={cn(
                            'flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3',
                          )}>
                            <PreviewIcon className="h-7 w-7 text-white" />
                          </div>
                          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                            New
                          </span>
                        </div>

                        <h3 className="mb-2 text-xl font-bold text-white">
                          {title || 'Untitled'}
                        </h3>

                        <p className="text-sm font-medium text-white/80">
                          0 items
                        </p>

                        {note && (
                          <p className="mt-3 line-clamp-2 text-sm text-white/70">
                            {note}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Options Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Filter & Sort */}
              <article className="overflow-hidden rounded-2xl border border-slate-200/50 bg-white/70 p-6 shadow-md backdrop-blur-lg dark:border-slate-700/50 dark:bg-slate-900/70">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-500">
                    <ArrowUpDown className="h-4 w-4 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Sort & Filter</h2>
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    className={cn(
                      'group flex w-full cursor-pointer items-center justify-between rounded-xl border-2 px-4 py-3 text-left transition-all duration-200',
                      sortMode === 'recent'
                        ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:border-slate-600 dark:hover:bg-slate-800/50'
                    )}
                    onClick={() => setSortMode('recent')}
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className={cn('h-4 w-4', sortMode === 'recent' ? 'text-indigo-600' : 'text-slate-400')} />
                      <span className={cn('font-medium', sortMode === 'recent' ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400')}>
                        Recently added
                      </span>
                    </div>
                    {sortMode === 'recent' && (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </button>

                  <button
                    type="button"
                    className={cn(
                      'group flex w-full cursor-pointer items-center justify-between rounded-xl border-2 px-4 py-3 text-left transition-all duration-200',
                      sortMode === 'manual'
                        ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:border-slate-600 dark:hover:bg-slate-800/50'
                    )}
                    onClick={() => setSortMode('manual')}
                  >
                    <div className="flex items-center gap-3">
                      <ArrowUpDown className={cn('h-4 w-4', sortMode === 'manual' ? 'text-indigo-600' : 'text-slate-400')} />
                      <span className={cn('font-medium', sortMode === 'manual' ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400')}>
                        Manual ordering
                      </span>
                    </div>
                    {sortMode === 'manual' && (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </button>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button
                    type="button"
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'flex-1 gap-2 rounded-xl font-semibold transition-all duration-200',
                      viewMode === 'grid'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:from-indigo-700 hover:to-purple-700'
                        : 'border-slate-200 hover:border-indigo-300 dark:border-slate-700'
                    )}
                  >
                    <LayoutGrid className="h-4 w-4" />
                    Grid
                  </Button>
                  <Button
                    type="button"
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    onClick={() => setViewMode('list')}
                    className={cn(
                      'flex-1 gap-2 rounded-xl font-semibold transition-all duration-200',
                      viewMode === 'list'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:from-indigo-700 hover:to-purple-700'
                        : 'border-slate-200 hover:border-indigo-300 dark:border-slate-700'
                    )}
                  >
                    <List className="h-4 w-4" />
                    List
                  </Button>
                </div>
              </article>

              {/* Visibility */}
              <article className="overflow-hidden rounded-2xl border border-slate-200/50 bg-white/70 p-6 shadow-md backdrop-blur-lg dark:border-slate-700/50 dark:bg-slate-900/70">
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
                    <Eye className="h-4 w-4 text-white" />
                  </div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Visibility</h2>
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-between rounded-xl border-2 border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-3 text-left dark:from-indigo-950/50 dark:to-purple-950/50"
                  >
                    <div className="flex items-center gap-3">
                      <Eye className="h-4 w-4 text-indigo-600" />
                      <span className="font-medium text-slate-900 dark:text-white">Public</span>
                    </div>
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  </button>

                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-between rounded-xl border-2 border-slate-200 px-4 py-3 text-left transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:border-slate-600 dark:hover:bg-slate-800/50"
                  >
                    <div className="flex items-center gap-3">
                      <EyeOff className="h-4 w-4 text-slate-400" />
                      <span className="font-medium text-slate-600 dark:text-slate-400">Private</span>
                    </div>
                  </button>
                </div>

                <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                  Public collections can be shared with others via a link.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Footer Actions */}
        <footer className="flex items-center justify-between border-t border-slate-200/50 pt-6 dark:border-slate-700/50">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Your collection will be saved automatically
          </p>
          <Button className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-emerald-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/30 active:scale-95">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <Palette className="relative mr-2 h-4 w-4" />
            <span className="relative">Save Collection</span>
            <ChevronRight className="relative ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </footer>
      </div>
    </div>
  )
}
