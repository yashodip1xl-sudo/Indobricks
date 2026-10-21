import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Eye, EyeOff, Lock, LayoutGrid } from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const { login } = useApp();
  const [email, setEmail] = useState('demo@123gmlal.com');
  const [password, setPassword] = useState('SuperSecretPass123!');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [orgName, setOrgName] = useState('Acme Corporation');
  const [fullName, setFullName] = useState('Devon Vance');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Please enter a valid work email');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      login(email);
    }, 400);
  };

  return (
    <div className="login-page-container">
      {/* Left Hero Pane */}
      <div className="login-hero-pane">
        <div className="login-hero-glow" />

        <div className="login-brand-tag">INDUCTO</div>

        <h1 className="login-hero-headline">
          Every employee knows<br />
          what to do next.
        </h1>

        <p className="login-hero-description">
          Ask any question and get a verified answer, complete your training, and see exactly
          who owns what — as a live graph, not a static chart — with a transparent readiness
          score for every person, team and the org as a whole.
        </p>

        <div className="login-pill-tags">
          <div className="feature-pill">
            <span className="feature-pill-dot" />
            Verified answers
          </div>
          <div className="feature-pill">
            <span className="feature-pill-dot" />
            Live ownership graph
          </div>
          <div className="feature-pill">
            <span className="feature-pill-dot" />
            Readiness score
          </div>
          <div className="feature-pill">
            <span className="feature-pill-dot" />
            Manager & exec views
          </div>
        </div>
      </div>

      {/* Right Form Pane */}
      <div className="login-form-pane">
        <div className="login-card">
          <div className="login-logo-box">
            <LayoutGrid size={28} />
          </div>

          <h2 className="login-title">
            {isRegisterMode ? 'Create your Inducto account' : 'Log In to Inducto'}
          </h2>

          <p className="login-subtitle">
            {isRegisterMode
              ? 'Start with full enterprise governance and live ownership maps.'
              : "One sign-in for everyone. We'll take you to the right place."}
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            {errorMessage && (
              <div
                style={{
                  background: '#fee2e2',
                  border: '1px solid #f87171',
                  color: '#b91c1c',
                  padding: '8px 12px',
                  borderRadius: '6px',
                  fontSize: '13px'
                }}
              >
                {errorMessage}
              </div>
            )}

            {isRegisterMode && (
              <>
                <div className="form-group">
                  <label className="form-label">
                    Full Name <span>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Organisation Name <span>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label className="form-label">
                Email ID <span>*</span>
              </label>
              <input
                type="email"
                className="form-input"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Password <span>*</span>
              </label>
              <div className="form-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="submit-login-btn" disabled={isSubmitting}>
              {isSubmitting ? (
                'Authenticating...'
              ) : (
                <>
                  {isRegisterMode ? 'Create Organisation →' : 'Log In securely →'}
                </>
              )}
            </button>
          </form>

          <div className="login-card-links">
            {!isRegisterMode && (
              <a href="#forgot" className="forgot-password-link" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to ' + email); }}>
                Forgot your password?
              </a>
            )}

            <div className="create-account-link">
              {isRegisterMode ? (
                <>
                  Already registered?{' '}
                  <span style={{ cursor: 'pointer' }} onClick={() => setIsRegisterMode(false)}>
                    Log in here →
                  </span>
                </>
              ) : (
                <>
                  New organisation?{' '}
                  <span style={{ cursor: 'pointer' }} onClick={() => setIsRegisterMode(true)}>
                    Create your account →
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="rate-limit-notice">
            <Lock size={12} />
            <span>Log-in attempts are rate limited and recorded.</span>
          </div>

          <div className="quick-credentials-box">
            <span>Demo: <strong>demo@123gmlal.com</strong></span>
            <button
              className="quick-fill-btn"
              onClick={() => {
                setEmail('demo@123gmlal.com');
                setPassword('InductoDemoPass2026!');
              }}
            >
              Fill Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
