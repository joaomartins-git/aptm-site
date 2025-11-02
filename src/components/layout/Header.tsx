'use client'

import React, { useState } from 'react'
import { Menu, X, Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Navigation } from './Navigation'
import { SearchBar } from './SearchBar'
import { cn } from '@/lib/utils'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    if (isSearchOpen) setIsSearchOpen(false)
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isMobileMenuOpen) setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <a href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">APTM</span>
            </div>
            <span className="font-bold text-xl text-foreground">APTM</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex">
          <Navigation />
        </div>

        {/* Search Bar and Actions */}
        <div className="flex items-center space-x-2">
          {/* Desktop Search */}
          <div className="hidden lg:flex">
            <SearchBar />
          </div>

          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSearch}
            className="lg:hidden"
            aria-label="Toggle search"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Search */}
      <div
        className={cn(
          "border-t border-border bg-background lg:hidden",
          isSearchOpen ? "block" : "hidden"
        )}
      >
        <div className="container p-4">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "border-t border-border bg-background md:hidden",
          isMobileMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="container p-4">
          <Navigation mobile />
        </div>
      </div>
    </header>
  )
}