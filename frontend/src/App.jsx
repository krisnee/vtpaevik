import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import NotFound from './pages/NotFound';
// Layout komponendid
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { MenuProvider } from './contexts/MenuContext';
// Autentimise komponendid
import AuthPopup from './components/auth/AuthPopup';
// Uued komponendid
import LandingPage from './pages/LandingPage';
import JournalEntryModal from './components/journal/JournalEntryModal';
import StatsPage from './pages/StatsPage';
import Dashboard from './pages/Dashboard';
import SupportResources from './pages/SupportResources';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

// Kontekst
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
// Toast teavituste jaoks
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    path: "/stats",
    element: (
      <Layout>
        <PrivateRoute>
          <StatsPage />
        </PrivateRoute>
      </Layout>
    ),
  },
  {
    path: "/tips",
    element: (
      <Layout>
        <SupportResources />
      </Layout>
    ),
  },
  {
    path: "/contact",
    element: (
      <Layout>
        <ContactPage />
      </Layout>
    ),
  },
  {
    path: "/about",
    element: (
      <Layout>
        <AboutPage />
      </Layout>
    ),
  },
  {
    path: "/profile",
    element: (
      <Layout>
        <PrivateRoute>
          <ProfilePage />
        </PrivateRoute>
      </Layout>
    ),
  },
  {
    path: "/settings",
    element: (
      <Layout>
        <PrivateRoute>
          <SettingsPage />
        </PrivateRoute>
      </Layout>
    ),
  },

  {
    path: "*",
    element: <Layout><NotFound /></Layout>,
  }
]);

function App() {
  return (
    <AuthProvider>
      <MenuProvider>
        <ToastContainer position="top-right" autoClose={5000} />
        <RouterProvider router={router} />
      </MenuProvider>
    </AuthProvider>
  );
}
export default App;