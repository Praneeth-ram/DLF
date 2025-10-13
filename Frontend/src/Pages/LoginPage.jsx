import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import AuthForm from '../Component/auth/AuthForm';

const LoginPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Check for success message from registration
  React.useEffect(() => {
    if (searchParams.get('message') === 'registration_success') {
      setSuccess('Registration successful! Please login with your credentials.');
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    // 🎭 DEMO: Simulate API call to backend
    try {
      // In real app, this would be: await loginUser(formData);
      // For demo, we'll simulate role detection based on email
      let userRole = 'registered';
      
      if (formData.email.includes('admin')) {
        userRole = 'admin';
      } else if (formData.email.includes('owner')) {
        userRole = 'owner';
      }

      // Store user info (in real app, this would be JWT token)
      localStorage.setItem('user', JSON.stringify({
        email: formData.email,
        role: userRole,
        isAuthenticated: true
      }));

      setSuccess(`✅ Login successful! Welcome ${userRole}. Redirecting...`);

      // Redirect based on role
      setTimeout(() => {
        if (userRole === 'admin') {
          navigate('/admin');
        } else {
          navigate('/properties');
        }
      }, 1500);

    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <AuthForm 
      title="🔑 Welcome Back" 
      subtitle="Sign in to access 100,000+ properties"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        {/* Error/Success Messages */}
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

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
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Login Button */}
        <button type="submit" className="auth-btn login-btn">
          Sign In
        </button>

        {/* Demo Credentials Hint */}
        <div style={{ 
          background: '#f8f9fa', 
          padding: '15px', 
          borderRadius: '8px', 
          marginTop: '20px',
          fontSize: '12px',
          color: '#666'
        }}>
          <strong>Demo Tips:</strong><br/>
          • Use "admin@dlf.com" for Admin role<br/>
          • Use "owner@dlf.com" for Property Owner role<br/>
          • Any other email for Registered User role
        </div>

        {/* Register Link */}
        <div className="auth-link">
          Don't have an account? 
          <Link to="/auth/register"> Register here</Link>
        </div>
      </form>
    </AuthForm>
  );
};

export default LoginPage;