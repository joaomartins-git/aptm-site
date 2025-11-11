'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NavItem } from '@/types'

const navigationItems: NavItem[] = [
  {
    label: 'Início',
    href: '/'
  },
  {
    label: 'Sobre Nós',
    href: '/about',
    submenu: [
      {
        label: 'História',
        href: '/about/historia'
      },
      {
        label: 'Estatutos',
        href: '/about/estatutos'
      },
      {
        label: 'Corpos Sociais',
        href: '/about/corpos-sociais'
      }
    ]
  },
  {
    label: 'Serviços',
    href: '/services',
    submenu: [
      {
        label: 'Consultoria',
        href: '/services#consulting'
      },
      {
        label: 'Investigação',
        href: '/services#research'
      },
      {
        label: 'Parcerias',
        href: '/services#partnerships'
      },
      {
        label: 'Benefícios para Membros',
        href: '/services#member-benefits'
      }
    ]
  },
  {
    label: 'Eventos',
    href: '/events'
  },
  {
    label: 'Formações',
    href: '/trainings'
  },
  {
    label: 'Contacto',
    href: '/contact'
  }
]

interface NavigationProps {
  mobile?: boolean
  onCloseMenu?: () => void
}

export function Navigation({ mobile = false, onCloseMenu }: NavigationProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (label: string) => {
    if (mobile) return
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    if (mobile) return
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 150)
  }

  const handleDropdownToggle = (label: string) => {
    if (!mobile) return
    setActiveDropdown(activeDropdown === label ? null : label)
  }

  const handleDropdownKeyDown = (event: React.KeyboardEvent, label: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (mobile) {
        handleDropdownToggle(label)
      } else {
        setActiveDropdown(activeDropdown === label ? null : label)
      }
    } else if (event.key === 'Escape' && activeDropdown === label) {
      event.preventDefault()
      setActiveDropdown(null)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && activeDropdown) {
      event.preventDefault()
      setActiveDropdown(null)
    }
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const navClasses = cn(
    "flex space-x-1",
    mobile ? "flex-col space-y-1 space-x-0" : ""
  )

  const itemClasses = (href: string, isActive: boolean) => cn(
    "relative px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200",
    "hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    isActive
      ? "bg-primary text-primary-foreground hover:bg-primary/90"
      : "text-foreground",
    mobile ? "w-full text-left" : ""
  )

  const dropdownClasses = cn(
    "absolute top-full left-0 min-w-[200px] bg-background border border-border rounded-md shadow-lg z-50",
    "py-1",
    mobile
      ? "relative top-0 left-0 mt-1 w-full shadow-none border border-border"
      : "mt-1"
  )

  return (
    <nav className={navClasses}>
      {navigationItems.map((item) => {
        const hasSubmenu = item.submenu && item.submenu.length > 0
        const isActive = false // TODO: Implement active page detection

        if (hasSubmenu) {
          const dropdownId = `dropdown-${item.label.toLowerCase().replace(/\s+/g, '-')}`
          return (
            <div
              key={item.label}
              className={cn("relative", mobile ? "w-full" : "")}
              onMouseEnter={() => handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                id={dropdownId}
                onClick={() => handleDropdownToggle(item.label)}
                onKeyDown={(e) => handleDropdownKeyDown(e, item.label)}
                className={cn(
                  itemClasses(item.href, isActive),
                  "flex items-center justify-between w-full"
                )}
                aria-expanded={activeDropdown === item.label}
                aria-haspopup="true"
                aria-controls={activeDropdown === item.label ? `${dropdownId}-menu` : undefined}
              >
                <span>{item.label}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    activeDropdown === item.label ? "rotate-180" : "",
                    mobile && "ml-2"
                  )}
                  aria-hidden="true"
                />
              </button>

              {activeDropdown === item.label && item.submenu && (
                <div
                  id={`${dropdownId}-menu`}
                  className={dropdownClasses}
                  role="menu"
                  aria-labelledby={dropdownId}
                >
                  {item.submenu.map((subItem, index) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={cn(
                        "block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200 focus:outline-none focus-visible:bg-accent focus-visible:text-accent-foreground",
                        mobile ? "w-full" : ""
                      )}
                      role="menuitem"
                      onClick={() => {
                        if (mobile) {
                          setActiveDropdown(null)
                          onCloseMenu?.()
                        }
                      }}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            className={itemClasses(item.href, isActive)}
            onClick={() => {
              if (mobile) {
                onCloseMenu?.()
              }
            }}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}