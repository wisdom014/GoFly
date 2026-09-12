import { useState } from "react";
import "../styles/login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // handle login
  }

  return (
    <main className="login-page">
      {/* Hero Banner */}
      <div className="login-hero">
        <div className="login-hero-overlay" />
        <div className="login-hero-content">
          <h1>My account</h1>
          <nav className="login-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">•</span>
            <span>My account</span>
          </nav>
        </div>
      </div>

      {/* Sign In Card */}
      <div className="login-card-wrap">
        <div className="login-card">
          <h2>Sign In</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <input
                type="text"
                id="username"
                placeholder="User name or Email *"
                required
                autoComplete="username"
              />
            </div>

            <div className="login-field login-field--password">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((p) => !p)}
              >
                {showPassword ? "👁" : "🚫"}
              </button>
            </div>

            <div className="login-actions">
              <button type="submit" className="login-btn">LOG IN</button>
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>
            </div>

            <a className="lost-password" href="/forgot-password">
              Lost your password?
            </a>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;
