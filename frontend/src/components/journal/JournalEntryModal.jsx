import React, { useState, useEffect } from 'react';
import journalService from '../../services/journalService';

const JournalComponent = () => {
  // Seisundi muutujad
  const [entries, setEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().substr(0, 10),
    mood: 5,
    sleep: 5,
    notes: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  
  // Teate kuvamine
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000); // Teade kaob 5 sekundi pärast
  };
  
  // Päeviku sissekannete laadimine API-st
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        const data = await journalService.getEntries();
        
        // Teisendame andmed õigesse formaati
        const formattedEntries = data.map(entry => ({
          id: entry.id,
          date: new Date(entry.date),
          mood: entry.mood_rating,
          sleep: entry.sleep_quality || 5,
          notes: entry.notes || ''
        }));
        
        setEntries(formattedEntries);
        setError(null);
      } catch (err) {
        console.error('Viga päeviku sissekannete laadimisel:', err);
        setError('Andmete laadimine ebaõnnestus. Palun proovige hiljem uuesti.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEntries();
  }, []);
  
  // Modaali avamine uue sissekande jaoks
  const handleAddEntry = () => {
    setSelectedEntry(null);
    setFormData({
      date: new Date().toISOString().substr(0, 10),
      mood: 5,
      sleep: 5,
      notes: ''
    });
    setIsModalOpen(true);
  };
  
  // Modaali avamine olemasoleva sissekande muutmiseks
  const handleEditEntry = (entry) => {
    setSelectedEntry(entry);
    setFormData({
      date: new Date(entry.date).toISOString().substr(0, 10),
      mood: entry.mood,
      sleep: entry.sleep,
      notes: entry.notes
    });
    setIsModalOpen(true);
  };
  
  // Modaali sulgemine
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  // Vormi väljade muutmine
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  // Vormi esitamine
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (selectedEntry) {
        // Olemasoleva sissekande uuendamine
        await journalService.updateEntry(selectedEntry.id, formData);
        
        // Uuendame kohalikku olekut
        const updatedEntries = entries.map(entry => 
          entry.id === selectedEntry.id 
            ? { 
                ...entry, 
                date: new Date(formData.date),
                mood: parseInt(formData.mood),
                sleep: parseInt(formData.sleep),
                notes: formData.notes
              }
            : entry
        );
        setEntries(updatedEntries);
        
        showNotification('Sissekanne edukalt uuendatud');
      } else {
        // Uue sissekande lisamine
        const result = await journalService.createEntry(formData);
        
        const newEntry = {
          id: result.id,
          date: new Date(formData.date),
          mood: parseInt(formData.mood),
          sleep: parseInt(formData.sleep),
          notes: formData.notes
        };
        
        setEntries([newEntry, ...entries]);
        showNotification('Uus sissekanne edukalt lisatud');
      }
      
      // Sulge modaal
      handleCloseModal();
    } catch (err) {
      console.error('Viga sissekande salvestamisel:', err);
      showNotification('Sissekande salvestamine ebaõnnestus. Palun proovige uuesti.', 'error');
    }
  };
  
  // Meeleolu emoji valimine
  const getMoodEmoji = (mood) => {
    if (mood >= 8) return '😄';
    if (mood >= 6) return '🙂';
    if (mood >= 4) return '😐';
    if (mood >= 2) return '🙁';
    return '😢';
  };
  
  // Une emoji valimine
  const getSleepEmoji = (sleep) => {
    if (sleep >= 8) return '😴';
    if (sleep >= 6) return '🛌';
    if (sleep >= 4) return '😴';
    if (sleep >= 2) return '😫';
    return '😩';
  };
  
  // Kuupäeva formateerimine
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('et-EE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Teate kuvamine */}
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-md ${
          notification.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
        }`}>
          {notification.message}
        </div>
      )}
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Minu päevik</h2>
        <button
          onClick={handleAddEntry}
          className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
        >
          Lisa uus sissekanne
        </button>
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
      ) : entries.length === 0 ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Tähelepanu! </strong>
          <span className="block sm:inline">Sul pole veel ühtegi päeviku sissekannet. Alusta oma esimese sissekande lisamisega!</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map((entry) => (
            <div key={entry.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium">{formatDate(entry.date)}</h3>
                  <button
                    onClick={() => handleEditEntry(entry)}
                    className="text-gray-500 hover:text-teal-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                    </svg>
                  </button>
                </div>
                
                <div className="flex space-x-4 mb-3">
                  <div className="flex items-center">
                    <span className="text-xl mr-2">{getMoodEmoji(entry.mood)}</span>
                    <div>
                      <p className="text-xs text-gray-500">Meeleolu</p>
                      <p className="font-medium">{entry.mood}/10</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="text-xl mr-2">{getSleepEmoji(entry.sleep)}</span>
                    <div>
                      <p className="text-xs text-gray-500">Uni</p>
                      <p className="font-medium">{entry.sleep}/10</p>
                    </div>
                  </div>
                </div>
                
                {entry.notes && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 line-clamp-3">{entry.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Modaal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-medium text-gray-900">
                  {selectedEntry ? 'Muuda sissekannet' : 'Lisa uus sissekanne'}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Kuupäev */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kuupäev
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
                
                {/* Meeleolu skaala */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meeleolu (1-10) {getMoodEmoji(formData.mood)}
                  </label>
                  <div className="relative">
                    {/* Numbrid */}
                    <div className="flex justify-between px-[10px] mb-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                        <span key={number} className="text-xs text-gray-500">
                          {number}
                        </span>
                      ))}
                    </div>
                    {/* Slider */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        name="mood"
                        min="1"
                        max="10"
                        value={formData.mood}
                        onChange={handleChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>Halb</span>
                      <span>Suurepärane</span>
                    </div>
                  </div>
                </div>
                              
                {/* Une kvaliteet */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Une kvaliteet (1-10) {getSleepEmoji(formData.sleep)}
                  </label>
                  <div className="relative">
                    {/* Numbrid */}
                    <div className="flex justify-between px-[10px] mb-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                        <span key={number} className="text-xs text-gray-500">
                          {number}
                        </span>
                      ))}
                    </div>
                    {/* Slider */}
                    <div className="flex items-center space-x-2">
                      <input
                        type="range"
                        name="sleep"
                        min="1"
                        max="10"
                        value={formData.sleep}
                        onChange={handleChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                    <div className="flex justify-between mt-1 text-xs text-gray-500">
                      <span>Halb</span>
                      <span>Suurepärane</span>
                    </div>
                  </div>
                </div>
                
                {/* Märkmed */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mõtted ja tähelepanekud
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Kirjuta siia oma tänased mõtted, tunded või kogemused..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                  ></textarea>
                </div>
                
                {/* Nupud */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  >
                    Tühista
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  >
                    Salvesta
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalComponent;