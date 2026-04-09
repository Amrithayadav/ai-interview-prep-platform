import React from 'react'
import styles from './TechStack.module.scss'

const techs = [
  { name: 'React.js', icon: '⚛️', color: '#61dafb' },
  { name: 'Node.js', icon: '🟢', color: '#68a063' },
  { name: 'Express.js', icon: '🚂', color: '#ffffff' },
  { name: 'MongoDB', icon: '🍃', color: '#4db33d' },
  { name: 'Gemini AI', icon: '✨', color: '#8ab4f8' },
  { name: 'OpenAI', icon: '🔮', color: '#ffffff' },
]

export default function TechStack() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Built with modern technologies</h2>
        <p className={styles.sub}>Leveraging the latest in AI and web development to power your interview prep</p>
        <div className={styles.chips}>
          {techs.map(t => (
            <div key={t.name} className={styles.chip}>
              <span className={styles.chipIcon}>{t.icon}</span>
              <span className={styles.chipName} style={{ color: t.color }}>{t.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
