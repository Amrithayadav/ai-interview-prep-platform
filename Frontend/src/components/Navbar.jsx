import React, { useState, useEffect } from 'react'
import styles from './Navbar.module.scss'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="11" width="4" height="7" rx="1.5" fill="white"/>
              <rect x="8" y="7" width="4" height="11" rx="1.5" fill="white"/>
              <rect x="14" y="2" width="4" height="16" rx="1.5" fill="white"/>
            </svg>
          </div>
          <span>AI Interview Prep</span>
        </div>

        <div className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How It Works</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
          <a href="#login" className={styles.mobileBtn} onClick={() => setMenuOpen(false)}>Login</a>
          <a href="#signup" className={styles.mobileBtn} onClick={() => setMenuOpen(false)}>Register</a>
        </div>

        <div className={styles.navActions}>
          <a href="#login" className={styles.navLink}>Login</a>
          <a href="#signup" className={styles.ctaBtn}>Get Started</a>
        </div>

        <button
          className={`${styles.hamburger} ${menuOpen ? styles.active : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
