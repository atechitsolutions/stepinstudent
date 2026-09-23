import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, ArrowUpRight } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/login',
        {
          username,
          password,
        }
      );

      const { token, role } = response.data;

      if (role !== 'ADMIN') {
        setError('You are not authorized as an admin.');
        return;
      }

      localStorage.setItem('adminToken', token);
      localStorage.setItem(
        'adminUsername',
        response.data.username
      );
      localStorage.setItem('adminRole', role);

      navigate('/admin/projects');
    } catch (error) {
      if (error.response?.status === 401) {
        setError('Invalid username or password.');
      } else {
        setError('Unable to connect to the server.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      {/* Background glow */}
      <div style={styles.glowOne}></div>
      <div style={styles.glowTwo}></div>

      {/* Header */}
      <header style={styles.header}>

        <button
          type="button"
          style={styles.brand}
          onClick={() => navigate('/')}
        >
          <span>A</span>-TECH
        </button>

        <button
          type="button"
          style={styles.websiteButton}
          onClick={() => navigate('/')}
        >
          View Website
          <ArrowUpRight size={17} />
        </button>

      </header>

      {/* Login area */}
      <main style={styles.main}>

        <div style={styles.card}>

          {/* Small label */}
          <div style={styles.adminLabel}>
            A-TECH ADMIN
          </div>

          <h1 style={styles.title}>
            Admin Login
          </h1>

          <p style={styles.subtitle}>
            Sign in to manage A-Tech projects.
          </p>

          <form onSubmit={handleLogin}>

            {/* Username */}
            <label style={styles.label}>
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              autoComplete="username"
              style={styles.input}
            />

            {/* Password */}
            <label style={styles.label}>
              Password
            </label>

            <div style={styles.passwordWrapper}>

              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                autoComplete="current-password"
                style={{
                  ...styles.input,
                  paddingRight: '52px',
                }}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                style={styles.passwordToggle}
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

            {/* Error */}
            {error && (
              <div style={styles.error}>
                {error}
              </div>
            )}

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.button,
                opacity: loading ? 0.65 : 1,
                cursor: loading
                  ? 'not-allowed'
                  : 'pointer',
              }}
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>

          </form>

        </div>

      </main>

      {/* Footer */}
      <div style={styles.footer}>
        A-TECH ADMIN PANEL
      </div>

    </div>
  );
}

