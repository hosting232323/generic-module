import http from '@/utils/http';
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
    initEvents(events = undefined) {
      if(events) this.setEventsFromJson(events);
      else http.getRequest('event', {}, this.setEvents);
    },

    async bookEvent(bookingData) {
      return new Promise((resolve) => {
        const requestData = {
          event_id: bookingData.event_id,
          slot_id: bookingData.slot_id,
          email: bookingData.email,
          date: bookingData.date,
          time: bookingData.time,
          participants: bookingData.participants ? Number(bookingData.participants) : 1,
          enrichment: bookingData.enrichment
        };

        http.postRequest(
          'booking?project=museocivicobari.it', 
          requestData, 
          (response) => {
            if (response.status == 'ko')
              resolve({error: response.message});
            else {
              const booking = {
                id: response.id || Date.now(),
                event_id: bookingData.event_id,
                slot_id: bookingData.slot_id,
                email: bookingData.email,
                participants: bookingData.participants,
                enrichment: bookingData.enrichment,
                event: this.getEventById(bookingData.event_id)
              };
              
              this.bookings.push(booking);
              this.lastBooking = booking;
              resolve(booking);
            }
          }
        );
      });
    }
  }
});
