import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../Component/auth/AuthForm';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const [passwordStrength, setPasswordStrength] = useState('None');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const checkPasswordStrength = (password) => {
    let strength = 'None';
    
    if (password.length >= 8) {
      if (
        password.match(/[a-z]/) &&
        password.match(/[A-Z]/) &&
        password.match(/[0-9]/) &&
        password.match(/[^a-zA-Z0-9]/)
      ) {
        strength = 'Strong';
      } else if (
        password.match(/[a-z]/) &&
        password.match(/[A-Z]/) &&
        password.match(/[0-9]/)
      ) {
        strength = 'Medium';
      } else {
        strength = 'Weak';
      }
    } else if (password.length > 0) {
      strength = 'Weak';
    }
    
    setPasswordStrength(strength);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.terms) {
      setError('Please fill in all fields and accept the terms.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Registration failed');
      }

      setSuccess('✅ Account created successfully! Redirecting to login...');

      setTimeout(() => {
        navigate('/auth/login?message=registration_success');
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthForm 
      title="🚀 Join DLF" 
      subtitle="Create your account to access 100,000+ properties"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        {/* Error/Success Messages */}
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {/* Full Name */}
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Enter your full name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input 
            type="email" 
            className="form-input" 
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label className="form-label">Password</label>
          <input 
            type="password" 
            className="form-input" 
            placeholder="Create a strong password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className="password-strength">
            Password strength: 
            <span className={`strength-${passwordStrength.toLowerCase()}`}>
              {passwordStrength}
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <input 
            type="password" 
            className="form-input" 
            placeholder="Confirm your password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {/* Terms & Conditions */}
        <div className="terms-group">
          <input 
            type="checkbox" 
            className="terms-checkbox" 
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            required
          />
          <label className="terms-text">
            I agree to the <a href="#">Terms of Service</a> and 
            <a href="#"> Privacy Policy</a>. I understand that I must verify 
            property ownership through proper channels.
          </label>
        </div>

        {/* Register Button */}
        <button type="submit" className="auth-btn">
          Create Account
        </button>

        {/* Login Link */}
        <div className="auth-link">
          Already have an account? 
          <Link to="/auth/login"> Login here</Link>
        </div>
      </form>
    </AuthForm>
  );
};

export default RegisterPage;
