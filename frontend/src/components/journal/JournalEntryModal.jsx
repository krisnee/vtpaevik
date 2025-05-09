import React, { useState, useEffect } from 'react';
import { BookHeart, Smile, Moon, Calendar, MessageCircle, X, Check, Activity } from 'lucide-react';
import journalService from '../../services/journalService';

const JournalComponent = () => {
  // Seisundi muutujad
  const [entries, setEntries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().substr(0, 10),
    mood_rating: 3,
    sleep_quality: 3,
    social_interaction: 2,
    physical_activity: 2,
    notes: ''
  });

  // Laadige päeviku sissekanded API-st
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const data = await journalService.getJournalEntries();
        setEntries(data);
      } catch (error) {
        console.error('Viga päevikukannete pärimisel:', error);
      }
    };

    fetchEntries();
  }, []);

  // Modaali avamine uue sissekande jaoks
  const handleAddEntry = () => {
    setSelectedEntry(null);
    setFormData({
      date: new Date().toISOString().substr(0, 10),
      mood_rating: 3,
      sleep_quality: 3,
      social_interaction: 2,
      physical_activity: 2,
      notes: ''
    });
    setIsModalOpen(true);
  };

  // Modaali avamine olemasoleva sissekande muutmiseks
  const handleEditEntry = (entry) => {
    setSelectedEntry(entry);
    setFormData({
      date: new Date(entry.date).toISOString().substr(0, 10),
      mood_rating: entry.mood_rating,
      sleep_quality: entry.sleep_quality,
      social_interaction: entry.social_interaction || 2,
      physical_activity: entry.physical_activity || 2,
      notes: entry.notes || ''
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
        await journalService.updateJournalEntry(selectedEntry.id, formData);
        const updatedEntries = entries.map(entry =>
          entry.id === selectedEntry.id
            ? { ...entry, ...formData, date: new Date(formData.date) }
            : entry
        );
        setEntries(updatedEntries);
      } else {
        // Uue sissekande lisamine
        const newEntry = await journalService.createJournalEntry(formData);
        setEntries([newEntry, ...entries]);
      }
    } catch (error) {
      console.error('Viga sissekande salvestamisel:', error);
    }

    // Sulge modaal
    handleCloseModal();
  };

  // Emoji valik meeleolu jaoks
  const getMoodEmoji = (value) => {
    const emojis = ['😞', '😕', '😐', '🙂', '😄'];
    return emojis[Math.min(parseInt(value) - 1, 4)];
  };

  // Emoji valik une jaoks
  const getSleepEmoji = (value) => {
    const emojis = ['😴', '🥱', '😪', '😌', '💤'];
    return emojis[Math.min(parseInt(value) - 1, 4)];
  };

  // Interaktsiooni sõnaliselt väljendamine
  const getSocialText = (value) => {
    const options = ["Minimaalne", "Vähe", "Normaalselt", "Palju", "Väga palju"];
    return options[value] || "Normaalselt";
  };

  // Aktiivsuse sõnaliselt väljendamine
  const getActivityText = (value) => {
    const options = ["Passiivne", "Vähe", "Mõõdukas", "Aktiivne", "Väga aktiivne"];
    return options[value] || "Mõõdukas";
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
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Päise osa koos "Lisa uus" nupuga */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary-dark flex items-center">
            <BookHeart className="mr-2" />
            Minu päevik
          </h1>
          <button
            onClick={handleAddEntry}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-primary-light/30"
              >
                <div className="px-6 py-4">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {formatDate(entry.date)}
                    </h2>
                    <div className="flex space-x-2">
                      <span title="Meeleolu" className="text-2xl">
                        {getMoodEmoji(entry.mood_rating)}
                      </span>
                      <span title="Uni" className="text-2xl">
                        {getSleepEmoji(entry.sleep_quality)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Smile className="mr-1 text-yellow-500" />
                      <span className="mr-1">Meeleolu:</span>
                      <span className="font-medium">{entry.mood_rating}/5</span>
                    </div>
                    <div className="flex items-center">
                      <Moon className="mr-1 text-blue-500" />
                      <span className="mr-1">Uni:</span>
                      <span className="font-medium">{entry.sleep_quality}/5</span>
                    </div>
                    {entry.social_interaction !== undefined && (
                      <div className="flex items-center">
                        <MessageCircle className="mr-1 text-green-500" />
                        <span className="mr-1">Sotsiaalsus:</span>
                        <span className="font-medium">{getSocialText(entry.social_interaction)}</span>
                      </div>
                    )}
                    {entry.physical_activity !== undefined && (
                      <div className="flex items-center">
                        <Activity className="mr-1 text-red-500" />
                        <span className="mr-1">Aktiivsus:</span>
                        <span className="font-medium">{getActivityText(entry.physical_activity)}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-700">{entry.notes}</p>
                </div>
                <div className="bg-gray-50 px-6 py-3 flex justify-end">
                  <button
                    onClick={() => handleEditEntry(entry)}
                    className="text-primary hover:text-primary-dark text-sm font-medium"
                  >
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

      {/* Hõljuv "Lisa uus" nupp mobiilivaates */}
      <button
        onClick={handleAddEntry}
        className="md:hidden fixed bottom-6 right-6 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>

      {/* Modaalne aken */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl p-6 mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-primary-dark flex items-center">
                <BookHeart className="mr-2" />
                {selectedEntry ? 'Muuda sissekannet' : 'Tänane enesetunne'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Kuupäev */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Calendar className="mr-2 text-primary" /> Kuupäev
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Meeleolu valik */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Smile className="mr-2 text-yellow-500" /> Meeleolu (1-5)
                </label>
                <div className="mb-2">
                  <div className="flex justify-between items-center">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button 
                        type="button"
                        key={value}
                        onClick={() => setFormData({...formData, mood_rating: value})}
                        className={`text-3xl ${formData.mood_rating == value ? 'scale-125 border-2 border-primary rounded-full p-1' : 'opacity-50'}`}
                      >
                        {getMoodEmoji(value)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="relative mt-4">
                  {/* Numbrid */}
                  <div className="flex justify-between px-[10px] mb-2">
                    {[1, 2, 3, 4, 5].map((number) => (
                      <span key={number} className="text-xs text-gray-500">
                        {number}
                      </span>
                    ))}
                  </div>
                  {/* Slider */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      name="mood_rating"
                      min="1"
                      max="5"
                      value={formData.mood_rating}
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
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Moon className="mr-2 text-blue-500" /> Une kvaliteet (1-5)
                </label>
                <div className="relative">
                  {/* Numbrid */}
                  <div className="flex justify-between px-[10px] mb-2">
                    {[1, 2, 3, 4, 5].map((number) => (
                      <span key={number} className="text-xs text-gray-500">
                        {number}
                      </span>
                    ))}
                  </div>
                  {/* Slider */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      name="sleep_quality"
                      min="1"
                      max="5"
                      value={formData.sleep_quality}
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

              {/* Sotsiaalne suhtlus */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <MessageCircle className="mr-2 text-green-500" /> Sotsiaalne suhtlus
                </label>
                <select 
                  name="social_interaction"
                  value={formData.social_interaction}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-primary focus:border-primary"
                >
                  <option value="0">Minimaalne</option>
                  <option value="1">Vähe</option>
                  <option value="2">Normaalselt</option>
                  <option value="3">Palju</option>
                  <option value="4">Väga palju</option>
                </select>
              </div>

              {/* Füüsiline aktiivsus */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Activity className="mr-2 text-red-500" /> Füüsiline aktiivsus
                </label>
                <select 
                  name="physical_activity"
                  value={formData.physical_activity}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-primary focus:border-primary"
                >
                  <option value="0">Passiivne</option>
                  <option value="1">Vähe</option>
                  <option value="2">Mõõdukas</option>
                  <option value="3">Aktiivne</option>
                  <option value="4">Väga aktiivne</option>
                </select>
              </div>

              {/* Märkmed */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <MessageCircle className="mr-2 text-primary" /> Mõtted ja tähelepanekud
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Kirjuta siia oma tänased mõtted, tunded või kogemused..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                ></textarea>
              </div>

              {/* Nupud */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center"
                >
                  <X className="mr-1 w-4 h-4" /> Tühista
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center"
                >
                  <Check className="mr-1 w-4 h-4" /> Salvesta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalComponent;