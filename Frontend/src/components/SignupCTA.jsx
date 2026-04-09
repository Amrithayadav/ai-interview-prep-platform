import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'
import PasswordInput from '../features/auth/components/PasswordInput'
import styles from './SignupCTA.module.scss'

const benefits = [
  'Boost your confidence with real-time practice',
  'Identify and fill skill gaps with AI analysis',
  'Optimize your resume for ATS systems',
  'Track progress with detailed performance analytics',
]

export default function SignupCTA() {
  const [activeForm, setActiveForm] = useState(null) // null, 'login', or 'register'
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({ username: '', email: '', password: '' })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const { loading, handleLogin, handleRegister } = useAuth()
  const navigate = useNavigate()

  // Check URL hash to determine initial form
  useEffect(() => {
    const hash = window.location.hash
    if (hash === '#login') {
      setActiveForm('login')
    } else if (hash === '#signup') {
      setActiveForm('register')
    }
  }, [])

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    const res = await handleLogin(loginForm)
    if (res.success) {
      setMessage('Login successful! Redirecting...')
      setTimeout(() => navigate('/home'), 1000)
    } else {
      setError(res.message)
    }
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')

    const result = await handleRegister(registerForm)
    if (result === true) {
      setMessage('Account created successfully! Switching to login...')
      setTimeout(() => {
        setActiveForm('login')
        setRegisterForm({ username: '', email: '', password: '' })
        setLoginForm({ email: registerForm.email, password: registerForm.password })
      }, 1500)
    } else {
      setError(result || 'Registration failed')
    }
  }

  const resetForms = () => {
    setActiveForm(null)
    setLoginForm({ email: '', password: '' })
    setRegisterForm({ username: '', email: '', password: '' })
    setMessage('')
    setError('')
  }

  return (
    <section className={styles.section} id="signup">
      <div id="login" style={{ position: 'absolute', top: '-80px' }}></div>
      <div className={styles.container}>
        <div className={styles.left}>
          <span className={styles.tag}>Get Started Today</span>
          <h2 className={styles.title}>Start Your Interview Prep Journey Today</h2>
          <ul className={styles.benefits}>
            {benefits.map(b => (
              <li key={b} className={styles.benefit}>
                <div className={styles.check}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="#3fb950" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.card}>
          {activeForm === null ? (
            <div className={styles.authOptions}>
              <h3 className={styles.formTitle}>Create your free account</h3>
              <p className={styles.description}>Join thousands of developers preparing for their dream jobs</p>
              <div className={styles.buttonGroup}>
                <button
                  className={styles.authButton}
                  onClick={() => setActiveForm('register')}
                >
                  Sign Up Free
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  className={`${styles.authButton} ${styles.secondary}`}
                  onClick={() => setActiveForm('login')}
                >
                  Already have an account? Login
                </button>
              </div>
              <p className={styles.noCard}>No credit card required</p>
            </div>
          ) : activeForm === 'login' ? (
            <form onSubmit={handleLoginSubmit} className={styles.form}>
              <div className={styles.formHeader}>
                <h3 className={styles.formTitle}>Welcome Back</h3>
                <button type="button" className={styles.backButton} onClick={resetForms}>
                  ← Back
                </button>
              </div>

              {message && <p className={styles.success}>{message}</p>}
              {error && <p className={styles.error}>{error}</p>}

              <div className={styles.field}>
                <label>Email <span className={styles.req}>*</span></label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={loginForm.email}
                  onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
                  disabled={loading}
                />
              </div>
              <div className={styles.field}>
                <label>Password <span className={styles.req}>*</span></label>
                <PasswordInput
                  value={loginForm.password}
                  onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="Enter your password"
                  showStrength={false}
                />
              </div>
              <button type="submit" className={styles.submit} disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className={styles.form}>
              <div className={styles.formHeader}>
                <h3 className={styles.formTitle}>Create Account</h3>
                <button type="button" className={styles.backButton} onClick={resetForms}>
                  ← Back
                </button>
              </div>

              {message && <p className={styles.success}>{message}</p>}
              {error && <p className={styles.error}>{error}</p>}

              <div className={styles.field}>
                <label>Username <span className={styles.req}>*</span></label>
                <input
                  type="text"
                  placeholder="Choose a username"
                  required
                  value={registerForm.username}
                  onChange={e => setRegisterForm({ ...registerForm, username: e.target.value })}
                  disabled={loading}
                />
              </div>
              <div className={styles.field}>
                <label>Email <span className={styles.req}>*</span></label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={registerForm.email}
                  onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })}
                  disabled={loading}
                />
              </div>
              <div className={styles.field}>
                <label>Password <span className={styles.req}>*</span></label>
                <PasswordInput
                  value={registerForm.password}
                  onChange={e => setRegisterForm({ ...registerForm, password: e.target.value })}
                  placeholder="Create a strong password"
                  showStrength={true}
                />
              </div>
              <button type="submit" className={styles.submit} disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
