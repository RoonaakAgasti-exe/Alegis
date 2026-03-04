import React, { useState, useEffect } from "react";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Dashboard from "./Dashboard.jsx";

function App() {
  const [currentView, setCurrentView] = useState("login");
  const [user, setUser] = useState(null);
  const [returnTo, setReturnTo] = useState(null);

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    
    try {
      const params = new URLSearchParams(window.location.search);
      const rt = params.get("return_to") || params.get("returnTo") || params.get("return-to");
      if (rt) setReturnTo(rt);
      const view = params.get("view");
      if (view === "signup" || view === "login") {
        setCurrentView(view);
      }
    } catch (e) {
      console.warn("Failed to parse URL params");
    }

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        setCurrentView("dashboard");
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    
    setCurrentView("dashboard");
  };
  
  const handleSignupSuccess = (userData) => {
    setUser(userData);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (returnTo) {
      window.location.href = returnTo;
    } else {
      setCurrentView("login");
    }
  };

  if (currentView === "dashboard" && user) {
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  return (
    <>
      {currentView === "login" ? (
        <Login
          onSwitchToSignup={() => setCurrentView("signup")}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : (
        <Signup 
          onSwitchToLogin={() => setCurrentView("login")} 
          onSignupSuccess={handleSignupSuccess}
        />
      )}
    </>
  );
}

export default App;
