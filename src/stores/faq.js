import { defineStore } from 'pinia';

export const useFAQStore = defineStore('faq', {
  state: () => ({
    faqs: [],
    searchQuery: '',
    expandedPanels: []
  }),
  actions: {
    loadFAQs(faqs) {
      this.faqs = faqs;
    },
    setSearchQuery(query) {
      this.searchQuery = query;
    },
    togglePanel(index) {
      const panelIndex = this.expandedPanels.indexOf(index);
      if (panelIndex > -1) {
        this.expandedPanels.splice(panelIndex, 1);
      } else {
        this.expandedPanels.push(index);
      }
    },
    expandAll() {
      this.expandedPanels = this.faqs.map((_, index) => index);
    },
    collapseAll() {
      this.expandedPanels = [];
    }
  },
  getters: {
    filteredFAQs: (state) => {
      if (!state.searchQuery) return state.faqs;
      const query = state.searchQuery.toLowerCase();
      return state.faqs.filter(faq => 
        faq.question.toLowerCase().includes(query) || 
        faq.answer.toLowerCase().includes(query)
      );
    }
  }
});
