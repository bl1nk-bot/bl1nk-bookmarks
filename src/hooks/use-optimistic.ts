'use client'

import { useState, useCallback } from 'react'

interface OptimisticUpdateOptions<T> {
  onRevert?: (oldData: T) => void
  onError?: (error: Error) => void
}

export function useOptimisticUpdate<T>() {
  const [optimisticData, setOptimisticData] = useState<T | null>(null)
  const [isOptimistic, setIsOptimistic] = useState(false)

  const startOptimisticUpdate = useCallback((
    newData: T,
    actualUpdate: () => Promise<void>,
    options: OptimisticUpdateOptions<T> = {}
  ) => {
    const originalData = optimisticData

    // Apply optimistic update
    setOptimisticData(newData)
    setIsOptimistic(true)

    // Perform actual update
    actualUpdate()
      .then(() => {
        // Success - keep the optimistic update
        setIsOptimistic(false)
      })
      .catch((error) => {
        // Error - revert to original data
        setOptimisticData(originalData)
        setIsOptimistic(false)

        if (options.onError) {
          options.onError(error as Error)
        }

        if (options.onRevert && originalData !== null) {
          options.onRevert(originalData)
        }
      })
  }, [optimisticData])

  const clearOptimisticUpdate = useCallback(() => {
    setOptimisticData(null)
    setIsOptimistic(false)
  }, [])

  return {
    optimisticData,
    isOptimistic,
    startOptimisticUpdate,
    clearOptimisticUpdate
  }
}

export function useListOptimisticUpdate<T extends { id: string }>() {
  const [items, setItems] = useState<T[]>([])
  const [optimisticItems, setOptimisticItems] = useState<T[]>([])
  const [isOptimistic, setIsOptimistic] = useState(false)

  const startOptimisticUpdate = useCallback((
    operation: 'add' | 'update' | 'delete',
    item: T,
    actualUpdate: () => Promise<void>,
    options: OptimisticUpdateOptions<T[]> = {}
  ) => {
    const originalItems = [...items]

    let newItems: T[]
    switch (operation) {
      case 'add':
        newItems = [...items, item]
        break
      case 'update':
        newItems = items.map(existing =>
          existing.id === item.id ? item : existing
        )
        break
      case 'delete':
        newItems = items.filter(existing => existing.id !== item.id)
        break
      default:
        newItems = items
    }

    // Apply optimistic update
    setOptimisticItems(newItems)
    setIsOptimistic(true)

    // Perform actual update
    actualUpdate()
      .then(() => {
        // Success - update actual items and clear optimistic state
        setItems(newItems)
        setOptimisticItems([])
        setIsOptimistic(false)
      })
      .catch((error) => {
        // Error - revert optimistic state
        setOptimisticItems([])
        setIsOptimistic(false)

        if (options.onError) {
          options.onError(error as Error)
        }

        if (options.onRevert) {
          options.onRevert(originalItems)
        }
      })
  }, [items])

  const setItemsDirectly = useCallback((newItems: T[]) => {
    setItems(newItems)
    setOptimisticItems([])
    setIsOptimistic(false)
  }, [])

  const currentItems = optimisticItems.length > 0 ? optimisticItems : items

  return {
    items: currentItems,
    isOptimistic,
    startOptimisticUpdate,
    setItems: setItemsDirectly
  }
}