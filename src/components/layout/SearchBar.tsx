'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement search functionality
    console.log('Searching for:', query)
  }

  const clearSearch = () => {
    setQuery('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <form
      onSubmit={handleSearch}
      className={cn(
        "relative flex items-center transition-all duration-300",
        isOpen ? "w-64" : "w-48"
      )}
    >
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Pesquisar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => !query && setIsOpen(false)}
          className="pl-10 pr-10 h-9 text-sm"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0 hover:bg-transparent"
            aria-label="Clear search"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    </form>
  )
}