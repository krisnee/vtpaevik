import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';

// Komponendid
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import JournalForm from './components/journal/JournalForm';
import Stats from './components/stats/Stats';
import NotFound from './components/layout/NotFound';

// Kontekst
import { AuthProvider } from './context/AuthContext';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContainer>
          <Header />
          <MainContent>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
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
                    <JournalForm />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/stats" 
                element={
                  <PrivateRoute>
                    <Stats />
                  </PrivateRoute>
                } 
              />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MainContent>
          <Footer />
        </AppContainer>
      </Router>
    </AuthProvider>
  );
}

// PrivateRoute komponent, mis kontrollib autentimist
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth(); // Eeldame, et kasutad AuthContext'i

  if (loading) {
    return <div>Laadimine...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Konteksti kasutamise hook (võid luua eraldi failis)
const useAuth = () => {
  // Siin võiks kasutada useContext konteksti saamiseks
  // Näiteks: const context = useContext(AuthContext);
  
  // Ajutine näidisimplementatsioon
  return {
    isAuthenticated: false, // Muuda tõeseks, kui kasutaja on autenditud
    loading: false
  };
};

export default App;