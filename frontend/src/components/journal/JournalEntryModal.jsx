import React, { useState, useEffect } from 'react';

const JournalEntryModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().substr(0, 10),
    mood: 5,
    sleep: 5,
    notes: ''
  });
  
  const handleOpen = () => {
    setIsOpen(true);
  };
  
  const handleClose = () => {
    setIsOpen(false);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sisestatud andmed:', formData);
    // Siia tuleks päris rakenduses API kutsung, et salvestada andmed
    handleClose();
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
  
  return (
    <div>
      {/* Nupp päeviku avamiseks */}
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 bg-teal-600 text-white rounded-full p-4 shadow-lg hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </button>
      
      {/* Modaalne aken */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl p-6 mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">Tänane enesetunne</h2>
              <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Kuupäev - automaatselt täidetud tänase kuupäevaga, kuid muudetav */}
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
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">1</span>
                  <input
                    type="range"
                    name="mood"
                    min="1"
                    max="10"
                    value={formData.mood}
                    onChange={handleChange}
                    className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm text-gray-500">10</span>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>Halb</span>
                  <span>Suurepärane</span>
                </div>
              </div>
              
              {/* Une kvaliteet */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Une kvaliteet (1-10) {getSleepEmoji(formData.sleep)}
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">1</span>
                  <input
                    type="range"
                    name="sleep"
                    min="1"
                    max="10"
                    value={formData.sleep}
                    onChange={handleChange}
                    className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm text-gray-500">10</span>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>Halb</span>
                  <span>Suurepärane</span>
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
                  onClick={handleClose}
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
      )}
    </div>
  );
};

export default JournalEntryModal;