import React, { useEffect, useRef } from 'react'
import styles from './Hero.module.scss'

function MockScreen() {
  return (
    <div className={styles.mockWindow}>
      <div className={styles.windowBar}>
        <span className={styles.dot} style={{ background: '#ff5f56' }} />
        <span className={styles.dot} style={{ background: '#ffbd2e' }} />
        <span className={styles.dot} style={{ background: '#27c93f' }} />
        <span className={styles.windowTitle}>AI Interview Prep</span>
      </div>
      <div className={styles.mockBody}>
        <div className={styles.mockSidebar}>
          <div className={styles.sidebarItem}>
            <div className={styles.sidebarIcon}>📄</div>
            <span>Cases</span>
          </div>
          <div className={`${styles.sidebarItem} ${styles.active}`}>
            <div className={styles.sidebarIcon}>🎯</div>
            <span>Prep</span>
          </div>
          <div className={styles.sidebarItem}>
            <div className={styles.sidebarIcon}>📊</div>
            <span>Results</span>
          </div>
        </div>
        <div className={styles.mockContent}>
          <div className={styles.mockPanel}>
            <div className={styles.panelHeader}>
              <span className={styles.panelLabel}>Resume Score</span>
              <span className={styles.scoreBadge}>ATS Ready</span>
            </div>
            <div className={styles.scoreValue}>87<span>%</span></div>
            <div className={styles.scoreBar}>
              <div className={styles.scoreBarFill} style={{ width: '87%' }} />
            </div>
          </div>
          <div className={styles.mockPanel}>
            <div className={styles.panelHeader}><span className={styles.panelLabel}>Skill Match</span></div>
            {[
              { label: 'React', pct: 92, color: '#ff2d78' },
              { label: 'Node.js', pct: 78, color: '#3fb950' },
              { label: 'MongoDB', pct: 65, color: '#58a6ff' },
            ].map(s => (
              <div key={s.label} className={styles.skillRow}>
                <span>{s.label}</span>
                <div className={styles.skillBar}>
                  <div className={styles.skillBarFill} style={{ width: `${s.pct}%`, background: s.color }} />
                </div>
                <span className={styles.skillPct} style={{ color: s.color }}>{s.pct}%</span>
              </div>
            ))}
          </div>
          <div className={styles.mockChat}>
            <div className={styles.chatQ}>
              <div className={styles.chatAvatar}>Q</div>
              <div className={styles.chatBubble}>Explain virtual DOM in React and its advantages...</div>
            </div>
            <div className={styles.chatA}>
              <div className={styles.aiFeedback}>
                <span className={styles.aiLabel}>AI Feedback</span>
                Strong answer! Consider mentioning reconciliation algorithm for extra points.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(20px)'
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    })
  }, [])

  const handleGetStarted = () => {
    window.location.hash = 'signup'
    document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' })
  };

  return (
    <section className={styles.hero} id="features">
      <div className={styles.bg}>
        <div className={styles.glow1} />
        <div className={styles.glow2} />
        <div className={styles.grid} />
      </div>
      <div className={styles.inner} ref={heroRef}>
        <div className={styles.text}>
          <div className={styles.pill}>
            <span className={styles.pillDot} />
            AI-Powered Interview Platform
          </div>
          <h1 className={styles.headline}>
            Everything You Need<br />
            <span className={styles.accent}>to Land the Job</span>
          </h1>
          <p className={styles.sub}>
            Prepare for any interview with AI-powered resume analysis,
            personalized mock interviews, and real-time feedback.
          </p>
          <div className={styles.ctas}>
            <button type="button" onClick={handleGetStarted} className={styles.btnPrimary}>
              Get Started Free
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <a href="#how-it-works" className={styles.btnSecondary}>
              Try Resume Analyzer
            </a>
          </div>
          <div className={styles.stats}>
            {[
              { num: '50K+', label: 'Users prepared' },
              { num: '94%', label: 'Success rate' },
              { num: '200+', label: 'Companies covered' },
            ].map(s => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.visual}>
          <MockScreen />
        </div>
      </div>
    </section>
  )
}
