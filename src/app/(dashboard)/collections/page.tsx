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
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type IconOption = {
  id: string
  name: string
  icon: ComponentType<{ className?: string }>
}

const iconOptions: IconOption[] = [
  { id: 'todo', name: 'To-Do', icon: CheckSquare },
  { id: 'movies', name: 'Movies', icon: Clapperboard },
  { id: 'tv', name: 'TV Shows', icon: Monitor },
  { id: 'music', name: 'Music', icon: Music2 },
  { id: 'podcasts', name: 'Podcasts', icon: Mic2 },
  { id: 'books', name: 'Books', icon: BookOpen },
  { id: 'games', name: 'Games', icon: Gamepad2 },
]

const colors = ['#cbd5e1', '#111827', '#0e7490', '#16a34a', '#eab308', '#dc2626', '#7c3aed', '#ec4899']

export default function CollectionsPage() {
  const [title, setTitle] = useState('Movies')
  const [selectedIconId, setSelectedIconId] = useState('movies')
  const [selectedColor, setSelectedColor] = useState('#0e7490')
  const [sortMode, setSortMode] = useState<'recent' | 'manual'>('recent')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const selectedIcon = useMemo(
    () => iconOptions.find((item) => item.id === selectedIconId) ?? iconOptions[0],
    [selectedIconId]
  )

  const PreviewIcon = selectedIcon.icon

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#ecfeff_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight">Collection Builder</h1>
          <p className="text-slate-600">Design components for each collection without losing data structure.</p>
        </header>

        <section className="grid gap-5 lg:grid-cols-[1.1fr_2fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <Label htmlFor="collection-title">Write a title</Label>
            <Input
              id="collection-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Collection title"
              className="mt-2 h-11"
            />

            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-slate-700">Pick an icon</p>
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
                        'flex h-10 cursor-pointer items-center justify-center rounded-lg border transition',
                        active
                          ? 'border-cyan-500 bg-cyan-50 text-cyan-700'
                          : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                      )}
                      aria-label={item.name}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="collection-note">Add a note</Label>
              <textarea
                id="collection-note"
                className="min-h-24 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-offset-background focus:ring-1 focus:ring-cyan-500"
                placeholder="Optional note for this collection"
              />
            </div>
          </article>

          <div className="space-y-5">
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="rounded-2xl bg-[radial-gradient(circle_at_30%_20%,#67e8f944_0%,transparent_35%),radial-gradient(circle_at_70%_30%,#c4b5fd44_0%,transparent_35%),radial-gradient(circle_at_50%_80%,#fca5a544_0%,transparent_40%),#f8fafc] px-6 py-12 text-center">
                <p className="mx-auto max-w-3xl text-4xl font-black leading-tight text-slate-900 sm:text-5xl">
                  Go custom to make it
                  <span className="block text-rose-700">truly yours</span>
                </p>
              </div>
            </article>

            <div className="grid gap-5 md:grid-cols-2">
              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="mb-3 text-lg font-bold">Filter & Sort</p>
                <div className="space-y-2">
                  <button
                    type="button"
                    className={cn(
                      'flex w-full cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-left',
                      sortMode === 'recent' ? 'border-cyan-500 bg-cyan-50' : 'border-slate-200'
                    )}
                    onClick={() => setSortMode('recent')}
                  >
                    <span>Recently added</span>
                    <Sparkles className="h-4 w-4 text-cyan-600" />
                  </button>
                  <button
                    type="button"
                    className={cn(
                      'flex w-full cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-left',
                      sortMode === 'manual' ? 'border-cyan-500 bg-cyan-50' : 'border-slate-200'
                    )}
                    onClick={() => setSortMode('manual')}
                  >
                    <span>Manual ordering</span>
                    <span className="text-xs text-slate-400">drag</span>
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    onClick={() => setViewMode('grid')}
                    className="cursor-pointer"
                  >
                    Grid
                  </Button>
                  <Button
                    type="button"
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    onClick={() => setViewMode('list')}
                    className="cursor-pointer"
                  >
                    List
                  </Button>
                </div>
              </article>

              <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <p className="mb-3 text-lg font-bold">Themes</p>
                <div className="mb-4 flex items-center justify-center">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100"
                    style={{ color: selectedColor }}
                  >
                    <PreviewIcon className="h-8 w-8" />
                  </div>
                </div>

                <Input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="mb-4 h-10 text-center"
                />

                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        'h-9 w-9 cursor-pointer rounded-full border-2 transition',
                        selectedColor === color ? 'scale-105 border-slate-900' : 'border-transparent'
                      )}
                      style={{ backgroundColor: color }}
                      aria-label={`Theme ${color}`}
                    />
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>

        <footer className="flex items-center justify-end">
          <Button className="cursor-pointer bg-cyan-700 hover:bg-cyan-600">
            <Palette className="mr-2 h-4 w-4" />
            Save Collection Style
          </Button>
        </footer>
      </div>
    </main>
  )
}
