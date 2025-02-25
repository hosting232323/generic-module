<template>
  <div class="admin-container">
    <main class="admin-main">
      <Events 
        :events="events"
        @add-event="handleAddEvent"
        @update-event="handleUpdateEvent"
        @delete-event="handleDeleteEvent"
        @delete-occurrence="handleDeleteOccurrence"
      />
    </main>
  </div>
</template>

<script>
import Events from '@/components/bookingManagement/Events.vue';
import { ref } from 'vue';

export default {
  name: 'Booking Admin',
  
  components: {
    Events
  },

  setup() {
    const events = ref([
      {
        id: 1,
        name: "Workshop di Arte Contemporanea",
        description: "Workshop intensivo con artisti rinomati",
        date: "2025-05-20",
        startTime: "10:00",
        endTime: "16:00",
        capacity: 50,
        ticketsSold: 45,
        status: "upcoming"
      },
      {
        id: 2,
        name: "Festa di Carne e Vino",
        description: "Festa di Carne e Vino con una vasta scelta di vini e carni",
        date: "2025-06-10",
        startTime: "19:00",
        endTime: "23:30",
        capacity: 300,
        ticketsSold: 275,
        status: "upcoming"
      },
      {
        id: 3,
        name: "Evento passato",
        description: "Prova",
        date: "2024-06-10",
        startTime: "19:00",
        endTime: "23:30",
        capacity: 300,
        ticketsSold: 275,
        status: "completed"
      },
      {
        id: 4,
        name: "Evento corrente",
        description: "Prova",
        date: "2025-02-12",
        startTime: "10:00",
        endTime: "23:30",
        capacity: 300,
        ticketsSold: 275,
        status: "upcoming"
      },
      {
        id: 5,
        name: "Visita a palazzo delle acque",
        description: "Un affascinante viaggio alla scoperta del palazzo delle acque e dei suoi segreti storici",
        date: "2025-03-01",
        endDate: "2025-12-31",
        startTime: "10:00",
        endTime: "12:00",
        capacity: 30,
        ticketsSold: 0,
        status: "upcoming",
        isRecurring: true,
        recurrenceType: "weekly",
        weekDays: ["6", "0"]  // 6 = Sabato, 0 = Domenica
      }
    ]);

    const handleAddEvent = (newEvent) => {
      const eventToAdd = {
        ...newEvent,
        id: events.value.length + 1
      };
      events.value.push(eventToAdd);
    };

    const handleUpdateEvent = (updatedEvent) => {
      const index = events.value.findIndex(e => e.id === updatedEvent.id);
      if (index !== -1) {
        events.value[index] = updatedEvent;
      }
    };

    const handleDeleteEvent = (eventId) => {
      events.value = events.value.filter(event => event.id !== eventId);
    };

    const handleDeleteOccurrence = (occurrence) => {
      const event = events.value.find(e => 
        e.isRecurring && 
        occurrence.date >= e.date && 
        occurrence.date <= e.endDate &&
        e.startTime === occurrence.startTime
      );
      
      if (event) {
        // Se l'evento ha delle date da escludere, le aggiungiamo
        if (!event.excludedDates) {
          event.excludedDates = [];
        }
        event.excludedDates.push(occurrence.date);
      }
    };

    return {
      events,
      handleAddEvent,
      handleUpdateEvent,
      handleDeleteEvent,
      handleDeleteOccurrence
    };
  }
};
</script>

<style scoped>
.admin-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.admin-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
}
</style>