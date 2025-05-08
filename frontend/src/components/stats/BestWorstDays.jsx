import React from 'react';

const BestWorstDays = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
        Andmeid pole veel piisavalt parimate ja halvimate päevade näitamiseks.
      </div>
    );
  }

  console.log("BestWorstDays andmed:", data); // Logime andmed, et näha nende struktuuri

  // Formaadime kuupäeva kuvamiseks
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('et-EE', { day: 'numeric', month: 'short' });
  };

  // Kontrollime, millises formaadis andmed on
  const hasMoodRating = data[0] && 'mood_rating' in data[0];
  const hasMood = data[0] && 'mood' in data[0];
  const hasValue = data[0] && 'value' in data[0];
  
  // Leiame iga kategooria parima ja halvima päeva
  const findBestDay = (entries, valueField) => {
    if (!entries || entries.length === 0) return null;
    
    const bestDay = [...entries].sort((a, b) => b[valueField] - a[valueField])[0];
    return {
      date: bestDay.date,
      formattedDate: formatDate(bestDay.date),
      value: bestDay[valueField],
      notes: bestDay.notes
    };
  };

  const findWorstDay = (entries, valueField) => {
    if (!entries || entries.length === 0) return null;
    
    const worstDay = [...entries].sort((a, b) => a[valueField] - b[valueField])[0];
    return {
      date: worstDay.date,
      formattedDate: formatDate(worstDay.date),
      value: worstDay[valueField],
      notes: worstDay.notes
    };
  };

  let bestMoodDay = null;
  let worstMoodDay = null;
  let bestSleepDay = null;
  let worstSleepDay = null;
  
  // Kohandame andmete töötlemist vastavalt andmete formaadile
  if (hasMoodRating) {
    // Kui andmed on kujul { date, mood_rating, sleep_quality }
    bestMoodDay = findBestDay(data, 'mood_rating');
    worstMoodDay = findWorstDay(data, 'mood_rating');
    bestSleepDay = findBestDay(data, 'sleep_quality');
    worstSleepDay = findWorstDay(data, 'sleep_quality');
  } else if (hasMood) {
    // Kui andmed on kujul { date, mood, sleep }
    bestMoodDay = findBestDay(data, 'mood');
    worstMoodDay = findWorstDay(data, 'mood');
    bestSleepDay = findBestDay(data, 'sleep');
    worstSleepDay = findWorstDay(data, 'sleep');
  } else if (hasValue && data[0].type === 'mood') {
    // Kui andmed on kujul { date, value, type: 'mood' }
    const moodEntries = data.filter(entry => entry.type === 'mood');
    const sleepEntries = data.filter(entry => entry.type === 'sleep');
    
    bestMoodDay = findBestDay(moodEntries, 'value');
    worstMoodDay = findWorstDay(moodEntries, 'value');
    bestSleepDay = findBestDay(sleepEntries, 'value');
    worstSleepDay = findWorstDay(sleepEntries, 'value');
  } else if (hasValue) {
    // Kui andmed on kujul { date, value } ja kõik on meeleolu andmed
    bestMoodDay = findBestDay(data, 'value');
    worstMoodDay = findWorstDay(data, 'value');
    // Une andmeid pole
  }
  
  // Kui ikka ei leia, siis logime andmete struktuuri
  if (!bestMoodDay && !bestSleepDay) {
    console.log("Ei leidnud meeleolu ega une andmeid. Andmete struktuur:", 
      data.length > 0 ? Object.keys(data[0]) : "Andmed puuduvad");
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
        Andmeid pole veel piisavalt parimate ja halvimate päevade näitamiseks.
      </div>
    );
  }

  // Emoji vastavalt väärtusele (5-palli süsteemis)
  const getMoodEmoji = (value) => {
    if (value >= 5) return '😄';
    if (value >= 4) return '🙂';
    if (value >= 3) return '😐';
    if (value >= 2) return '🙁';
    return '😞';
  };

  const getSleepEmoji = (value) => {
    if (value >= 5) return '😴';
    if (value >= 4) return '💤';
    if (value >= 3) return '🛌';
    if (value >= 2) return '😫';
    return '😩';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-md p-5">
        <h2 className="text-xl font-medium text-gray-900 mb-4">Parimad päevad</h2>
        <div className="space-y-4">
          {bestMoodDay && (
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-3 text-2xl">
                {getMoodEmoji(bestMoodDay.value)}
              </div>
              <div>
                <p className="text-sm text-gray-500">Parim meeleolu</p>
                <p className="font-medium">{bestMoodDay.formattedDate} - Hinnang: {bestMoodDay.value}/5</p>
                {bestMoodDay.notes && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{bestMoodDay.notes}</p>
                )}
              </div>
            </div>
          )}
          
          {bestSleepDay && (
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-2xl">
                {getSleepEmoji(bestSleepDay.value)}
              </div>
              <div>
                <p className="text-sm text-gray-500">Parim uni</p>
                <p className="font-medium">{bestSleepDay.formattedDate} - Hinnang: {bestSleepDay.value}/5</p>
                {bestSleepDay.notes && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{bestSleepDay.notes}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-5">
        <h2 className="text-xl font-medium text-gray-900 mb-4">Halvimad päevad</h2>
        <div className="space-y-4">
          {worstMoodDay && (
            <div className="flex items-center p-3 bg-red-50 rounded-lg">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-3 text-2xl">
                {getMoodEmoji(worstMoodDay.value)}
              </div>
              <div>
                <p className="text-sm text-gray-500">Halvim meeleolu</p>
                <p className="font-medium">{worstMoodDay.formattedDate} - Hinnang: {worstMoodDay.value}/5</p>
                {worstMoodDay.notes && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{worstMoodDay.notes}</p>
                )}
              </div>
            </div>
          )}
          
          {worstSleepDay && (
            <div className="flex items-center p-3 bg-red-50 rounded-lg">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-3 text-2xl">
                {getSleepEmoji(worstSleepDay.value)}
              </div>
              <div>
                <p className="text-sm text-gray-500">Halvim uni</p>
                <p className="font-medium">{worstSleepDay.formattedDate} - Hinnang: {worstSleepDay.value}/5</p>
                {worstSleepDay.notes && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{worstSleepDay.notes}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestWorstDays;