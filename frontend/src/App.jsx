import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import NotFound from './pages/NotFound';
// Layout komponendid
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
// Autentimise komponendid
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// Uued komponendid
import LandingPage from './pages/LandingPage';
import JournalEntryModal from './components/journal/JournalEntryModal';
import StatsPage from './pages/StatsPage';
import Dashboard from './pages/Dashboard';
// Kontekst
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// Layout komponent, mis sisaldab Header ja Footer komponente
const Layout = ({ children }) => (
  <div className="app-container min-h-screen bg-gray-50">
    <Header />
    <main className="app-main">
      {children}
    </main>
    <Footer />
  </div>
);

// Marsruutide defineerimine
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/login",
    element: <Layout><Login /></Layout>,
  },
  {
    path: "/register",
    element: <Layout><Register /></Layout>,
  },
  {
    path: "/home",
    element: <Layout><LandingPage /></Layout>,
  },
  {
    path: "/dashboard",
    element: (
      <Layout>
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      </Layout>
    ),
  },
  {
    path: "/journal",
    element: (
      <Layout>
        <PrivateRoute>
          <JournalEntryModal />
        </PrivateRoute>
      </Layout>
    ),
  },
  {
    path: "/statistics",
    element: (
      <Layout>
        <PrivateRoute>
          <StatsPage />
        </PrivateRoute>
      </Layout>
    ),
  },
  {
    path: "*",
    element: <Layout><NotFound /></Layout>,
  }
], {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;