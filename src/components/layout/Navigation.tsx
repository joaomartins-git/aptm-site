'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, User, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NavItem } from '@/types'
import { useSession, signOut } from 'next-auth/react'

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
  // {
  //   label: 'Atividades',
  //   href: '/services',
  //   submenu: [
  //     {
  //       label: 'Consultoria',
  //       href: '/services#consulting'
  //     },
  //     {
  //       label: 'Investigação',
  //       href: '/services#research'
  //     },
  //     {
  //       label: 'Parcerias',
  //       href: '/services#partnerships'
  //     },
  //     {
  //       label: 'Benefícios para Membros',
  //       href: '/services#member-benefits'
  //     }
  //   ]
  // },
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
  const items = navigationItems.filter(item => item.label !== 'Área de Sócios')

  if (isAuthenticated) {
    items.push({
      label: 'Área de Sócios',
      href: '/socio/area'
    })
  } else {
    items.push({
      label: 'Área de Sócios',
      href: '/login'
    })
  }

  return items
}

interface NavigationProps {
  mobile?: boolean
  onCloseMenu?: () => void
}

// Profile dropdown component
function ProfileDropdown({ mobile = false, onCloseMenu }: { mobile?: boolean, onCloseMenu?: () => void }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { data: session } = useSession()

  const getUserInitials = () => {
    if (!session?.user?.name && !session?.user?.email) return 'U'

    const name = session.user?.name || session.user?.email || ''
    const parts = name.trim().split(' ')

    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    }

    return name.substring(0, 2).toUpperCase()
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
    setIsDropdownOpen(false)
    onCloseMenu?.()
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsDropdownOpen(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const dropdownItems = [
    { icon: User, label: 'Perfil', href: '/socio/perfil' },
    { icon: User, label: 'Área de Sócios', href: '/socio/area' },
  ]

  return (
    <div className="relative" ref={dropdownRef} onKeyDown={handleKeyDown}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
        aria-label="Menu de perfil"
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
        <span className="text-sm font-medium">
          {getUserInitials()}
        </span>
      </button>

      {isDropdownOpen && (
        <div
          className={cn(
            "absolute top-full right-0 min-w-[200px] bg-background border border-border rounded-md shadow-lg z-50 py-1 mt-1",
            mobile && "relative top-0 right-0 mt-2 w-full"
          )}
          role="menu"
        >
          <div className="px-4 py-2 border-b border-border">
            <p className="text-sm font-medium text-foreground truncate">
              {session?.user?.name || 'Utilizador'}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {session?.user?.email}
            </p>
          </div>

          {dropdownItems.map((item) => {
            const IconComponent = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200 focus:outline-none focus-visible:bg-accent focus-visible:text-accent-foreground"
                role="menuitem"
                onClick={() => {
                  setIsDropdownOpen(false)
                  onCloseMenu?.()
                }}
              >
                <IconComponent className="w-4 h-4 mr-3" />
                {item.label}
              </Link>
            )
          })}

          <div className="border-t border-border my-1"></div>

          <button
            onClick={handleSignOut}
            className="flex items-center w-full px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors duration-200 focus:outline-none focus-visible:bg-destructive/10"
            role="menuitem"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Terminar sessão
          </button>
        </div>
      )}
    </div>
  )
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
              <div
                className={cn(
                  itemClasses(item.href, isActive),
                  "flex items-center justify-between w-full"
                )}
              >
                <Link
                  href={item.href}
                  className={cn("flex-1 text-left", mobile && "pr-2")}
                  onClick={() => {
                    if (mobile) onCloseMenu?.()
                  }}
                >
                  {item.label}
                </Link>

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
                  {item.submenu.map((subItem) => (
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

      {/* Profile dropdown for authenticated users */}
      {!mobile && isAuthenticated && (
        <div className="ml-4">
          <ProfileDropdown mobile={mobile} onCloseMenu={onCloseMenu} />
        </div>
      )}

      {/* Mobile profile menu */}
      {mobile && isAuthenticated && (
        <div className="border-t border-border mt-4 pt-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">
              {session?.user?.name || 'Utilizador'}
            </span>
            <ProfileDropdown mobile={mobile} onCloseMenu={onCloseMenu} />
          </div>
          <Link
            href="/socio/perfil"
            className="block w-full text-left px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded-md"
            onClick={() => onCloseMenu?.()}
          >
            Perfil
          </Link>
          <Link
            href="/socio/area"
            className="block w-full text-left px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded-md"
            onClick={() => onCloseMenu?.()}
          >
            Área de Sócios
          </Link>
        </div>
      )}
    </nav>
  )
}