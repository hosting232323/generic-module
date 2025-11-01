import { defineStore } from 'pinia';

export const usePortfolioStore = defineStore('portfolio', {
  state: () => ({
    selectedCategory: null,
    projects: [],
    filters: []
  }),
  actions: {
    setCategory(category) {
      this.selectedCategory = category;
    },
    loadProjects(projects) {
      this.projects = projects;
    },
    loadFilters(filters) {
      this.filters = filters;
    }
  },
  getters: {
    filteredProjects: (state) => {
      if (!state.selectedCategory || state.selectedCategory === 'Tutti') {
        return state.projects;
      }
      return state.projects.filter(project => project.category === state.selectedCategory);
    }
  }
});
