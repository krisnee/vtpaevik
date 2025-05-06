import api from './api';

const journalService = {
  // Päevikukannete pärimine
  getJournalEntries: async () => {
    const response = await api.get('/journal/entries');
    return response.data;
  },

  // Ühe päevikukande pärimine ID järgi
  getJournalEntryById: async (id) => {
    const response = await api.get(`/journal/entries/${id}`);
    return response.data;
  },

  // Päevikukande pärimine kuupäeva järgi
  getJournalEntryByDate: async (date) => {
    const response = await api.get(`/journal/entries/date/${date}`);
    return response.data;
  },

  // Uue päeviku sissekande lisamine
  createJournalEntry: async (entryData) => {
    const response = await api.post('/journal/entries', entryData);
    return response.data;
  },

  // Päevikukande uuendamine
  updateJournalEntry: async (id, entryData) => {
    const response = await api.put(`/journal/entries/${id}`, entryData);
    return response.data;
  },

  // Päevikukande kustutamine
  deleteJournalEntry: async (id) => {
    const response = await api.delete(`/journal/entries/${id}`);
    return response.data;
  },

  // Kuu statistika pärimine
  getMonthlyStats: async (year, month) => {
    const response = await api.get(`/journal/stats/monthly/${year}/${month}`);
    return response.data;
  },

  // Aasta statistika pärimine
  getYearlyStats: async (year) => {
    const response = await api.get(`/journal/stats/yearly/${year}`);
    return response.data;
  },

  // Meeleolu trendide pärimine
  getMoodTrends: async (startDate, endDate) => {
    const response = await api.get(`/journal/stats/mood-trends?startDate=${startDate}&endDate=${endDate}`);
    return response.data;
  },

  // Üldine statistika pärimine (tagasiühilduvuse jaoks)
  getStatistics: async (period = 'month') => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    
    if (period === 'month') {
      return await journalService.getMonthlyStats(year, month);
    } else if (period === 'year') {
      return await journalService.getYearlyStats(year);
    } else {
      const response = await api.get(`/journal/statistics?period=${period}`);
      return response.data;
    }
  }
};

export default journalService;