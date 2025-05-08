import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart2, TrendingUp, Moon, Calendar } from 'lucide-react';

const StatsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [entries, setEntries] = useState([]);
  const [stats, setStats] = useState({
    monthly: { avg_mood: 0, avg_sleep: 0, total_entries: 0 },
    yearly: { avg_mood: 0, avg_sleep: 0, total_entries: 0 }
  });
  
  // Konstandid kuude jaoks
  const monthNames = [
    'Jaanuar', 'Veebruar', 'Märts', 'Aprill', 'Mai', 'Juuni', 
    'Juuli', 'August', 'September', 'Oktoober', 'November', 'Detsember'
  ];
  
  useEffect(() => {
    const fetchEntries = async () => {
      setIsLoading(true);
      try {
        // Kasuta ainult töötavat otspunkti
        const response = await axios.get('http://localhost:8080/api/journal/entries');
        console.log('Laaditud sissekanded:', response.data);
        
        if (response.data && Array.isArray(response.data)) {
          setEntries(response.data);
          calculateStats(response.data);
        } else {
          console.error('API ei tagastanud oodatud formaadis andmeid', response.data);
          setEntries([]);
        }
      } catch (error) {
        console.error('Viga sissekannete laadimisel:', error);
        setEntries([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEntries();
  }, []);
  
  const calculateStats = (journalEntries) => {
    if (!journalEntries || journalEntries.length === 0) {
      return;
    }
    
    // Praegune kuu ja aasta
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // Filtreeri käesoleva kuu sissekanded
    const monthlyEntries = journalEntries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.getMonth() === currentMonth && 
             entryDate.getFullYear() === currentYear;
    });
    
    // Filtreeri käesoleva aasta sissekanded
    const yearlyEntries = journalEntries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.getFullYear() === currentYear;
    });
    
    // Analüüsi iga kuu sissekandeid (aasta lõikes)
    const monthlyData = Array(12).fill().map((_, month) => {
      const entriesForMonth = journalEntries.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate.getMonth() === month && 
               entryDate.getFullYear() === currentYear;
      });
      
      return {
        month: month + 1,
        name: monthNames[month],
        avg_mood: entriesForMonth.length ? 
          entriesForMonth.reduce((sum, entry) => sum + entry.mood_rating, 0) / entriesForMonth.length : 0,
        avg_sleep: entriesForMonth.length ? 
          entriesForMonth.reduce((sum, entry) => sum + (entry.sleep_quality || 0), 0) / entriesForMonth.length : 0,
        entry_count: entriesForMonth.length
      };
    });
    
    // Arvuta kuu statistika
    const monthlyStats = {
      avg_mood: monthlyEntries.length ? 
        monthlyEntries.reduce((sum, entry) => sum + entry.mood_rating, 0) / monthlyEntries.length : 0,
      avg_sleep: monthlyEntries.length ? 
        monthlyEntries.reduce((sum, entry) => sum + (entry.sleep_quality || 0), 0) / monthlyEntries.length : 0,
      total_entries: monthlyEntries.length,
      monthlyData
    };
    
    // Arvuta aasta statistika
    const yearlyStats = {
      avg_mood: yearlyEntries.length ? 
        yearlyEntries.reduce((sum, entry) => sum + entry.mood_rating, 0) / yearlyEntries.length : 0,
      avg_sleep: yearlyEntries.length ? 
        yearlyEntries.reduce((sum, entry) => sum + (entry.sleep_quality || 0), 0) / yearlyEntries.length : 0,
      total_entries: yearlyEntries.length
    };
    
    setStats({
      monthly: monthlyStats,
      yearly: yearlyStats
    });
    
    console.log('Arvutatud statistika:', { monthlyStats, yearlyStats });
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-purple-800 mb-6 flex items-center">
        <BarChart2 className="mr-2" />
        Statistika
      </h1>

      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : entries.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600">Sul pole veel sissekandeid. Lisa uusi sissekandeid, et näha statistikat.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Kuuülevaade */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Calendar className="mr-2 text-purple-500" />
              Kuuülevaade - {monthNames[new Date().getMonth()]} {new Date().getFullYear()}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">Keskmine meeleolu</p>
                <p className="text-3xl font-bold text-purple-700">{stats.monthly.avg_mood.toFixed(1)}</p>
                <p className="text-xs text-gray-500">5-palli skaalal</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">Keskmine uni</p>
                <p className="text-3xl font-bold text-blue-700">{stats.monthly.avg_sleep.toFixed(1)}</p>
                <p className="text-xs text-gray-500">5-palli skaalal</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">Sissekandeid kokku</p>
                <p className="text-3xl font-bold text-green-700">{stats.monthly.total_entries}</p>
                <p className="text-xs text-gray-500">selles kuus</p>
              </div>
            </div>
            
            {/* Kui on piisavalt andmeid, siis näita kuuülevaadet */}
            {stats.monthly.total_entries > 0 ? (
              <div className="h-64 bg-gray-100 rounded-lg p-4">
                <p className="text-center text-gray-600 mb-2">Meeleolu muutus kuu jooksul</p>
                <div className="flex h-40 items-end justify-around">
                  {entries
                    .filter(entry => {
                      const entryDate = new Date(entry.date);
                      return entryDate.getMonth() === new Date().getMonth() && 
                             entryDate.getFullYear() === new Date().getFullYear();
                    })
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((entry, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="bg-purple-500 rounded-t w-12"
                          style={{ 
                            height: `${(entry.mood_rating / 5) * 100}%`,
                            backgroundColor: `rgb(147, 51, 234, ${entry.mood_rating / 5})`
                          }}
                        ></div>
                        <span className="text-xs mt-1">{new Date(entry.date).getDate()}</span>
                      </div>
                    ))
                  }
                </div>
              </div>
            ) : (
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Sellel kuul pole piisavalt sissekandeid graafiku kuvamiseks</p>
              </div>
            )}
          </div>

          {/* Une kvaliteet */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Moon className="mr-2 text-blue-500" />
              Une kvaliteet
            </h2>
            
            {stats.monthly.total_entries > 0 ? (
              <div className="h-64 bg-gray-100 rounded-lg p-4">
                <p className="text-center text-gray-600 mb-2">Une kvaliteet kuu jooksul</p>
                <div className="flex h-40 items-end justify-around">
                  {entries
                    .filter(entry => {
                      const entryDate = new Date(entry.date);
                      return entryDate.getMonth() === new Date().getMonth() && 
                             entryDate.getFullYear() === new Date().getFullYear();
                    })
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((entry, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="bg-blue-500 rounded-t w-12"
                          style={{ 
                            height: `${((entry.sleep_quality || 0) / 5) * 100}%`,
                            backgroundColor: `rgb(59, 130, 246, ${(entry.sleep_quality || 0) / 5})`
                          }}
                        ></div>
                        <span className="text-xs mt-1">{new Date(entry.date).getDate()}</span>
                      </div>
                    ))
                  }
                </div>
              </div>
            ) : (
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Sellel kuul pole piisavalt sissekandeid graafiku kuvamiseks</p>
              </div>
            )}
          </div>

          {/* Aasta kokkuvõte */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Aasta {new Date().getFullYear()} kokkuvõte</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">Keskmine meeleolu</p>
                <p className="text-3xl font-bold text-purple-700">{stats.yearly.avg_mood.toFixed(1)}</p>
                <p className="text-xs text-gray-500">5-palli skaalal</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">Keskmine uni</p>
                <p className="text-3xl font-bold text-blue-700">{stats.yearly.avg_sleep.toFixed(1)}</p>
                <p className="text-xs text-gray-500">5-palli skaalal</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">Sissekandeid kokku</p>
                <p className="text-3xl font-bold text-green-700">{stats.yearly.total_entries}</p>
                <p className="text-xs text-gray-500">sellel aastal</p>
              </div>
            </div>
            
            {/* Kuude võrdlus aasta lõikes */}
            {stats.yearly.total_entries > 0 ? (
              <div className="h-64 bg-gray-100 rounded-lg p-4">
                <p className="text-center text-gray-600 mb-2">Meeleolu muutus kuude lõikes</p>
                <div className="flex h-40 items-end justify-around">
                  {stats.monthly.monthlyData
                    .filter(monthData => monthData.entry_count > 0)
                    .map((monthData, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="bg-purple-500 rounded-t w-8"
                          style={{ 
                            height: `${(monthData.avg_mood / 5) * 100}%`,
                            backgroundColor: `rgb(147, 51, 234, ${monthData.avg_mood / 5})`
                          }}
                        ></div>
                        <span className="text-xs mt-1">{monthData.name.substring(0, 3)}</span>
                      </div>
                    ))
                  }
                </div>
              </div>
            ) : (
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Sellel aastal pole piisavalt sissekandeid graafiku kuvamiseks</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsPage;