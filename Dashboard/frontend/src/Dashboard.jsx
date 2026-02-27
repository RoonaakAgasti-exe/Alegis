import React, { useState, useEffect } from "react";
import { Shield, Mail, FileText, Lock, AlertTriangle, Globe, Key, Eye, Zap, Image } from "lucide-react";
import "./Dashboard.css";
import ProjectDashboard from "./ProjectDashboard.jsx";
import Chatbot from "./Chatbot.jsx";

function Dashboard({ user = { username: "User", email: "user@example.com" }, onLogout }) {
  const [section, setSection] = useState("overview");
  const [selectedModel, setSelectedModel] = useState(null);
  const [modelLoading, setModelLoading] = useState(false);
  const [modelError, setModelError] = useState(null);
  const aiModels = [
    {
      id: 1,
      name: "DeepFake Detection",
      description: "Advanced AI model that detects manipulated media and deepfake content with high precision.",
      accuracy: "96%",
      icon: Image,
      status: "Online",
      route: "/deepfake-detection"
    },
    {
      id: 2,
      name: "Email Detection",
      description: "Scans emails for phishing attempts, malicious links, and suspicious content patterns.",
      accuracy: "94%",
      icon: Mail,
      status: "Online",
      route: "/email-detection"
    },
    {
      id: 3,
      name: "File Encryption",
      description: "Secure file encryption and decryption using advanced cryptographic algorithms.",
      accuracy: "100%",
      icon: Lock,
      status: "Online",
      route: "/file-encryption"
    },
    {
      id: 4,
      name: "Fraud Detection",
      description: "Real-time fraud detection system that analyzes transactions and identifies suspicious patterns.",
      accuracy: "89%",
      icon: AlertTriangle,
      status: "Online",
      route: "/fraud-detection"
    },
    {
      id: 6,
      name: "File Integrity Checker",
      description: "Generate and verify SHA-256 fingerprints to detect unauthorized file changes.",
      accuracy: "99.9%",
      icon: Shield,
      status: "Online",
      route: "/file-integrity"
    },
    {
      id: 7,
      name: "Password Generator",
      description: "Generates strong, secure passwords with customizable complexity and length requirements.",
      accuracy: "N/A",
      icon: Key,
      status: "Online",
      route: "/password-generator"
    },
    {
      id: 8,
      name: "Password Strength Analyzer",
      description: "Analyzes password strength and provides recommendations for improving security.",
      accuracy: "N/A",
      icon: Shield,
      status: "Online",
      route: "/password-strength-checker"
    },
    {
      id: 9,
      name: "Dark Web Monitoring",
      description: "Monitors dark web forums, marketplaces, and underground networks for security threats and data breaches.",
      accuracy: "93%",
      icon: Eye,
      status: "Online",
      route: "/dark-web-monitoring"
    },
    {
      id: 10,
      name: "Steganography Detection",
      description: "Detects hidden messages and data embedded within images and other media files.",
      accuracy: "88%",
      icon: Zap,
      status: "Online",
      route: "/steganography"
    }
  ];

  const handleSecurityAlert = async () => {
    const confirmed = window.confirm('Confirm: Alert security about a potential data breach?');
    if (!confirmed) return;
    try {
      const overlay = document.createElement('div');
      overlay.className = 'panic-overlay';
      overlay.innerHTML = `
        <div class="panic-text">
          <div class="title">SECURITY ALERT</div>
          <div class="subtitle">Security has been notified</div>
        </div>
      `;
      document.body.appendChild(overlay);
      setTimeout(() => {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }, 3000);

      const payload = {
        message: 'User triggered panic alert: potential data breach',
        severity: 'high',
        actorEmail: user?.email,
        context: {
          section,
          location: window.location.href,
        },
      };
      const resp = await fetch('http://localhost:5007/api/alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await resp.json();
      const notification = document.createElement('div');
      notification.innerHTML = `
        <div style="
          position: fixed;
          top: 100px;
          right: 20px;
          background: rgba(220, 38, 38, 0.95);
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          z-index: 10000;
          font-family: 'Inter', sans-serif;
          backdrop-filter: blur(10px);
        ">
          ${resp.ok ? 'Security has been alerted.' : 'Failed to alert security.'}
        </div>
      `;
      document.body.appendChild(notification);
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 3000);
      if (!resp.ok) {
        console.error('Alert error:', data);
      }
    } catch (err) {
      console.error('Alert request failed:', err);
      alert('Failed to send alert. Please contact security directly.');
    }
  };

  const handleModelClick = (model) => {
    const modelUrls = {
      '/deepfake-detection': 'http://localhost:3008',
      '/email-detection': 'http://localhost:5000',
      '/file-encryption': 'http://localhost:3003',
      '/fraud-detection': 'http://localhost:3004',
      '/file-integrity': 'http://localhost:5001',
      '/password-generator': 'http://localhost:3005',
      '/password-strength-checker': 'http://localhost:3006',
      '/dark-web-monitoring': 'http://localhost:5002',
      '/steganography': 'http://localhost:3007'
    };

    const url = modelUrls[model.route];

    if (url) {
      setSelectedModel({ ...model, url });
      setModelLoading(true);
      setModelError(null);
      setSection('models');
    } else {
      alert(`${model.name} interface is not currently available. Please ensure the ML model server is running.`);
    }
  };
  
  const handleIframeLoad = () => {
    setModelLoading(false);
    setModelError(null);
  };

  const handleIframeError = () => {
    setModelLoading(false);
    setModelError('Service unavailable. Please ensure the model server is running.');
  };

  useEffect(() => {
    if (selectedModel && modelLoading) {
      const timer = setTimeout(() => {
        // If it still hasn't loaded after 10 seconds, show error
        if (modelLoading) {
          setModelError('Service is taking longer than expected to respond. Please ensure the model server is running.');
        }
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [selectedModel, modelLoading]);

  return (
    <div className="dashboard-container">
      <nav className="floating-nav">
        <div className="nav-left">
          <div className="nav-brand">
            <a
              href="http://localhost:3000/"
              aria-label="Home"
              className="relative w-7 h-7 flex items-center justify-center rounded-md overflow-hidden group"
            >
              <div className="absolute inset-0 rounded-md ring-1 ring-white/20 bg-gradient-to-br from-white/10 to-transparent group-hover:ring-white/30 transition-all"></div>
              <div className="absolute w-1.5 h-1.5 bg-blue-400/80 rounded-sm top-1 left-1 blur-[1px]"></div>
              <span className="relative text-[10px] font-semibold tracking-tight text-white/90">AL</span>
            </a>
            <span className="brand-text normal-case">Alegis</span>
          </div>

          <div className="nav-links">
            <a href="#" className={`nav-link ${section === "overview" ? "active" : ""}`} onClick={(e) => { e.preventDefault(); setSection("overview"); }}>Dashboard</a>
            <a href="#" className={`nav-link ${section === "models" ? "active" : ""}`} onClick={(e) => { e.preventDefault(); setSection("models"); }}>Models</a>
            <a href="#" className={`nav-link ${section === "chatbot" ? "active" : ""}`} onClick={(e) => { e.preventDefault(); setSection("chatbot"); }}>Chatbot</a>
          </div>

          <div className="nav-actions">
            <button className="nav-btn alert-btn" onClick={handleSecurityAlert}>Alert Security</button>
          </div>
        </div>

        <div className="nav-right">
          <div className="user-info">
            <span className="user-email">{user.email}</span>
            <button className="logout-btn" onClick={onLogout}>Logout</button>
          </div>
        </div>
      </nav>

      <div className="main-content">
        <div className="content">
          <div className="header-section">
            <h1 className="main-title">
              {section === "overview" ? "Dashboard" : section === "models" ? "Our AI Models" : "Alegis AI Assistant"}
            </h1>
            <p className="main-description">
              {section === "overview"
                ? "Overview of all active services, environments, and AI model endpoints. Launch tools from the nav, check backend health, and quickly access the homepage, APIs, and ML interfaces—everything you need to monitor and operate the project in one place."
                : section === "models" 
                ? "Discover our comprehensive suite of AI-driven cybersecurity tools designed to protect, detect, and respond to modern threats."
                : "Ask questions, get security advice, and interact with our specialized cybersecurity AI assistant."}
            </p>
          </div>

          {section === "overview" ? (
            <ProjectDashboard />
          ) : section === "chatbot" ? (
            <Chatbot />
          ) : selectedModel ? (
            <div className="model-iframe-container">
              <div className="model-iframe-header">
                <div className="model-iframe-title">Models: {selectedModel.name}</div>
                <button className="model-iframe-back" onClick={() => setSelectedModel(null)}>
                  Back to Models
                </button>
              </div>
              <div className="iframe-wrapper" style={{ position: 'relative', height: '100%', minHeight: '600px' }}>
                {modelLoading && (
                  <div className="model-loading-overlay" style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(15, 23, 42, 0.8)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 10,
                    color: 'white'
                  }}>
                    <div className="spinner" style={{
                      width: '40px',
                      height: '40px',
                      border: '4px solid rgba(255,255,255,0.1)',
                      borderTop: '4px solid #3b82f6',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      marginBottom: '16px'
                    }}></div>
                    <p>{modelError || 'Loading model interface...'}</p>
                    {modelError && (
                      <button 
                        onClick={() => {
                          setModelLoading(true);
                          setModelError(null);
                          const currentUrl = selectedModel.url;
                          setSelectedModel({...selectedModel, url: ''});
                          setTimeout(() => setSelectedModel({...selectedModel, url: currentUrl}), 10);
                        }}
                        style={{
                          marginTop: '16px',
                          padding: '8px 16px',
                          background: '#3b82f6',
                          borderRadius: '6px',
                          border: 'none',
                          color: 'white',
                          cursor: 'pointer'
                        }}
                      >
                        Retry Connection
                      </button>
                    )}
                  </div>
                )}
                <iframe
                  className="model-iframe"
                  src={selectedModel.url}
                  title={selectedModel.name}
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  style={{ width: '100%', height: '100%', border: 'none', minHeight: '600px' }}
                />
              </div>
            </div>
          ) : (
            <div className="models-grid">
              {aiModels.map((model) => {
                const IconComponent = model.icon;
                return (
                  <div
                    key={model.id}
                    className="model-card"
                    onClick={() => handleModelClick(model)}
                    style={{ cursor: 'pointer' }}
                    data-model={model.route.replace('/', '')}
                  >
                    <div className="card-header">
                      <div className="card-icon">
                        <IconComponent size={24} />
                      </div>
                      <div className="status-badge">
                        <span className="status-dot"></span>
                        {model.status}
                      </div>
                    </div>
                    <div className="card-content">
                      <h3 className="card-title">{model.name}</h3>
                      <p className="card-description">{model.description}</p>
                    </div>
                    <div className="card-footer">
                      <div className="accuracy">
                        <span className="accuracy-label">Accuracy:</span>
                        <span className="accuracy-value">{model.accuracy}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
