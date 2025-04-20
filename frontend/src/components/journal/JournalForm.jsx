import React, { useState, useEffect } from 'react';

const JournalForm = () => {
  const [entries, setEntries] = useState([]);
  
  // Näidisandmed (tegelikus rakenduses tuleksid need API-st)
  useEffect(() => {
    // Siin teeksite päringu oma API-le, et saada päeviku sissekanded
    const mockEntries = [
      {
        id: 1,
        date: new Date('2025-04-18'),
        mood: 8,
        sleep: 7,
        notes: 'Täna oli hea päev. Veetsin aega looduses ja tundsin end värskendatuna.',
      },
      {
        id: 2,
        date: new Date('2025-04-19'),
        mood: 6,
        sleep: 5,
        notes: 'Väsinud päev. Töö oli stressirohke, aga õhtul oli aega lõõgastuda.',
      },
      {
        id: 3,
        date: new Date('2025-04-20'),
        mood: 9,
        sleep: 8,
        notes: 'Suurepärane päev! Sain sõpradega kokku ja nautisime aega koos.',
      },
    ];
    
    setEntries(mockEntries);
  }, []);
  
  // Funktsiooni meeleolu emoji valimiseks
  const getMoodEmoji = (moodValue) => {
    const emojis = ['😞', '😔', '😐', '🙂', '😊', '😄', '😁', '🤩', '😍', '🥰'];
    return emojis[Math.min(Math.floor(moodValue) - 1, 9)];
  };
  
  // Funktsiooni une emoji valimiseks
  const getSleepEmoji = (sleepValue) => {
    const emojis = ['😴', '🥱', '😪', '😌', '💤', '🛌', '🌙', '✨', '🌟', '💫'];
    return emojis[Math.min(Math.floor(sleepValue) - 1, 9)];
  };
  
  // Kuupäeva formaatimine
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('et-EE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Minu päevik</h1>
          <button 
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Lisa uus sissekanne
          </button>
        </div>
        
        {/* Sissekannete nimekiri */}
        <div className="space-y-6">
          {entries.length > 0 ? (
            entries.map((entry) => (
              <div 
                key={entry.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="px-6 py-4">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {formatDate(entry.date)}
                    </h2>
                    <div className="flex space-x-2">
                      <span title="Meeleolu" className="text-2xl">
                        {getMoodEmoji(entry.mood)}
                      </span>
                      <span title="Uni" className="text-2xl">
                        {getSleepEmoji(entry.sleep)}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <span className="mr-1">Meeleolu:</span>
                      <span className="font-medium">{entry.mood}/10</span>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-1">Uni:</span>
                      <span className="font-medium">{entry.sleep}/10</span>
                    </div>
                  </div>
                  <p className="text-gray-700">{entry.notes}</p>
                </div>
                <div className="bg-gray-50 px-6 py-3 flex justify-end">
                  <button className="text-teal-600 hover:text-teal-800 text-sm font-medium">
                    Muuda
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-500">
                Sul pole veel ühtegi päeviku sissekannet. Alusta oma esimese sissekande loomisega!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalForm;