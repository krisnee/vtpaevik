import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Loome AuthContext'i
const AuthContext = createContext();

// Hook konteksti kasutamiseks teistes komponentides
// NB! See peab olema defineeritud VÄLJASPOOL AuthProvider komponenti
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider komponent
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Kontrollime, kas kasutaja on juba sisse logitud (token on salvestatud)
    const token = localStorage.getItem('token');
    if (token) {
      // Kontrolli tokeni kehtivust
      checkTokenValidity(token);
    } else {
      setLoading(false);
    }
  }, []);

  const checkTokenValidity = async (token) => {
    try {
      // API endpoint, mis kontrollib tokeni kehtivust
      const response = await axios.get('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      // Token ei ole kehtiv
      localStorage.removeItem('token');
      setUser(null);
      setLoading(false);
      setError('Sessioon aegunud. Palun logi uuesti sisse.');
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });
      
      const { token, user } = response.data;
      
      // Salvesta token
      localStorage.setItem('token', token);
      
      // Salvesta kasutaja andmed
      setUser(user);
      
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Sisselogimine ebaõnnestus');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, email, password) => {
    try {
      console.log("Alustame registreerimist:", { username, email, password });
      setLoading(true);
      setError(null);
      
      // Seadistame axios'e baas-URL-i (muuda vastavalt oma serveri aadressile)
      const baseURL = 'http://localhost:8080';
      
      console.log("Saadame päringu aadressile:", baseURL + '/api/auth/register');
      
      const response = await axios.post(baseURL + '/api/auth/register', {
        username,
        email,
        password
      });
      
      console.log("Vastus serverilt:", response.data);
      
      // Siin võid ka tokeni ja kasutaja andmed salvestada, et kohe sisse logida
      
      return true;
    } catch (err) {
      console.error("Registreerimise viga:", err);
      console.error("Vea andmed:", err.response?.data);
      console.error("Vea staatus:", err.response?.status);
      setError(err.response?.data?.message || 'Registreerimine ebaõnnestus');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Väärtused, mida soovime konteksti kaudu jagada
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}> 
      {children}
    </AuthContext.Provider>
  );
};

// Eksporteerime ka AuthContext'i, et saaksime seda otse React.useContext'iga kasutada
export { AuthContext };