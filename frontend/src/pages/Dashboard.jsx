/**
 * Dashboard komponent
 * 
 * See komponent toimib meeleolu päeviku rakenduse põhilise juhtpaneelina.
 * Kuvab kasutaja tänase päeva sissekande, meeleolu statistika, hiljutised
 * päeviku sissekanded ja tugiteenuste ressursid.
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import JournalEntryModal from '../components/journal/JournalEntryModal';
import DashboardCard from '../components/DashboardCard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard() {
  // Autentimise ja navigeerimise hookid
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Oleku haldamine
  const [todayEntry, setTodayEntry] = useState(null);
  const [recentEntries, setRecentEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [moodData, setMoodData] = useState([]);
  const [error, setError] = useState(null);

  // Andmete laadimine API-st
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Seadistame axios päringute jaoks
        const token = localStorage.getItem('token');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        
        // Tänase kuupäeva saamine
        const today = new Date().toISOString().split('T')[0];
        
        // Teeme päringud API-le
        const [todayResponse, entriesResponse, statsResponse] = await Promise.all([
          axios.get(`/api/journal/entries/date/${today}`).catch(() => ({ data: null })),
          axios.get('/api/journal/entries?limit=5').catch(() => ({ data: [] })),
          axios.get('/api/journal/stats/mood').catch(() => ({ data: [] }))
        ]);
        
        // Salvestame andmed olekusse
        setTodayEntry(todayResponse.data);
        setRecentEntries(entriesResponse.data);
        setMoodData(statsResponse.data);
        
      } catch (err) {
        console.error("Viga andmete laadimisel:", err);
        setError("Andmete laadimine ebaõnnestus. Palun proovi hiljem uuesti.");
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      loadDashboardData();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  // Uue sissekande salvestamine
  const handleSaveEntry = async (entryData) => {
    try {
      const response = await axios.post('/api/journal/entries', entryData);
      setTodayEntry(response.data);
      setRecentEntries(prev => [response.data, ...prev.slice(0, 4)]);
      setShowModal(false);
      
      // Värskendame ka meeleolu andmeid
      const statsResponse = await axios.get('/api/journal/stats/mood');
      setMoodData(statsResponse.data);
      
    } catch (err) {
      console.error("Viga sissekande salvestamisel:", err);
      alert("Sissekande salvestamine ebaõnnestus. Palun proovi uuesti.");
    }
  };

  /**
   * Abifunktsioon numbrilise meeleoluhinnangu teisendamiseks sobivaks emoji-ks
   */
  const getMoodEmoji = (mood) => {
    if (mood >= 8) return '😄';
    if (mood >= 6) return '🙂';
    if (mood >= 4) return '😐';
    if (mood >= 2) return '🙁';
    return '😢';
  };

  /**
   * Käsitleb kasutaja väljalogimist ja suunab sisselogimislehele
   */
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Laadimise olek
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-primary-light rounded-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    );
  }

  // Vea olek
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
          >
            Proovi uuesti
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Ülemine navigatsiooni riba koos kasutaja info ja väljalogimisega */}
      <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center mr-3 text-lg font-semibold">
            {user?.username?.charAt(0).toUpperCase() || 'K'}
          </div>
          <div>
            <h2 className="font-bold text-lg">{user?.username || 'Kasutaja'}</h2>
            <p className="text-sm text-gray-600">{user?.email || ''}</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition"
        >
          Logi välja
        </button>
      </div>

      {/* Dashboardi kaardid 2x2 layoutiga */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tänane sissekanne */}
        <DashboardCard title="Tänane päev">
          {todayEntry ? (
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-4xl mr-4">{getMoodEmoji(todayEntry.mood_rating)}</span>
                <div>
                  <p className="font-medium text-lg">Meeleolu: {todayEntry.mood_rating}/10</p>
                  <p className="text-gray-600">Uni: {todayEntry.sleep_quality}/10</p>
                  {todayEntry.social_interaction && (
                    <p className="text-gray-600">Sotsiaalne aktiivsus: {todayEntry.social_interaction}/5</p>
                  )}
                  {todayEntry.physical_activity && (
                    <p className="text-gray-600">Füüsiline aktiivsus: {todayEntry.physical_activity}/5</p>
                  )}
                </div>
              </div>
              {todayEntry.notes && (
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-gray-700">{todayEntry.notes}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-primary-light bg-opacity-20 p-5 rounded-md text-center">
              <p className="font-medium mb-3">Sa pole veel tänast päeva kirja pannud</p>
              <button 
                onClick={() => setShowModal(true)} 
                className="px-5 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition shadow-sm"
              >
                Lisa tänane sissekanne
              </button>
            </div>
          )}
        </DashboardCard>

        {/* Statistika */}
        <DashboardCard title="Sinu meeleolu viimase nädala jooksul">
          {moodData && moodData.length > 0 ? (
            <div className="h-48">
              <div className="w-full h-full flex items-end justify-between">
                {moodData.slice(0, 7).map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className="w-10 bg-primary hover:bg-primary-dark transition-all rounded-t-md relative group"
                      style={{ height: `${(item.mood_rating / 10) * 100}%` }}
                    >
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 pointer-events-none">
                        {item.mood_rating}/10
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      {new Date(item.date).toLocaleDateString('et-EE', { day: 'numeric' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center">
              <p className="text-gray-500">Statistika jaoks pole veel piisavalt andmeid.</p>
            </div>
          )}
        </DashboardCard>

        {/* Viimased sissekanded */}
        <DashboardCard 
          title="Viimased sissekanded" 
          footer={
            <button 
              onClick={() => navigate('/journal')}
              className="text-primary hover:underline text-sm flex items-center"
            >
              Vaata kõiki sissekandeid
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          }
        >
          {recentEntries.length > 0 ? (
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {recentEntries.map(entry => (
                <div key={entry.id} className="border-b border-gray-200 pb-3 last:border-0 hover:bg-gray-50 p-2 rounded transition">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {new Date(entry.date).toLocaleDateString('et-EE', { 
                        day: 'numeric', 
                        month: 'long'
                      })}
                    </span>
                    <span className="flex items-center">
                      <span className="text-2xl mr-2">{getMoodEmoji(entry.mood_rating)}</span>
                      <span className="text-gray-600">{entry.mood_rating}/10</span>
                    </span>
                  </div>
                  {entry.notes && (
                    <p className="text-gray-700 text-sm mt-1 line-clamp-2">{entry.notes}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-gray-500 mb-4">Sul pole veel sissekandeid.</p>
              <button 
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
              >
                Lisa esimene sissekanne
              </button>
            </div>
          )}
        </DashboardCard>

        {/* Tugi ja ressursid */}
        <DashboardCard title="Tugi ja ressursid">
          <div className="space-y-3">
            <a href="/tips" className="block p-4 bg-green-50 rounded-md hover:bg-green-100 transition transform hover:-translate-y-1 duration-200 border border-green-100">
              <h3 className="font-medium text-green-800">Hingamisharjutused</h3>
              <p className="text-sm text-gray-600 mt-1">Lihtsad harjutused stressi leevendamiseks</p>
            </a>
            <a href="/contact" className="block p-4 bg-blue-50 rounded-md hover:bg-blue-100 transition transform hover:-translate-y-1 duration-200 border border-blue-100">
              <h3 className="font-medium text-blue-800">Kriisiabi</h3>
              <p className="text-sm text-gray-600 mt-1">Kontaktid ja juhised raskete hetkede jaoks</p>
            </a>
            <a href="/tips" className="block p-4 bg-purple-50 rounded-md hover:bg-purple-100 transition transform hover:-translate-y-1 duration-200 border border-purple-100">
              <h3 className="font-medium text-purple-800">Rahustavad tsitaadid</h3>
              <p className="text-sm text-gray-600 mt-1">Inspiratsiooni andvad mõtted</p>
            </a>
          </div>
        </DashboardCard>
      </div>

      {/* Sissekande modal */}
      {showModal && 
        <JournalEntryModal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)}
          onSave={handleSaveEntry}
        />
      }
    </div>
  );
}