import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { VentureProvider } from './context/VentureContext';
import { NotificationProvider } from './context/NotificationContext';
import { EnquiryProvider } from './context/EnquiryContext';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';
import { OnboardingPage } from './pages/auth/OnboardingPage';

// Dashboard Pages
import { DashboardLayout } from './components/layout/DashboardLayout';
import { FounderDashboard } from './pages/dashboard/FounderDashboard';
import { VenturesPage } from './pages/dashboard/VenturesPage';
import { OpportunitiesPage } from './pages/dashboard/OpportunitiesPage';
import { FreelancersPage } from './pages/dashboard/FreelancersPage';
import { FreelancerDashboard } from './pages/dashboard/FreelancerDashboard';
import { ResourcesPage } from './pages/dashboard/ResourcesPage';
import { MentorsPage } from './pages/dashboard/MentorsPage';
import { ReadinessAssessmentPage } from './pages/dashboard/ReadinessAssessmentPage';
import { ProfileSettingsPage } from './pages/dashboard/ProfileSettingsPage';

// Route Guard
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <VentureProvider>
          <NotificationProvider>
            <EnquiryProvider>
              <Routes>
                {/* Public Marketing & Auth */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/onboarding" element={<OnboardingPage />} />

                {/* Authenticated Dashboard Core */}
                <Route
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route path="/dashboard" element={<FounderDashboard />} />
                  <Route path="/ventures" element={<VenturesPage />} />
                  <Route path="/opportunities" element={<OpportunitiesPage />} />
                  <Route path="/freelancers" element={<FreelancersPage />} />
                  <Route path="/freelancer-dashboard" element={<FreelancerDashboard />} />
                  <Route path="/resources" element={<ResourcesPage />} />
                  <Route path="/mentors" element={<MentorsPage />} />
                  <Route path="/readiness" element={<ReadinessAssessmentPage />} />
                  <Route path="/profile" element={<ProfileSettingsPage />} />
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </EnquiryProvider>
          </NotificationProvider>
        </VentureProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
