import React, { useState, useEffect } from 'react';
import journalService from '../services/journalService';
import MoodChart from '../components/stats/MoodChart';
import SleepChart from '../components/stats/SleepChart';
import StatusCards from '../components/stats/StatusCards';
import BestWorstDays from '../components/stats/BestWorstDays';

function StatsPage() {
  const [activeTab, setActiveTab] = useState('week');
  const [activeChart, setActiveChart] = useState('line');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Andmete laadimine API-st
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let result;
        
        if (activeTab === 'week') {
          // Viimase 7 päeva andmed
          const endDate = new Date().toISOString().split('T')[0];
          const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
          result = await journalService.getMoodTrends(startDate, endDate);
        } else if (activeTab === 'month') {
          // Praeguse kuu andmed
          const now = new Date();
          const year = now.getFullYear();
          const month = now.getMonth() + 1;
          result = await journalService.getMonthlyStats(year, month);
        } else {
          // Praeguse aasta andmed
          const year = new Date().getFullYear();
          result = await journalService.getYearlyStats(year);
        }
        
        // Teisendame andmed õigesse formaati
        const formattedData = result.entries ? result.entries.map(entry => ({
          date: entry.date,
          mood: entry.mood_rating,
          sleep: entry.sleep_quality,
          activity: entry.activity_level || 5, // Kui puudub, kasutame vaikeväärtust
          social: entry.social_interaction || 5 // Kui puudub, kasutame vaikeväärtust
        })) : [];
        
        setData(formattedData);
        setError(null);
      } catch (err) {
        console.error('Viga andmete laadimisel:', err);
        setError('Andmete laadimine ebaõnnestus. Palun proovige hiljem uuesti.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [activeTab]);

  // Perioodi valimine (nädalane, kuine või aastane vaade)
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  // Graafiku tüübi valimine
  const handleChartChange = (chartType) => {
    setActiveChart(chartType);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6">Sinu statistika</h2>
      
      {/* Perioodi valik */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              activeTab === 'week'
                ? 'bg-teal-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => handleTabChange('week')}
          >
            Nädal
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'month'
                ? 'bg-teal-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => handleTabChange('month')}
          >
            Kuu
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              activeTab === 'year'
                ? 'bg-teal-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => handleTabChange('year')}
          >
            Aasta
          </button>
        </div>
      </div>
      
      {/* Graafiku tüübi valik */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              activeChart === 'line'
                ? 'bg-teal-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => handleChartChange('line')}
          >
            Joongraafik
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              activeChart === 'bar'
                ? 'bg-teal-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => handleChartChange('bar')}
          >
            Tulpdiagramm
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Viga! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      ) : data.length === 0 ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Tähelepanu! </strong>
          <span className="block sm:inline">Valitud perioodil puuduvad andmed. Palun lisa päevikusissekandeid või vali teine periood.</span>
        </div>
      ) : (
        <>
          {/* Ülevaate kaardid */}
          <StatusCards data={data} />
          
          {/* Parimad ja halvimad päevad */}
          <BestWorstDays data={data} />
          
          {/* Meeleolu graafik */}
          <MoodChart data={data} chartType={activeChart} title={`Meeleolu muutused (${activeTab === 'week' ? 'nädal' : activeTab === 'month' ? 'kuu' : 'aasta'})`} />
          
          {/* Une kvaliteedi graafik */}
          <SleepChart data={data} chartType={activeChart} title={`Une kvaliteet (${activeTab === 'week' ? 'nädal' : activeTab === 'month' ? 'kuu' : 'aasta'})`} />
          
          {/* Soovitused */}
          <div className="bg-teal-50 rounded-lg shadow-md p-5">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Personaalsed soovitused</h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <h3 className="font-medium">Une kvaliteet</h3>
                </div>
                <p className="text-gray-600">
                  Su andmetest on näha, et une kvaliteet mõjutab tugevalt sinu meeleolu. Proovi magada regulaarsemalt ja vähemalt 7-8 tundi öösel.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-md shadow-sm">
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <h3 className="font-medium">Järgmine samm</h3>
                </div>
                <p className="text-gray-600">
                  Jätka päeviku täitmist. Mida pikema aja andmed meil on, seda täpsemaid mustreid saame tuvastada ja paremaid soovitusi anda.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default StatsPage;