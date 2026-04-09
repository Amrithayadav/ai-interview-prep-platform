import React from 'react'
import styles from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="11" width="4" height="7" rx="1.5" fill="white"/>
              <rect x="8" y="7" width="4" height="11" rx="1.5" fill="white"/>
              <rect x="14" y="2" width="4" height="16" rx="1.5" fill="white"/>
            </svg>
          </div>
          <span>AI Interview Prep</span>
        </div>
        <p className={styles.copy}>© 2024 AI Interview Prep. All rights reserved</p>
        <div className={styles.links}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
