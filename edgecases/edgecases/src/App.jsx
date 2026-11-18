// Edge Cases — Main Application & Routing Configuration
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Arena from './pages/Arena';
import Battle from './pages/Battle';
import Results from './pages/Results';
import Practice from './pages/Practice';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import About from './pages/About';
import Contact from './pages/Contact';
import PremiumIntro from './pages/PremiumIntro';
import PremiumQuestions from './pages/PremiumQuestions';
import MockInterview from './pages/MockInterview';
import Footer from './components/Footer';
import './styles/global.css';

// Protected Route Guard
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="spinner" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// Platform Shell Layout with Persistent Sidebar
function PlatformLayout({ children }) {
  const { isAuthenticated } = useAuth();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {isAuthenticated && <Navbar />}
      <div className="app-layout">
        {isAuthenticated && <Sidebar />}
        <main className="main-content" style={{ marginLeft: !isAuthenticated ? 0 : undefined }}>
          <div className="page-wrapper">{children}</div>
        </main>
      </div>
    </div>
  );
}

// Public Page Shell Layout (Navbar + Content + Cyber Footer)
function PublicLayout({ children, showFooter = true }) {
  const { isAuthenticated } = useAuth();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {isAuthenticated && <Navbar />}
      <main style={{ flex: 1 }}>{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Landing & Marketing */}
            <Route
              path="/"
              element={
                <PublicLayout>
                  <Home />
                </PublicLayout>
              }
            />

            {/* About Platform & Manifesto */}
            <Route
              path="/about"
              element={
                <PublicLayout>
                  <About />
                </PublicLayout>
              }
            />

            {/* Contact & Comm Dispatch */}
            <Route
              path="/contact"
              element={
                <PublicLayout>
                  <Contact />
                </PublicLayout>
              }
            />
            <Route
              path="/contact-us"
              element={<Navigate to="/contact" replace />}
            />

            {/* Authentication */}
            <Route
              path="/login"
              element={
                <PublicLayout showFooter={false}>
                  <Login />
                </PublicLayout>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicLayout showFooter={false}>
                  <Signup />
                </PublicLayout>
              }
            />

            {/* Premium Content */}
            <Route
              path="/premium"
              element={
                <PublicLayout showFooter={false}>
                  <PremiumIntro />
                </PublicLayout>
              }
            />
            <Route
              path="/premium-questions"
              element={
                <PlatformLayout>
                  <PremiumQuestions />
                </PlatformLayout>
              }
            />
            <Route
              path="/mock-interview"
              element={
                <PlatformLayout>
                  <MockInterview />
                </PlatformLayout>
              }
            />

            {/* Practice & Leaderboard (accessible in public or platform layout) */}
            <Route
              path="/practice"
              element={
                <PlatformLayout>
                  <Practice />
                </PlatformLayout>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <PlatformLayout>
                  <Leaderboard />
                </PlatformLayout>
              }
            />

            {/* Protected Developer Platform Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <PlatformLayout>
                    <Dashboard />
                  </PlatformLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/arena"
              element={
                <ProtectedRoute>
                  <PlatformLayout>
                    <Arena />
                  </PlatformLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <PlatformLayout>
                    <Profile />
                  </PlatformLayout>
                </ProtectedRoute>
              }
            />

            {/* 1v1 Battle Arena (Full Screen IDE, no distractions) */}
            <Route
              path="/battle/:matchId"
              element={
                <ProtectedRoute>
                  <Battle />
                </ProtectedRoute>
              }
            />

            {/* Post-Battle Results */}
            <Route
              path="/results/:matchId"
              element={
                <PublicLayout>
                  <Results />
                </PublicLayout>
              }
            />

            {/* 404 Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
