import { useState, useEffect } from 'react';
import { mockDiaryEntries } from '../data/mockData';

export default function DiaryPage() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [formData, setFormData] = useState({
    mood: 5,
    sleep: 5,
    notes: ''
  });

  useEffect(() => {
    const loadEntries = async () => {
      try {
        // Simuleerime API päringut
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Järjestame sissekanded kuupäeva järgi, uuemad eespool
        const sortedEntries = [...mockDiaryEntries].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        
        setEntries(sortedEntries);
        setIsLoading(false);
      } catch (error) {
        console.error("Viga sissekannete laadimisel:", error);
        setIsLoading(false);
      }
    };
    
    loadEntries();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'notes' ? value : Number(value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simuleerime uue sissekande lisamist
    const newEntry = {
      id: entries.length + 1,
      date: new Date(),
      ...formData
    };
    
    setEntries([newEntry, ...entries]);
    setShowEntryForm(false);
    setFormData({ mood: 5, sleep: 5, notes: '' });
  };

  // Abifunktsioon meeleolu kuvamiseks
  const getMoodEmoji = (mood) => {
    if (mood >= 8) return '😄';
    if (mood >= 6) return '🙂';
    if (mood >= 4) return '😐';
    if (mood >= 2) return '🙁';
    return '😢';
  };
  
  // Abifunktsioon une kuvamiseks
  const getSleepEmoji = (sleep) => {
    if (sleep >= 8) return '😴';
    if (sleep >= 6) return '🛌';
    if (sleep >= 4) return '🥱';
    return '😫';
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500">Laadin andmeid...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Minu päevik</h1>
        <button 
          onClick={() => setShowEntryForm(true)}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
        >
          Lisa uus sissekanne
        </button>
      </div>

      {/* Uue sissekande vorm */}
      {showEntryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Uus sissekanne</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kuidas hindad oma tänast meeleolu? (1-10)
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    name="mood"
                    min="1"
                    max="10"
                    value={formData.mood}
                    onChange={handleFormChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="ml-3 text-2xl">{getMoodEmoji(formData.mood)}</span>
                  <span className="ml-2">{formData.mood}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Milline oli su unekvaliteet? (1-10)
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    name="sleep"
                    min="1"
                    max="10"
                    value={formData.sleep}
                    onChange={handleFormChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="ml-3 text-2xl">{getSleepEmoji(formData.sleep)}</span>
                  <span className="ml-2">{formData.sleep}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tänased mõtted
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleFormChange}
                  rows="4"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                  placeholder="Kirjuta siia oma mõtted, tunded või päeva tähelepanekud..."
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEntryForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Tühista
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                  Salvesta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sissekannete nimekiri */}
      <div className="space-y-4">
        {entries.length > 0 ? (
          entries.map(entry => (
            <div key={entry.id} className="bg-white p-5 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg">
                  {new Date(entry.date).toLocaleDateString('et-EE', { 
                    weekday: 'long',
                    day: 'numeric', 
                    month: 'long',
                    year: 'numeric'
                  })}
                </h3>
                <div className="flex space-x-4">
                  <div className="flex items-center" title="Meeleolu">
                    <span className="text-2xl mr-1">{getMoodEmoji(entry.mood)}</span>
                    <span className="text-sm text-gray-600">{entry.mood}/10</span>
                  </div>
                  <div className="flex items-center" title="Uni">
                    <span className="text-2xl mr-1">{getSleepEmoji(entry.sleep)}</span>
                    <span className="text-sm text-gray-600">{entry.sleep}/10</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700">{entry.notes}</p>
            </div>
          ))
        ) : (
          <div className="bg-white p-6 rounded-lg shadow text-center">
            <p className="text-gray-500">Sissekandeid pole veel tehtud.</p>
            <button 
              onClick={() => setShowEntryForm(true)}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition"
            >
              Lisa esimene sissekanne
            </button>
          </div>
        )}
      </div>
    </div>
  );
}