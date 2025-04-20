import React from 'react';
import MoodChart from '../components/stats/MoodChart';
import SleepChart from '../components/stats/SleepChart';

function StatsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Sinu statistika</h2>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Meeleolu trend</h3>
        <MoodChart />
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Une kvaliteet</h3>
        <SleepChart />
      </div>
    </div>
  );
}

export default StatsPage;