import React, { useState, useEffect } from 'react'
import { SidebarTrigger, useSidebar } from '../ui/sidebar'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { LogInIcon, LogOutIcon, Moon, Sun, Menu, X, User, Settings, PenTool } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import Searchbox from './Searchbox'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

const Topbar = () => {
  const { state, isMobile } = useSidebar()
  const { user, logout, loading } = useAuth()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    return false
  })
  
  // Calculate the left offset for the topbar when sidebar is open
  const sidebarWidth = '16rem' // This matches SIDEBAR_WIDTH from sidebar.jsx
  const isExpanded = state === 'expanded'

  // Handle scroll behavior - hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Only hide/show if scrolled more than 100px
      if (currentScrollY > 100) {
        setScrolled(true)
        if (currentScrollY > lastScrollY && currentScrollY > 300) {
          setHidden(true)
        } else {
          setHidden(false)
        }
      } else {
        setScrolled(false)
        setHidden(false)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Handle dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }
  
  return (
    <motion.header 
      initial={{ y: 0 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`
        fixed top-0 z-50 transition-all duration-300 ease-out
        ${scrolled 
          ? 'glass-header shadow-lg' 
          : 'bg-background/95 backdrop-blur-sm'
        }
      `}
      style={{
        left: !isMobile && isExpanded ? sidebarWidth : '0',
        width: !isMobile && isExpanded ? `calc(100% - ${sidebarWidth})` : '100%'
      }}
    >
      <div className='flex items-center justify-between w-full px-4 md:px-6 h-16 md:h-20'>
        {/* Left Section - Sidebar Trigger */}
        <div className='flex items-center'>
          <SidebarTrigger className="hover:bg-muted rounded-full transition-colors" />
        </div>
        
        {/* Center Section - Search */}
        <div className='hidden md:flex flex-1 justify-center max-w-xl mx-8'>
          <Searchbox onSearch={handleSearch} placeholder="Search articles, topics, authors..." />
        </div>

        {/* Right Section - Actions */}
        <div className='flex items-center gap-2 md:gap-4'>
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="rounded-full w-10 h-10 hover:bg-muted transition-all"
          >
            <AnimatePresence mode="wait" initial={false}>
              {darkMode ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="w-5 h-5 text-amber-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>

          {/* User Section */}
          {loading ? (
            <div className="w-10 h-10 bg-muted animate-pulse rounded-full"></div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="rounded-full p-0 w-10 h-10 overflow-hidden ring-2 ring-primary/20 hover:ring-primary/40 transition-all"
                >
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2">
                <div className="px-3 py-2">
                  <p className="font-semibold text-sm">{user.fullName}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                {(user.role === 'writer' || user.role === 'admin') && (
                  <DropdownMenuItem asChild>
                    <Link to="/writer" className="cursor-pointer">
                      <PenTool className="w-4 h-4 mr-2" />
                      Writer Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                {user.role === 'admin' && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="cursor-pointer">
                      <Settings className="w-4 h-4 mr-2" />
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="text-destructive cursor-pointer"
                >
                  <LogOutIcon className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              asChild 
              className='rounded-full px-6 bg-primary hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40'
            >
              <Link to="/login" className="flex items-center gap-2">
                <LogInIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </motion.header>
  )
}

export default Topbar