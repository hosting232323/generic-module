import { defineStore } from 'pinia';

export const useEventsStore = defineStore('events:genericFeStore', {
  state: () => ({
    events: [],
    bookings: [],
    lastBooking: null
  }),
  
  getters: {
    getEventById: (state) => (id) => {
      return state.events.find(event => event.id === id);
    },
    
    getLastBooking: (state) => () => {
      return state.lastBooking;
    }
  },

  actions: {
    setEvents(data) {
      this.events = data.data;
    },
    setEventsFromJson(events) {
      this.events = events;
    },
    initEvents(events) {
      this.setEventsFromJson(events);
    }
  }
});
