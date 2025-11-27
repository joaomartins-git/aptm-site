'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface TabsProps {
  tabs: { id: string; label: string }[]
  activeTab: string
  onChange: (id: string) => void
}

interface TabProps {
  id: string
  label: string
  isActive: boolean
  onClick: () => void
}

function Tab({ id, label, isActive, onClick }: TabProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={`tab-panel-${id}`}
      tabIndex={isActive ? 0 : -1}
      className={cn(
        "relative px-4 py-3 text-sm font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "border-b-2",
        isActive
          ? "text-primary border-primary"
          : "text-muted-foreground border-transparent hover:text-foreground hover:bg-muted"
      )}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {label}
    </button>
  )
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab)
    let newIndex = currentIndex

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        newIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1
        break
      case 'ArrowRight':
        event.preventDefault()
        newIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0
        break
      case 'Home':
        event.preventDefault()
        newIndex = 0
        break
      case 'End':
        event.preventDefault()
        newIndex = tabs.length - 1
        break
      default:
        return
    }

    if (newIndex !== currentIndex) {
      onChange(tabs[newIndex].id)
    }
  }

  return (
    <div className="border-b border-border">
      <div
        role="tablist"
        aria-label="Opções do perfil"
        className="flex space-x-8"
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            id={tab.id}
            label={tab.label}
            isActive={activeTab === tab.id}
            onClick={() => onChange(tab.id)}
          />
        ))}
      </div>
    </div>
  )
}

export function TabPanel({ id, activeTab, children }: {
  id: string;
  activeTab: string;
  children: React.ReactNode
}) {
  return (
    <div
      role="tabpanel"
      id={`tab-panel-${id}`}
      aria-labelledby={`tab-${id}`}
      tabIndex={0}
      className={activeTab === id ? 'block' : 'hidden'}
    >
      {children}
    </div>
  )
}