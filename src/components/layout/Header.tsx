'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Menu, X, Search } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Navigation } from './Navigation'
import { SearchBar } from './SearchBar'
import { cn } from '@/lib/utils'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const firstMenuItemRef = useRef<HTMLDivElement>(null)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    if (isSearchOpen) setIsSearchOpen(false)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleMobileMenuKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleMobileMenu()
    } else if (event.key === 'Escape' && isMobileMenuOpen) {
      event.preventDefault()
      closeMobileMenu()
      mobileMenuButtonRef.current?.focus()
    }
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isMobileMenuOpen) setIsMobileMenuOpen(false)
  }

  // Focus management for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      // Focus the first menu item when menu opens
      const firstFocusableElement = mobileMenuRef.current.querySelector('a, button, input')
      if (firstFocusableElement) {
        setTimeout(() => firstFocusableElement.focus(), 100)
      }
    }
  }, [isMobileMenuOpen])

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(event.target as Node)
      ) {
        closeMobileMenu()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMobileMenuOpen])

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
            <Search className="h-5 w-5" aria-hidden="true" />
          </Button>

          {/* Mobile Menu Toggle */}
          <Button
            ref={mobileMenuButtonRef}
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            onKeyDown={handleMobileMenuKeyDown}
            className="md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
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
        ref={mobileMenuRef}
        id="mobile-menu"
        className={cn(
          "border-t border-border bg-background md:hidden",
          isMobileMenuOpen ? "block" : "hidden"
        )}
        role="region"
        aria-label="Mobile navigation"
        inert={!isMobileMenuOpen}
      >
        <div className="container p-4">
          <Navigation mobile onCloseMenu={closeMobileMenu} />
        </div>
      </div>
    </header>
  )
}