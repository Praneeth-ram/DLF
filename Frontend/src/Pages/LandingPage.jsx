import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "100,000+ Properties",
      description: "Access our extensive portfolio of premium properties across all categories.",
      icon: "🏠"
    },
    {
      title: "Secure Document Access",
      description: "DEMO mode document storage with metadata-only security for sensitive files.",
      icon: "🔒"
    },
    {
      title: "Role-Based Access",
      description: "Different interfaces for public users, registered users, property owners, and admins.",
      icon: "👥"
    },
    {
      title: "Advanced Enquiry System",
      description: "Direct communication between users and property owners with tracking.",
      icon: "💬"
    }
  ];

  return (
    <div className="landing-page">
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2>🏢 DLF Properties</h2>
          </div>
          <div className="nav-buttons">
            <button 
              className="btn btn-outline"
              onClick={() => navigate('/auth/login')}
            >
              Login
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/auth/register')}
            >
              Register
            </button>
          </div>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Premium Property Management</h1>
            <p className="hero-subtitle">
              Managing 100,000+ properties with advanced security, DEMO mode document storage, 
              and role-based access control for optimal user experience.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary btn-large"
                onClick={() => navigate('/auth/register')}
              >
                Get Started
              </button>
              <button 
                className="btn btn-outline btn-large"
                onClick={() => navigate('/auth/login')}
              >
                Existing User
              </button>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <h3>100K+</h3>
              <p>Properties</p>
            </div>
            <div className="stat-item">
              <h3>50K+</h3>
              <p>Users</p>
            </div>
            <div className="stat-item">
              <h3>99.9%</h3>
              <p>Uptime</p>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose DLF Property Management?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of users managing properties efficiently</p>
          <div className="cta-buttons">
            <button 
              className="btn btn-secondary btn-large"
              onClick={() => navigate('/auth/register')}
            >
              Create Account
            </button>
            <button style={{color:'white'}}
              className="btn btn-outline btn-large"
              onClick={() => navigate('/auth/login')}
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 DLF Property Management System. All rights reserved.</p>
          <p>Secure • Scalable • Efficient</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;