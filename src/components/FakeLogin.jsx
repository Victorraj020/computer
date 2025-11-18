import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Temporary demo credentials
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
      // After "login", go to your main page (Dashboard)
      navigate("/dashboard");
    } else {
      setError("Invalid credentials. Use username: testuser, password: 123456");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#020617",
        color: "#e5e7eb",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        padding: "24px",
      }}
    >
      {/* Main container: left gradient shapes, right login card */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          minHeight: "80vh",
          display: "flex",
          alignItems: "stretch",
          justifyContent: "space-between",
          gap: "40px",
        }}
      >
        {/* Left decorative gradients */}
        <div
          style={{
            flex: 1,
            height: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-120px",
              left: "-80px",
              width: "280px",
              height: "280px",
              borderRadius: "999px",
              background:
                "linear-gradient(135deg, #4f46e5 0%, #ec4899 50%, #f97316 100%)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-140px",
              left: "40px",
              width: "420px",
              height: "260px",
              borderRadius: "260px",
              background:
                "linear-gradient(135deg, #6366f1 0%, #ec4899 60%, #f97316 100%)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.7)",
            }}
          />
        </div>

        {/* Right login form */}
        <div
          style={{
            flexBasis: "380px",
            backgroundColor: "#020617",
            borderRadius: "12px",
            padding: "32px 32px 28px",
            boxShadow: "0 30px 70px rgba(0,0,0,0.85)",
            border: "1px solid rgba(148,163,184,0.25)",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: 600,
              marginBottom: "20px",
              textAlign: "right",
              color: "#f9fafb",
            }}
          >
            User Login
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "12px" }}>
              <label
                htmlFor="username"
                style={{
                  display: "block",
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#9ca3af",
                  marginBottom: "4px",
                }}
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                style={{
                  width: "100%",
                  padding: "9px 11px",
                  borderRadius: "4px",
                  border: "1px solid #1f2937",
                  backgroundColor: "#020617",
                  color: "#e5e7eb",
                  fontSize: "14px",
                  outline: "none",
                }}
                placeholder="username"
              />
            </div>

            <div style={{ marginBottom: "8px" }}>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  fontSize: "12px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: "#9ca3af",
                  marginBottom: "4px",
                }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                style={{
                  width: "100%",
                  padding: "9px 11px",
                  borderRadius: "4px",
                  border: "1px solid #1f2937",
                  backgroundColor: "#020617",
                  color: "#e5e7eb",
                  fontSize: "14px",
                  outline: "none",
                }}
                placeholder="password"
              />
            </div>

            {error && (
              <p
                style={{
                  fontSize: "12px",
                  color: "#dc2626",
                  marginTop: "2px",
                  marginBottom: "6px",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              style={{
                marginTop: "10px",
                width: "100%",
                padding: "9px 12px",
                borderRadius: "999px",
                border: "none",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
                background:
                  "linear-gradient(90deg, #4f46e5 0%, #ec4899 50%, #f97316 100%)",
                color: "#f9fafb",
                boxShadow: "0 12px 30px rgba(248,113,113,0.45)",
              }}
            >
              Login
            </button>
          </form>

          <p
            style={{
              marginTop: "10px",
              fontSize: "11px",
              color: "#9ca3af",
              textAlign: "right",
            }}
          >
            Use demo: <strong>testuser</strong> / <strong>123456</strong>
          </p>

          <p
            style={{
              marginTop: "26px",
              fontSize: "11px",
              color: "#6b7280",
              textAlign: "right",
            }}
          >
            Signup / create new account &gt;
          </p>
        </div>
      </div>
    </div>
  );
}


