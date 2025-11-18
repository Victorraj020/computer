import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";

const DEMO_USERNAME = "testuser";
const DEMO_PASSWORD = "123456";

export default function FakeLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
      setError("");
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Use username: testuser, password: 123456");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-avatar">
          <div className="login-avatar-inner"></div>
        </div>
        <p className="login-title">User Login</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-label" htmlFor="username">
              Email ID
            </label>
            <div className="login-input-wrap">
              <span className="login-icon">✉️</span>
              <input
                id="username"
                type="text"
                className="login-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                placeholder="Email ID"
              />
            </div>
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="password">
              Password
            </label>
            <div className="login-input-wrap">
              <span className="login-icon">🔒</span>
              <input
                id="password"
                type="password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Password"
              />
            </div>
            {error && <p className="Login-error">{error}</p>}
          </div>

          <div className="login-utility">
            <label className="remember-wrap">
              <input type="checkbox" /> Remember me
            </label>
            <button type="button" className="forgot-btn">
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="login-submit">
            LOGIN
          </button>
        </form>

        <p className="login-demo">
          Use demo: <span>testuser / 123456</span>
        </p>
        <p className="login-signup">Signup / create new account &gt;</p>
      </div>
    </div>
  );
}
