import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import PropertiesPage from './Pages/PropertiesPage';
import PropertyDetails from './Pages/PropertyDetails';
import Dashboard from './Pages/Dashboard';
import AdminPanel from './Pages/AdminPanel';
import ProtectedRoute from './Component/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          {/* PROTECTED ROUTES */}
          <Route path="/properties" element={
            <ProtectedRoute>
              <PropertiesPage />
            </ProtectedRoute>
          } />
          <Route path="/properties/:id" element={
            <ProtectedRoute>
              <PropertyDetails />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } />
          {/* <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPanel />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;