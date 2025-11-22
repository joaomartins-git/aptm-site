'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NavItem } from '@/types'
import { useSession } from 'next-auth/react'

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
    label: 'Sócios',
    href: '/join',
    submenu: [
      {
        label: 'Tornar-se Sócio',
        href: '/join'
      },
      {
        label: 'Benefícios',
        href: '/join/beneficios'
      }
    ]
  },
  {
    label: 'Área de Sócios',
    href: '/socio/area'
  },
  {
    label: 'Contactos',
    href: '/contact',
    submenu: [
      {
        label: 'Geral',
        href: '/contact'
      },
      {
        label: 'Encontrar Terapeuta',
        href: '/contact/terapeutas'
      }
    ]
  }
]

// Function to get auth-dependent navigation items
const getNavigationItems = (isAuthenticated: boolean): NavItem[] => {
  return navigationItems.map((item) => {
    if (item.label === 'Área de Sócios') {
      return {
        ...item,
        label: isAuthenticated
          ? 'Área de Sócios (Perfil)'
          : 'Área de Sócios (Login)',
      }
    }
    return item
  })
}

interface NavigationProps {
  mobile?: boolean
  onCloseMenu?: () => void
}

export function Navigation({ mobile = false, onCloseMenu }: NavigationProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { data: session } = useSession()

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
  const isAuthenticated = !!session
  const currentNavigationItems = getNavigationItems(isAuthenticated)

  return (
    <nav className={navClasses}>
      {currentNavigationItems.map((item) => {
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
              {/* <button
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
              </button> */}
              <div
  className={cn(
    itemClasses(item.href, isActive),
    "flex items-center justify-between w-full"
  )}
>
  {/* Parent link now navigates to the item's page (e.g., /about) */}
  <Link
    href={item.href}
    className={cn("flex-1 text-left", mobile && "pr-2")}
    onClick={() => {
      if (mobile) onCloseMenu?.()
    }}
  >
    {item.label}
  </Link>

  {/* Separate caret button only toggles the submenu */}
  <button
    type="button"
    id={dropdownId}
    aria-haspopup="menu"
    aria-expanded={activeDropdown === item.label}
    aria-controls={activeDropdown === item.label ? `${dropdownId}-menu` : undefined}
    onClick={(e) => {
      e.preventDefault()
      e.stopPropagation()
      handleDropdownToggle(item.label)
    }}
    onKeyDown={(e) => handleDropdownKeyDown(e, item.label)}
    className="ml-2 p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  >
    <ChevronDown
      className={cn(
        "h-4 w-4 transition-transform duration-200",
        activeDropdown === item.label ? "rotate-180" : ""
      )}
      aria-hidden="true"
    />
    <span className="sr-only">Abrir submenu de {item.label}</span>
  </button>
</div>


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