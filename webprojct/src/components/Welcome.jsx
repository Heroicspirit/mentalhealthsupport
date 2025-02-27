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
            <li><a href="#" onClick={() => scrollToSection('contact-info')}>Contact</a></li>
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

      <section id="services" className="services">
        <h2>Our Support Services</h2>
        <div className="service" data-url="mindfulness.html">
          <h3>Mindfulness Programs</h3>
          <p>Learn techniques for stress management regulations through guided practices.</p>
        </div>
        <div className="service-gallery">
          <img src="/src/assets/therapy.jpg" alt="Counseling Session" />
          <img src="/src/assets/happy.jpg" alt="Meditation Outdoors" />
          <img src="/src/assets/group.jpg" alt="Group Therapy" />
        </div>
      </section>

      <footer>
        <div className="footer-container">
          <div className="footer-left">
            <p>Supporting your mental journey with professional care and compassion.</p>
          </div>
          <div className="footer-right" id="contact-info">
            <div className="quick-links">
              <h4>Quick Links</h4>
              <a href="#">Home</a>
              <a href="#">About Us</a>
              <a href="#">Services</a>
              <a href="#" onClick={() => scrollToSection('contact-info')}>Contact</a>
            </div>
            <div className="contact-info">
              <h4>Contact</h4>
              <p>123 Healing Street</p>
              <p>Wellness City, WC 12345</p>
              <p>Email: info@mentalhealth.com</p>
              <p>Tel: (555) 123-4567</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;
