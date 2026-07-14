import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { eventConfig } from '../../data/eventConfig'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import './Navbar.css'

interface NavbarProps {
  onMenuToggle: (open: boolean) => void
  menuOpen: boolean
}

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Schedule', href: '#timeline' },
  { label: 'People', href: '#faculty' },
  { label: 'Brief', href: '#guidelines' },
  { label: 'Venue', href: '#venue' },
  { label: 'Contact', href: '/contact' },
] as const

export function Navbar({ onMenuToggle, menuOpen }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const location = useLocation()
  const reducedMotion = useReducedMotion()
  const scrollProgress = useScrollProgress()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (location.pathname !== '/') return
    const sectionIds = navItems.filter(n => n.href.startsWith('#')).map(n => n.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [location.pathname])

  const isHome = location.pathname === '/'

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      {isHome && !reducedMotion && (
        <div className="navbar__progress" role="progressbar" aria-valuenow={Math.round(scrollProgress * 100)} aria-label="Page scroll progress">
          <div className="navbar__progress-fill" style={{ width: `${scrollProgress * 100}%` }} />
        </div>
      )}

      <div className="navbar__inner container">
        <Link to="/" className="navbar__logo" aria-label="PES Institute of Advanced Management Studies">
          <img
            className="navbar__logo-img"
            src="/favicon.svg"
            alt="PES Institute of Advanced Management Studies"
          />
        </Link>

        <nav className="navbar__desktop" aria-label="Main navigation">
          {isHome ? (
            navItems.map((item) => {
              const sectionId = item.href.startsWith('#') ? item.href.slice(1) : ''
              const isActive = sectionId && activeSection === sectionId
              return (
                <a key={item.href} href={item.href} className={`navbar__link${isActive ? ' navbar__link--active' : ''}`}>
                  {item.label}
                </a>
              )
            })
          ) : (
            <Link to="/" className="navbar__link">
              Home
            </Link>
          )}
          {eventConfig.documents.brochureUrl && (
            <a
              href={eventConfig.documents.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__link"
            >
              Brochure
            </a>
          )}
          <Link to="/register" className="navbar__cta">
            Register
          </Link>
        </nav>

        <button
          className="navbar__hamburger"
          onClick={() => onMenuToggle(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={`navbar__line${menuOpen ? ' navbar__line--1' : ''}`} />
          <span className={`navbar__line${menuOpen ? ' navbar__line--2' : ''}`} />
          <span className={`navbar__line${menuOpen ? ' navbar__line--3' : ''}`} />
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="navbar__mobile"
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="navbar__mobile-nav" aria-label="Mobile navigation">
                {isHome ? (
                  navItems.map((item, i) => {
                    const sectionId = item.href.startsWith('#') ? item.href.slice(1) : ''
                    const isActive = sectionId && activeSection === sectionId
                    return (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        className={`navbar__mobile-link${isActive ? ' navbar__mobile-link--active' : ''}`}
                        onClick={() => onMenuToggle(false)}
                        initial={reducedMotion ? { x: 0 } : { x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: reducedMotion ? 0 : i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {item.label}
                      </motion.a>
                    )
                  })
                ) : (
                  <motion.a
                    href="/"
                    className="navbar__mobile-link"
                    onClick={() => onMenuToggle(false)}
                    initial={reducedMotion ? { x: 0 } : { x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                  >
                    Home
                  </motion.a>
                )}
                <motion.div
                  className="navbar__mobile-cta"
                  initial={reducedMotion ? { y: 0 } : { y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: reducedMotion ? 0 : 0.35, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {eventConfig.documents.brochureUrl && (
                    <a
                      href={eventConfig.documents.brochureUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="navbar__mobile-outline"
                      onClick={() => onMenuToggle(false)}
                    >
                      View Brochure
                    </a>
                  )}
                  <Link
                    to="/register"
                    className="navbar__mobile-register"
                    onClick={() => onMenuToggle(false)}
                  >
                    Register Your Team
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}