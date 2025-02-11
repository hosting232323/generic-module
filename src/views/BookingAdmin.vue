<template>
  <div class="admin-container">
    <main class="admin-main">
      <Events 
        :events="events"
        @add-event="handleAddEvent"
        @update-event="handleUpdateEvent"
        @delete-event="handleDeleteEvent"
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
        date: "2025-02-11",
        startTime: "10:00",
        endTime: "23:30",
        capacity: 300,
        ticketsSold: 275,
        status: "upcoming"
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

    return {
      events,
      handleAddEvent,
      handleUpdateEvent,
      handleDeleteEvent
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