import { useState, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useTheme } from '../context/ThemeContext'
import { Globe, Menu, X, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const { t, toggleLang, dir } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#packages', label: t('nav.packages') },
    { href: '#hotels', label: t('nav.hotels') },
    { href: '#activities', label: t('nav.activities') },
    { href: '#services', label: t('nav.services') },
    { href: '#contact', label: t('nav.contact') },
  ]

  const handleNavClick = () => setMenuOpen(false)

  return (
    <>
      <motion.nav 
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="navbar-inner">
          <a href="#" className="navbar-logo">
            <img src="/logo.png" alt="Rwnah" />
            <div className="logo-text">
              <span className="logo-main">{t('nav.brandName')}</span>
              <span className="logo-sub">{t('nav.brandSubtitle')}</span>
            </div>
          </a>

          <div className="navbar-links">
            {links.map(link => (
              <a key={link.href} href={link.href}>{link.label}</a>
            ))}
          </div>

          <div className="navbar-actions">
            {/* Theme Toggle Button */}
            <button className="btn-lang" onClick={toggleTheme} style={{ padding: '0.4rem 0.6rem' }} aria-label="Toggle Theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="btn-lang" onClick={toggleLang}>
              <Globe size={14} style={{ display: 'inline', marginInlineEnd: 4, verticalAlign: 'middle' }} />
              {t('nav.langSwitch')}
            </button>
            <button className="hamburger" style={{ background: 'transparent' }} onClick={() => setMenuOpen(true)}>
              <Menu color="var(--text-primary)" size={28} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <button className="mobile-menu-close" onClick={() => setMenuOpen(false)}>
              <X size={36} />
            </button>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', textAlign: 'center' }}>
              {links.map(link => (
                <a key={link.href} href={link.href} onClick={handleNavClick}>{link.label}</a>
              ))}
              <button 
                className="btn-lang" 
                onClick={() => { toggleLang(); setMenuOpen(false); }}
                style={{ fontSize: '1.2rem', padding: '1rem 2rem' }}
              >
                {t('nav.langSwitch')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
