import React, { useState, useEffect } from 'react';
import journalService from '../../services/journalService'; // Veenduge, et tee on õige
import ImageWithFallback from '../../components/ImageWithFallback'; 

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
    const emojis = ['😞', '😔', '😐', '🙂', '😊', '😄', '😁', '🤩', '😍', '🥰'];
    return emojis[Math.min(parseInt(value) - 1, 9)];
  };

  // Emoji valik une jaoks
  const getSleepEmoji = (value) => {
    const emojis = ['😴', '🥱', '😪', '😌', '💤', '🛌', '🌙', '✨', '🌟', '💫'];
    return emojis[Math.min(parseInt(value) - 1, 9)];
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
        {/* Päise osa koos "Lisa uus" nupuga */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Minu päevik</h1>
          <button
            onClick={handleAddEntry}
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
                  <button
                    onClick={() => handleEditEntry(entry)}
                    className="text-teal-600 hover:text-teal-800 text-sm font-medium"
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
        className="md:hidden fixed bottom-6 right-6 bg-teal-600 text-white rounded-full p-4 shadow-lg hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
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
              <h2 className="text-2xl font-semibold text-gray-800">
                {selectedEntry ? 'Muuda sissekannet' : 'Tänane enesetunne'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Kuupäev */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kuupäev</label>
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
      )}<ImageWithFallback
      src="sitting_rock.jpg"
      alt="Placeholder"
      width="500px"
      height="400px"
      className="rounded-lg"
    />
    </div>
  );
};

export default JournalComponent;