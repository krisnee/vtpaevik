import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
//import { useAuth } from './contexts/AuthContext';

// // PrivateRoute komponent, mis kontrollib autentimist
// const PrivateRoute = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-full">
//         <div className="p-4">Laadimine...</div>
//       </div>
//     );
//   }
  
//   return user ? children : <Navigate to="/login" replace />;
// };

const PrivateRoute = ({ children }) => {
  // Ajutiselt lubame alati juurdepääsu privaatsetele lehtedele
  return children;
}

// Peamine rakenduse komponent

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container min-h-screen bg-gray-50">
        <Header />
          <main className="app-main">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/home" element={<LandingPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/journal" 
                element={
                  <PrivateRoute>
                    <div>
                      <JournalEntryModal />
                    </div>
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/statistics" 
                element={
                  <PrivateRoute>
                    <StatsPage />
                  </PrivateRoute>
                } 
              />
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
