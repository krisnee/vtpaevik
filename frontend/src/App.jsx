import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//import { useContext } from 'react';
import './App.css';

// Komponendid
import Layout from './components/layout/Layout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard';
import DiaryPage from './pages/DiaryPage';
//import NotFound from './pages/NotFound';

// Kontekst
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Kasutame mockApi teenust testimiseks
import mockApiService from './services/mockApiService';

// Ajutiselt kasutame API teenuse asemel mockApiService'it
window.apiService = mockApiService;

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

// Avaleht komponent - võib hiljem eraldi faili viia
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
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
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
              path="/diary" 
              element={
                <PrivateRoute>
                  <DiaryPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/stats" 
              element={
                <PrivateRoute>
                  <StatsPage />
                </PrivateRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;