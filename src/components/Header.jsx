import React, { useState } from 'react';
import logo from '../assets/GCFlogo.png';
import logo3 from '../assets/Glogo.png';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleLogout = () => {
    // Clear any stored auth data if you add it later
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    } catch (e) {
      // ignore storage errors
    }
    // Go back to fake login page
    navigate("/fake-login");
  };

  // Navigation items (removed "About Us")
  const navItems = [
    { path: "/", link: "HOME" },
    { path: "/dashboard", link: "PRODUCTS" },
    { path: "/Blogs", link: "GUIDE" },
    { path: "/#faq", link: "FAQ's" },
    // { path: "/contact", link: "PRODUCT STATUS" },
  ];

  return (
    <div style={{ 
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, 
      background: "rgba(0, 0, 0, 0.8)",  // Dark transparent background
      backdropFilter: "blur(10px)",  // Subtle blur for a premium look
      padding: "10px 0",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      width: "100%", borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
    }}> 
      
      {/* Left Side - Logo */}
      <div style={{ display: "flex", alignItems: "center", cursor: "pointer", paddingLeft: "20px" }} onClick={() => navigate("/")}>
        <img src={logo} width={30} alt="Logo" />
        <img src={logo3} style={{ height: "40px", marginLeft: "10px" }} alt="GC Logo" />
      </div>

      {/* Navigation Links */}
      <nav style={{ flex: 1, textAlign: "center" }}>
        <ul style={{ 
          display: "flex", justifyContent: "center", gap: "30px", 
          listStyle: "none", margin: 0, padding: 0
        }}>
          {navItems.map(({ path, link }) => (
            <li key={link} style={{ position: "relative" }}>
              <NavLink 
                to={path}
                onClick={() => {
                  setIsNavOpen(false);
                  if (path.startsWith("/#")) {
                    const id = path.split("#")[1];
                    const element = document.getElementById(id);
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "500",
                  fontSize: "15px",
                  letterSpacing: "1px",
                  padding: "10px 0",
                  transition: "0.3s",
                  position: "relative",
                  ...(isActive && { color: "#cccccc" })  // Light gray on active
                })}
                onMouseEnter={(e) => e.target.style.borderBottom = "2px solid white"}
                onMouseLeave={(e) => e.target.style.borderBottom = "none"}
              >
                {link}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <button
        type="button"
        onClick={handleLogout}
        style={{
          marginRight: "20px",
          padding: "6px 14px",
          borderRadius: "999px",
          border: "1px solid rgba(248, 250, 252, 0.6)",
          background:
            "linear-gradient(135deg, rgba(148, 163, 184, 0.2), rgba(51, 65, 85, 0.7))",
          color: "#e5e7eb",
          fontSize: "13px",
          fontWeight: 500,
          cursor: "pointer",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          boxShadow: "0 4px 10px rgba(15, 23, 42, 0.6)",
        }}
      >
        Logout
      </button>

      {/* Hamburger Menu (Mobile) */}
      <button 
        style={{
          background: "transparent", border: "none", color: "white",
          fontSize: "24px", marginRight: "20px", cursor: "pointer", display: "none"
        }} 
        onClick={() => setIsNavOpen(!isNavOpen)}
      >
        ☰
      </button>
    </div>
  );
}
