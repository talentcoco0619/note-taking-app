import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import DashboardPage from './pages/Dashboard';

const AppRoutes: React.FC = () => {
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  return (
    <Routes>
      {/* Default route redirects to Login */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Login Page */}
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} />

      {/* Register Page */}
      <Route path="/register" element={isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />} />

      {/* Dashboard Page - Accessible only if the user is authenticated */}
      <Route
        path="/dashboard"
        element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" replace />}
      />

      {/* 404 Not Found */}
      <Route
        path="*"
        element={
          <div className="flex justify-center items-center min-h-screen">
            <h1 className="text-xl font-bold">404 - Page Not Found</h1>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
