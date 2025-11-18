import React, { useState } from "react";
import Header from "./Header";

const Blogs = () => {
  const [theme, setTheme] = useState("light");
  
  // Steps for building a computer
  const steps = [
    {
      step: 1,
      title: "Choose Your Components",
      description: "Select your CPU, GPU, motherboard, RAM, storage, and power supply.",
      extra: "Think about your budget and target resolution (1080p, 1440p, or 4K) before you pick parts.",
    },
    {
      step: 2,
      title: "Prepare the Motherboard",
      description: "Install the CPU, RAM, and cooler on the motherboard before placing it in the case.",
      extra: "Double‑check the CPU socket alignment and make sure RAM sticks are fully clicked into place.",
    },
    {
      step: 3,
      title: "Install the Power Supply",
      description: "Place the power supply in the case and connect the necessary power cables.",
      extra: "Route the 24‑pin motherboard and 8‑pin CPU cables early to keep cable management clean.",
    },
    {
      step: 4,
      title: "Install the Storage",
      description: "Add your storage devices (SSD, HDD) and connect them to the motherboard.",
      extra: "Use an NVMe SSD for your operating system to get much faster boot and load times.",
    },
    {
      step: 5,
      title: "Install the GPU",
      description: "Place your GPU in the PCIe slot and connect power cables if needed.",
      extra: "Secure the GPU with case screws and make sure any PCIe power connectors are firmly attached.",
    },
    {
      step: 6,
      title: "Connect the Peripherals",
      description: "Attach the monitor, keyboard, mouse, and other peripherals.",
      extra: "If your monitor supports it, use DisplayPort or HDMI 2.1 to unlock higher refresh rates.",
    },
    {
      step: 7,
      title: "Boot and Test",
      description: "Power on the system, enter the BIOS to check the hardware, and install your OS.",
      extra: "Run a few stress tests and temperature checks to confirm everything is stable and properly cooled.",
    },
  ];
// 
  // YouTube video links (add your own)
  // const videos = [
  //   {
  //     id: 2,
  //     title: "How to Overclock Your CPU",
  //     url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  //   },
  // ];

  return (
    <div style={styles.container(theme)}>
      <Header />
      
      {/* Theme Selector */}
      <div style={styles.themeToggle}>
        <label>
          Theme:
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={styles.select}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="high-contrast">High Contrast</option>
          </select>
        </label>
      </div>

      {/* Steps to Build a Computer */}
      <div style={styles.stepsSection}>
        {/* Left intro / hero column */}
        <div style={styles.heroColumn}>
          <p style={styles.heroEyebrow}>Build your own PC</p>
          <h2 style={styles.stepsTitle}>How to Build a Computer</h2>
          <p style={styles.stepsSubtitle}>
            A simple, step‑by‑step walkthrough of the full build process. Work your way
            from choosing parts to powering on for the first time.
          </p>
        </div>

        {/* Right stacked service-like cards */}
        <div className="steps-scroll" style={styles.stepsColumn}>
          {steps.map((step) => (
            <button
              key={step.step}
              type="button"
              style={styles.stepCard}
            >
              <div style={styles.stepBadge}>Step {step.step}</div>
              <div style={styles.stepContent}>
                <h3 style={styles.stepTitle}>{step.title}</h3>
                <p style={styles.stepDescription}>{step.description}</p>
                <p style={styles.stepExtra}>{step.extra}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Instructional Videos */}
      {/* <div style={styles.videosSection}>
        <h2>Instructional Videos</h2>
        <div style={styles.videoList}>
          {videos.map((video) => (
            <div key={video.id} style={styles.videoCard}>
              <iframe
                src={video.url}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={styles.iframe}
              ></iframe>
              <p>{video.title}</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

// Inline styles for the component
const styles = {
  container: (theme) => ({
    fontFamily: "'Arial', sans-serif",
    padding: "20px 40px 40px",
    backgroundColor:
      theme === "light" ? "#020617" : theme === "dark" ? "#020617" : "#000",
    color: "#f9fafb",
    minHeight: "100vh",
  }),

  themeToggle: {
    marginBottom: "20px",
  },

  stepsSection: {
    marginTop: "80px",
    display: "flex",
    gap: "56px",
    alignItems: "flex-start",
  },

  heroColumn: {
    flex: "0 0 40%",
    maxWidth: "420px",
    position: "sticky",
    top: "120px",
  },

  heroEyebrow: {
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    color: "#38bdf8",
    marginBottom: "6px",
  },

  stepsTitle: {
    fontSize: "30px",
    fontWeight: 800,
    marginBottom: "8px",
    color: "#f9fafb",
  },

  stepsSubtitle: {
    fontSize: "14px",
    color: "#9ca3af",
    lineHeight: 1.7,
  },

  stepsColumn: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    maxHeight: "calc(100vh - 160px)",
    overflowY: "auto",
    paddingRight: "6px",
  },

  stepCard: {
    display: "flex",
    alignItems: "stretch",
    width: "100%",
    background:
      "linear-gradient(145deg, #020617, #020617)",
    padding: "22px 24px",
    borderRadius: "12px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
    border: "1px solid rgba(148,163,184,0.45)",
    textAlign: "left",
    cursor: "pointer",
    outline: "none",
    transition:
      "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s, background 0.2s",
  },

  stepBadge: {
    alignSelf: "center",
    padding: "4px 14px",
    borderRadius: "999px",
    fontSize: "11px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    background:
      "linear-gradient(90deg, #4f46e5 0%, #ec4899 50%, #f97316 100%)",
    color: "#f9fafb",
    marginRight: "16px",
    whiteSpace: "nowrap",
  },

  stepContent: {
    flex: 1,
  },

  stepTitle: {
    fontSize: "17px",
    fontWeight: 600,
    marginBottom: "6px",
    color: "#e5e7eb",
  },

  stepDescription: {
    fontSize: "13px",
    color: "#9ca3af",
    marginBottom: "6px",
  },

  stepExtra: {
    fontSize: "12px",
    color: "#6b7280",
  },

  videoList: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "60px",
    marginTop: "10px"
  },

  videoCard: {
    background: "#f4f4f4",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    transition: "transform 0.3s, box-shadow 0.3s",
  },

  iframe: {
    width: "100%",
    height: "200px",
    borderRadius: "8px",
  },

  select: {
    padding: "5px 10px",
    marginLeft: "10px",
  },
};

// Hover effects applied via CSS-in-JS
const hoverStyles = {
  stepCardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
  },

  videoCardHover: {
    transform: "scale(1.05)",
    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
  },
};

export default Blogs;
