import React, { useEffect, useRef } from 'react'
import styles from './HowItWorks.module.scss'

const steps = [
  {
    icon: '📄',
    num: '01',
    title: 'Upload your resume',
    desc: 'Drop your PDF or DOCX and let our AI analyze every detail — formatting, keywords, and content quality.',
    color: '#58a6ff',
  },
  {
    icon: '🤖',
    num: '02',
    title: 'Get AI analysis',
    desc: 'Receive keyword optimization, formatting tips, skill gap analysis, and ATS compatibility scoring.',
    color: '#ff2d78',
    highlight: true,
  },
  {
    icon: '🎯',
    num: '03',
    title: 'Practice & improve',
    desc: 'Take real-time mock interviews with AI-generated questions and get instant detailed feedback.',
    color: '#3fb950',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('[data-animate]').forEach((el, i) => {
              setTimeout(() => {
                el.style.opacity = '1'
                el.style.transform = 'translateY(0)'
              }, i * 150)
            })
          }
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.section} id="how-it-works" ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header} data-animate style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.6s ease, transform 0.6s ease' }}>
          <span className={styles.tag}>Process</span>
          <h2 className={styles.title}>How It Works</h2>
          <p className={styles.sub}>Leveraging the latest in AI and web development to power your interview prep</p>
        </div>

        <div className={styles.connector}>
          <div className={styles.connectorLine} />
        </div>

        <div className={styles.steps}>
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`${styles.card} ${step.highlight ? styles.highlighted : ''}`}
              data-animate
              style={{ opacity: 0, transform: 'translateY(24px)', transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s` }}
            >
              <div className={styles.stepNum} style={{ color: step.color }}>{step.num}</div>
              <div className={styles.iconWrap} style={{ background: `${step.color}18`, border: `1px solid ${step.color}30` }}>
                <span>{step.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{step.title}</h3>
              <p className={styles.cardDesc}>{step.desc}</p>
              {step.highlight && <div className={styles.highlightGlow} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
