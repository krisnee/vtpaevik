import api from './api';

const diaryService = {
  // Päevikukannete pärimine
  getDiaryEntries: async () => {
    const response = await api.get('/diary/entries');
    return response.data;
  },

  // Ühe päevikukande pärimine ID järgi
  getDiaryEntry: async (id) => {
    const response = await api.get(`/diary/entries/${id}`);
    return response.data;
  },

  // Uue päevikukande lisamine
  createDiaryEntry: async (entryData) => {
    const response = await api.post('/diary/entries', entryData);
    return response.data;
  },

  // Päevikukande uuendamine
  updateDiaryEntry: async (id, entryData) => {
    const response = await api.put(`/diary/entries/${id}`, entryData);
    return response.data;
  },

  // Päevikukande kustutamine
  deleteDiaryEntry: async (id) => {
    const response = await api.delete(`/diary/entries/${id}`);
    return response.data;
  },

  // Päevikukannete statistika pärimine
  getStatistics: async (period = 'month') => {
    const response = await api.get(`/diary/statistics?period=${period}`);
    return response.data;
  }
};

export default diaryService;