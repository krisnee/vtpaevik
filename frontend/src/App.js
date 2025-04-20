import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

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

// PrivateRoute komponent, mis kontrollib autentimist
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="p-4">Laadimine...</div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Konteksti kasutamise hook
const useAuth = () => {
  // Ajutine näidisimplementatsioon
  return {
    isAuthenticated: false, // Muuda tõeseks, kui kasutaja on autenditud
    loading: false
  };
};

// Avaleht komponent
const Home = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Tere tulemast!</h2>
      <p className="text-gray-700">
        See on sinu vaimse tervise päevik. Siin saad jälgida oma meeleolu, 
        und ja igapäevaseid mõtteid, et paremini oma heaolu mõista.
      </p>
      
      <div className="mt-6 p-4 bg-primary bg-opacity-10 rounded-md">
        <p className="font-medium">
          Rakendus on arendamisel. Peagi lisanduvad funktsioonid:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Kasutaja registreerimine ja sisselogimine</li>
          <li>Päeviku sissekannete lisamine</li>
          <li>Meeleolu ja une jälgimine</li>
          <li>Statistika ja visuaalsed graafikud</li>
        </ul>
      </div>
    </div>
  );
};

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
              <Route path="/home" element={<Home />} />
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