const styles = {

  /* =====================================================
     PAGE
     ===================================================== */

  page: {
    minHeight: '100vh',
    width: '100%',
    position: 'relative',
    overflow: 'hidden',

    display: 'flex',
    flexDirection: 'column',

    background:
      'radial-gradient(circle at 85% 20%, rgba(221, 57, 180, 0.30), transparent 35%), radial-gradient(circle at 15% 80%, rgba(150, 45, 190, 0.22), transparent 35%), linear-gradient(135deg, #10051a 0%, #1a0924 35%, #35103d 70%, #56194f 100%)',

    color: '#ffffff',
  },

  /* =====================================================
     BACKGROUND GLOWS
     ===================================================== */

  glowOne: {
    position: 'absolute',
    width: '420px',
    height: '420px',
    top: '-180px',
    right: '-100px',

    borderRadius: '50%',

    background: 'rgba(226, 61, 184, 0.20)',

    filter: 'blur(80px)',

    pointerEvents: 'none',
  },

  glowTwo: {
    position: 'absolute',
    width: '350px',
    height: '350px',
    bottom: '-180px',
    left: '-120px',

    borderRadius: '50%',

    background: 'rgba(117, 42, 187, 0.22)',

    filter: 'blur(80px)',

    pointerEvents: 'none',
  },

  /* =====================================================
     HEADER
     ===================================================== */

  header: {
    height: '92px',
    padding: '0 55px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderBottom:
      '1px solid rgba(255,255,255,0.10)',

    position: 'relative',
    zIndex: 2,
  },

  brand: {
    border: 'none',
    background: 'transparent',

    color: '#ffffff',

    fontSize: '25px',
    fontWeight: '700',
    letterSpacing: '-0.8px',

    cursor: 'pointer',
  },

  websiteButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',

    padding: '14px 22px',

    border:
      '1px solid rgba(255,255,255,0.22)',

    borderRadius: '30px',

    background:
      'rgba(255,255,255,0.07)',

    color: '#ffffff',

    fontSize: '15px',
    fontWeight: '500',

    cursor: 'pointer',
  },

  /* =====================================================
     MAIN
     ===================================================== */

  main: {
    flex: 1,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    padding: '70px 24px',

    position: 'relative',
    zIndex: 1,
  },

  /* =====================================================
     CARD
     ===================================================== */

  card: {
    width: '100%',
    maxWidth: '500px',

    boxSizing: 'border-box',

    padding: '46px',

    borderRadius: '28px',

    background:
      'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(249,247,250,0.96))',

    color: '#171321',

    boxShadow:
      '0 35px 90px rgba(0,0,0,0.30), 0 10px 30px rgba(0,0,0,0.12)',

    border:
      '1px solid rgba(255,255,255,0.55)',
  },

  /* =====================================================
     ADMIN LABEL
     ===================================================== */

  adminLabel: {
    marginBottom: '13px',

    color: '#a72d92',

    fontSize: '12px',
    fontWeight: '700',

    letterSpacing: '2.5px',
  },

  /* =====================================================
     TITLE
     ===================================================== */

  title: {
    margin: 0,

    color: '#171321',

    fontSize: '42px',
    lineHeight: '1.08',
    letterSpacing: '-1.7px',
  },

  subtitle: {
    marginTop: '13px',
    marginBottom: '32px',

    color: '#6c6675',

    fontSize: '16px',
    lineHeight: '1.6',
  },

  /* =====================================================
     LABEL
     ===================================================== */

  label: {
    display: 'block',

    marginBottom: '9px',
    marginTop: '22px',

    color: '#272231',

    fontSize: '15px',
    fontWeight: '600',
  },

  /* =====================================================
     INPUT
     ===================================================== */

  input: {
    width: '100%',
    height: '60px',

    boxSizing: 'border-box',

    padding: '0 18px',

    border: '1px solid #ddd8e1',
    borderRadius: '13px',

    outline: 'none',

    background: '#ffffff',

    color: '#171321',

    fontSize: '16px',
  },

  /* =====================================================
     PASSWORD
     ===================================================== */

  passwordWrapper: {
    position: 'relative',
    width: '100%',
  },

  passwordToggle: {
    position: 'absolute',

    right: '10px',
    top: '50%',

    transform: 'translateY(-50%)',

    width: '40px',
    height: '40px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    border: 'none',
    borderRadius: '9px',

    background: 'transparent',

    color: '#77717d',

    cursor: 'pointer',
  },

  /* =====================================================
     ERROR
     ===================================================== */

  error: {
    marginTop: '16px',

    padding: '12px 14px',

    borderRadius: '10px',

    background: '#fff0f0',

    border: '1px solid #ffd0d0',

    color: '#b42318',

    fontSize: '14px',
  },

  /* =====================================================
     LOGIN BUTTON
     ===================================================== */

  button: {
    width: '100%',

    height: '58px',

    marginTop: '24px',

    border: 'none',
    borderRadius: '13px',

    background:
      'linear-gradient(135deg, #151220, #28152f)',

    color: '#ffffff',

    fontSize: '16px',
    fontWeight: '600',

    transition:
      'transform 0.2s ease, box-shadow 0.2s ease',
  },

  /* =====================================================
     FOOTER
     ===================================================== */

  footer: {
    position: 'relative',
    zIndex: 2,

    padding: '20px',

    textAlign: 'center',

    color: 'rgba(255,255,255,0.45)',

    fontSize: '11px',
    fontWeight: '600',

    letterSpacing: '2px',
  },
};