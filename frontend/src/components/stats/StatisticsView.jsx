import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const StatisticsView = () => {
  // Näidisandmed (tegelikus rakenduses tuleksid need API-st)
  const mockData = [
    { date: '2025-04-14', mood: 7, sleep: 6, activity: 5, social: 4 },
    { date: '2025-04-15', mood: 6, sleep: 5, activity: 3, social: 6 },
    { date: '2025-04-16', mood: 6, sleep: 7, activity: 6, social: 5 },
    { date: '2025-04-17', mood: 7, sleep: 6, activity: 7, social: 4 },
    { date: '2025-04-18', mood: 8, sleep: 7, activity: 6, social: 7 },
    { date: '2025-04-19', mood: 6, sleep: 5, activity: 4, social: 5 },
    { date: '2025-04-20', mood: 9, sleep: 8, activity: 8, social: 8 }
  ];
  
  const [activeTab, setActiveTab] = useState('week');
  const [activeChart, setActiveChart] = useState('line');
  const [data] = useState(mockData);
  
  // Arvutame keskmised väärtused
  const averageMood = data.reduce((sum, item) => sum + item.mood, 0) / data.length;
  const averageSleep = data.reduce((sum, item) => sum + item.sleep, 0) / data.length;
  const averageActivity = data.reduce((sum, item) => sum + item.activity, 0) / data.length;
  const averageSocial = data.reduce((sum, item) => sum + item.social, 0) / data.length;
  
  // Perioodi valimine (nädalane, kuine või aastane vaade)
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Tegelikus rakenduses teeksime siin API päringu vastava perioodi andmete jaoks
  };
  
  // Graafiku tüübi valimine
  const handleChartChange = (chartType) => {
    setActiveChart(chartType);
  };
  
  // Formaadime kuupäeva kuvamiseks
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('et-EE', { day: 'numeric', month: 'short' });
  };
  
  // Valmistame andmed ette graafikuks
  const chartData = data.map(item => ({
    ...item,
    formattedDate: formatDate(item.date)
  }));
  
  // Värvikaardid, mis näitavad heaolu näitajaid
  const StatusCard = ({ title, value, max, color, icon }) => {
    const percentage = Math.round((value / max) * 100);
    
    return (
      <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
        <div className="flex items-center mb-3">
          <div className={`w-10 h-10 ${color} bg-opacity-20 rounded-full flex items-center justify-center mr-3`}>
            {icon}
          </div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
        <div className="flex items-center">
          <div className="h-3 flex-grow bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${color}`} 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <span className="ml-3 font-medium text-xl">{value.toFixed(1)}</span>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          {percentage}% {percentage > 70 ? "Suurepärane" : percentage > 50 ? "Hea" : "Vajab tähelepanu"}
        </p>
      </div>
    );
  };
  
  // Leiame iga kategooria parima ja halvima päeva
  const findBestDay = (category) => {
    const bestDay = [...data].sort((a, b) => b[category] - a[category])[0];
    return {
      date: formatDate(bestDay.date),
      value: bestDay[category]
    };
  };
  
  const findWorstDay = (category) => {
    const worstDay = [...data].sort((a, b) => a[category] - b[category])[0];
    return {
      date: formatDate(worstDay.date),
      value: worstDay[category]
    };
  };
  
  // Erinevate graafiku komponentide renderdamine
  const renderChart = () => {
    if (activeChart === 'line') {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="formattedDate" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="mood"
              name="Meeleolu"
              stroke="#14b8a6"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="sleep"
              name="Uni"
              stroke="#3b82f6"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="activity"
              name="Aktiivsus"
              stroke="#f59e0b"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="social"
              name="Sotsiaalne suhtlus"
              stroke="#ec4899"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    } else if (activeChart === 'bar') {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="formattedDate" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="mood" name="Meeleolu" fill="#14b8a6" />
            <Bar dataKey="sleep" name="Uni" fill="#3b82f6" />
            <Bar dataKey="activity" name="Aktiivsus" fill="#f59e0b" />
            <Bar dataKey="social" name="Sotsiaalne suhtlus" fill="#ec4899" />
          </BarChart>
        </ResponsiveContainer>
      );
    }
  };
  
  // Leiame korrelatsiooni meeleolu ja une vahel
  const findCorrelation = (data, x, y) => {
    const n = data.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
    
    for (let i = 0; i < n; i++) {
      sumX += data[i][x];
      sumY += data[i][y];
      sumXY += data[i][x] * data[i][y];
      sumX2 += data[i][x] * data[i][x];
      sumY2 += data[i][y] * data[i][y];
    }
    
    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    
    return numerator / denominator;
  };
  
  const correlationMoodSleep = findCorrelation(data, 'mood', 'sleep');
  const correlationMoodActivity = findCorrelation(data, 'mood', 'activity');
  const correlationMoodSocial = findCorrelation(data, 'mood', 'social');
  
  // Korrelatsioonitabeli renderdamine
  const renderCorrelationTable = () => {
    const getCorrelationStrength = (value) => {
      const absValue = Math.abs(value);
      if (absValue > 0.7) return "Tugev";
      if (absValue > 0.3) return "Keskmine";
      return "Nõrk";
    };
    
    const getCorrelationClass = (value) => {
      const absValue = Math.abs(value);
      if (absValue > 0.7) return "text-green-600";
      if (absValue > 0.3) return "text-yellow-600";
      return "text-red-600";
    };
    
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tegur
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Korrelatsiooni tugevus meeleoluga
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Väärtus
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tähendus
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Uni
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className={getCorrelationClass(correlationMoodSleep)}>
                  {getCorrelationStrength(correlationMoodSleep)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {correlationMoodSleep.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {correlationMoodSleep > 0 ? "Parem uni = parem meeleolu" : "Une ja meeleolu vaheline seos on ebamäärane"}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Aktiivsus
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className={getCorrelationClass(correlationMoodActivity)}>
                  {getCorrelationStrength(correlationMoodActivity)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {correlationMoodActivity.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {correlationMoodActivity > 0 ? "Suurem aktiivsus = parem meeleolu" : "Aktiivsuse ja meeleolu vaheline seos on ebamäärane"}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Sotsiaalne suhtlus
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className={getCorrelationClass(correlationMoodSocial)}>
                  {getCorrelationStrength(correlationMoodSocial)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {correlationMoodSocial.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {correlationMoodSocial > 0 ? "Rohkem sotsiaalset suhtlust = parem meeleolu" : "Sotsiaalse suhtluse ja meeleolu vaheline seos on ebamäärane"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  // Leiame parimad ja halvimad päevad erinevate kategooriate jaoks
  const bestMoodDay = findBestDay('mood');
  const worstMoodDay = findWorstDay('mood');
  const bestSleepDay = findBestDay('sleep');
  const worstSleepDay = findWorstDay('sleep');
  
  return (
    <div className="py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Heaolu statistika</h1>
        <p className="text-gray-600 mb-8">Siin näed ülevaadet oma vaimsest heaolust aja jooksul</p>
        
        {/* Perioodi valik */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Vali ajaperiood</h2>
          <div className="flex space-x-2">
            <button
              className={`py-2 px-4 rounded-md font-medium text-sm ${
                activeTab === 'week'
                  ? 'bg-teal-100 text-teal-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => handleTabChange('week')}
            >
              Nädal
            </button>
            <button
              className={`py-2 px-4 rounded-md font-medium text-sm ${
                activeTab === 'month'
                  ? 'bg-teal-100 text-teal-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => handleTabChange('month')}
            >
              Kuu
            </button>
            <button
              className={`py-2 px-4 rounded-md font-medium text-sm ${
                activeTab === 'year'
                  ? 'bg-teal-100 text-teal-800'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => handleTabChange('year')}
            >
              Aasta
            </button>
          </div>
        </div>
        
        {/* Ülevaade kaardid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatusCard 
            title="Keskmine meeleolu" 
            value={averageMood} 
            max={10} 
            color="bg-teal-500" 
            icon={
              <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            }
          />
          <StatusCard 
            title="Unekvaliteet" 
            value={averageSleep} 
            max={10} 
            color="bg-blue-500" 
            icon={
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
            }
          />
          <StatusCard 
            title="Aktiivsus" 
            value={averageActivity} 
            max={10} 
            color="bg-yellow-500" 
            icon={
              <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            }
          />
          <StatusCard 
            title="Sotsiaalne suhtlus" 
            value={averageSocial} 
            max={10} 
            color="bg-pink-500" 
            icon={
              <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            }
          />
        </div>
        
        {/* Parimad ja halvimad päevad */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-5">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Parimad päevad</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Parim meeleolu</p>
                  <p className="font-medium">{bestMoodDay.date} - Hinnang: {bestMoodDay.value}/10</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Parim uni</p>
                  <p className="font-medium">{bestSleepDay.date} - Hinnang: {bestSleepDay.value}/10</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-5">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Halvimad päevad</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Halvim meeleolu</p>
                  <p className="font-medium">{worstMoodDay.date} - Hinnang: {worstMoodDay.value}/10</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Halvim uni</p>
                  <p className="font-medium">{worstSleepDay.date} - Hinnang: {worstSleepDay.value}/10</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Graafiku sektsioon */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium text-gray-900">Trendi graafik</h2>
            <div className="flex space-x-2">
              <button
                className={`py-1 px-3 rounded-md text-sm ${
                  activeChart === 'line'
                    ? 'bg-teal-100 text-teal-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => handleChartChange('line')}
              >
                Joongraafik
              </button>
              <button
                className={`py-1 px-3 rounded-md text-sm ${
                  activeChart === 'bar'
                    ? 'bg-teal-100 text-teal-800'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => handleChartChange('bar')}
              >
                Tulpdiagramm
              </button>
            </div>
          </div>
          {renderChart()}
        </div>
        
        {/* Korrelatsiooni sektsioon */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-8">
          <h2 className="text-xl font-medium text-gray-900 mb-4">Heaolu tegurite seosed meeleoluga</h2>
          <p className="text-gray-600 mb-4">
            See tabel näitab, kui tugevalt erinevad tegurid sinu meeleolu mõjutavad. Positiivne korrelatsioon näitab, et teguri paranemine tõstab meeleolu.
          </p>
          {renderCorrelationTable()}
        </div>
        
        {/* Soovitused sektsioon */}
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
                <h3 className="font-medium">Sotsiaalne suhtlus</h3>
              </div>
              <p className="text-gray-600">
                Nädalast on näha, et päevad, mil sul oli rohkem sotsiaalset suhtlust, olid üldiselt parema meeleoluga. Proovi planeerida regulaarseid kohtumisi sõpradega.
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
      </div>
    </div>
  );
};

export default StatisticsView;