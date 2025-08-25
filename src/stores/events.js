import http from '@/utils/http';
import { defineStore } from 'pinia';

export const useEventsStore = defineStore('events', {
  state: () => ({
    events: [],
    bookings: [],
    lastBooking: null
  }),
  
  getters: {
    getEventsByDate: (state) => (date) => {
      return state.events.filter(event => {
        if (!event.type || !event.name) return false;

        const targetDate = new Date(date);
        const targetDay = targetDate.toLocaleDateString('en-US', { weekday: 'long' });
        const targetDayOfMonth = targetDate.getDate();

        switch (event.type) {
          case 'Single':
            // Per eventi Single, info è un oggetto non un array
            return event.info.start_date === date;
          
          case 'Weekly':
            // Verifica se almeno una delle info ha il giorno corrispondente
            // e se la data è nel range di validità
            return event.info.some(info => {
              if (info.start_day !== targetDay) return false;
              
              // Verifica il range di date
              const isAfterStart = !info.start_date || date >= info.start_date;
              const isBeforeEnd = !info.end_date || date <= info.end_date;
              return isAfterStart && isBeforeEnd;
            });
          
          case 'Monthly':
            // Verifica se almeno una delle info ha il giorno del mese corrispondente
            // e se la data è nel range di validità
            return event.info.some(info => {
              if (parseInt(info.start_day) !== targetDayOfMonth) return false;
              
              // Verifica il range di date
              const isAfterStart = !info.start_date || date >= info.start_date;
              const isBeforeEnd = !info.end_date || date <= info.end_date;
              return isAfterStart && isBeforeEnd;
            });
        }
        return false;
      });
    },
    
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
      if(events) this.setEventsFromJson(events)
      else http.getRequest('event', {}, this.setEvents);
    },

    async createEvent(eventData) {
      // Simula una chiamata API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const event = {
        id: Date.now(),
        name: eventData.name,
        type: eventData.type,
        description: eventData.description,
        price: eventData.price,
        enrichment: eventData.enrichment || {},
        info: [
          {
            // Campi comuni opzionali
            start_time: eventData.info.start_time,
            end_time: eventData.info.end_time,
          }
        ]
      };

      // Aggiungi campi specifici in base al tipo
      if (event.type === 'Single') {
        event.info[0].start_date = eventData.info.start_date;
        event.info[0].end_date = eventData.info.end_date;
      } else if (event.type === 'Weekly') {
        event.info[0].start_day = eventData.info.start_day;
        event.info[0].end_day = eventData.info.end_day;
      } else if (event.type === 'Monthly') {
        event.info[0].start_day = eventData.info.start_day;
        event.info[0].end_day = eventData.info.end_day;
      }
      
      this.events.push(event);
      return event;
    },

    async updateEvent(id, eventData) {
      // Simula una chiamata API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const index = this.events.findIndex(event => event.id === id);
      if (index > -1) {
        const updatedEvent = {
          ...this.events[index],
          name: eventData.name,
          description: eventData.description,
          price: eventData.price,
          enrichment: eventData.enrichment || {},
          info: [
            {
              ...this.events[index].info[0],
              start_time: eventData.info.start_time,
              end_time: eventData.info.end_time,
            }
          ]
        };

        // Aggiorna campi specifici in base al tipo
        if (updatedEvent.type === 'Single') {
          updatedEvent.info[0].start_date = eventData.info.start_date;
          updatedEvent.info[0].end_date = eventData.info.end_date;
        } else if (updatedEvent.type === 'Weekly') {
          updatedEvent.info[0].start_day = eventData.info.start_day;
          updatedEvent.info[0].end_day = eventData.info.end_day;
        } else if (updatedEvent.type === 'Monthly') {
          updatedEvent.info[0].start_day = eventData.info.start_day;
          updatedEvent.info[0].end_day = eventData.info.end_day;
        }

        this.events[index] = updatedEvent;
        return updatedEvent;
      }
      throw new Error('Event not found');
    },

    async deleteEvent(id) {
      // Simula una chiamata API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const index = this.events.findIndex(event => event.id === id);
      if (index > -1) {
        this.events.splice(index, 1);
      }
    },

    async bookEvent(bookingData) {
      return new Promise((resolve, reject) => {
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
    },

    async cancelBooking(eventId) {
      // Simula una chiamata API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const index = this.bookings.findIndex(booking => booking.event_id === eventId);
      if (index > -1) {
        this.bookings.splice(index, 1);
      }
    }
  }
});
