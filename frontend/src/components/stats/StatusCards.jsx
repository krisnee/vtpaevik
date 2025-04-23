import React from 'react';

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

const StatusCards = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  // Arvutame keskmised väärtused
  const averageMood = data.reduce((sum, item) => sum + item.mood, 0) / data.length;
  const averageSleep = data.reduce((sum, item) => sum + item.sleep, 0) / data.length;
  const averageActivity = data.reduce((sum, item) => sum + (item.activity || 0), 0) / data.length;
  const averageSocial = data.reduce((sum, item) => sum + (item.social || 0), 0) / data.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatusCard 
        title="Meeleolu" 
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
        title="Uni" 
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
  );
};

export default StatusCards;