import React from 'react';

const BestWorstDays = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  // Formaadime kuupäeva kuvamiseks
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('et-EE', { day: 'numeric', month: 'short' });
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

  const bestMoodDay = findBestDay('mood');
  const worstMoodDay = findWorstDay('mood');
  const bestSleepDay = findBestDay('sleep');
  const worstSleepDay = findWorstDay('sleep');

  return (
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
  );
};

export default BestWorstDays;