import React, { useEffect } from 'react';
import './Welcome.css';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateToLogin = () => {
    window.location.href = "/login";
  };

  const navigateToAdminLogin = () => {
    window.location.href = "/adminlogin";
  };

  useEffect(() => {
    const helpButton = document.getElementById("get-help-btn");
    if (helpButton) {
      helpButton.addEventListener("click", navigateToLogin);
    }

    return () => {
      if (helpButton) {
        helpButton.removeEventListener("click", navigateToLogin);
      }
    };
  }, []);

  return (
    <div>
      <header className="navbar">
        <nav>
          <ul className="left-nav">
            <li><a href="#" data-section="hero">Home</a></li>
            <li><a href="#" data-section="services">About Us</a></li>
            <li><a href="#" data-section="contact">Contact</a></li>
          </ul>

          <button className="admin-login-btn" onClick={navigateToAdminLogin}>
            Admin Login
          </button>
        </nav>
      </header>

      <section className="hero" id="hero">
        <div className="hero-content">
          <h1>Your Mental Health Matters</h1>
          <p>Take the first step towards better mental health. Our professional team is here to support you on your journey to wellness.</p>
          <button id="get-help-btn" onClick={navigateToLogin}>Get Help Now</button>
        </div>
        <div className="hero-image">
          <img src="/src/assets/MHS.jpg" alt="Mental Health Illustration" />
        </div>
      </section>
    </div>
  );
};

export default Welcome;
