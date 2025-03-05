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

<script setup>
import Events from '@/components/bookingManagement/Events.vue';
import { ref, onMounted } from 'vue';
import http from '@/utils/http';

const events = ref([]);

const fetchEvents = () => {
  http.getRequestBooking('event', {}, (data) => {
    console.log('Eventi ricevuti', data.data);
    
    // Trasforma gli eventi per adattarli al formato atteso dal componente Events
    const transformedEvents = data.data.map(event => {
      // Base event object with common properties
      const baseEvent = {
        id: event.id,
        name: event.name,
        description: event.name, // Using name as description since it's not provided
        status: 'active', // Default status
        createdAt: event.created_at,
        updatedAt: event.updated_at
      };

      // Handle Single events
      if (event.type === 'Single') {
        return {
          ...baseEvent,
          isRecurring: false,
          date: event.info.start_date,
          startTime: event.info.start_time.substring(0, 5), // Format HH:MM
          endTime: event.info.end_time.substring(0, 5), // Format HH:MM
          capacity: event.enrichment.capacity,
          ticketsSold: event.enrichment.participants
        };
      } 
      // Handle Weekly events
      else if (event.type === 'Weekly') {
        // Extract unique days from info array
        const weekDays = [...new Set(event.info.map(info => info.start_day))];
        
        // Get the earliest start date and latest end date
        const startDates = event.info.map(info => info.start_date);
        const endDates = event.info.map(info => info.end_date);
        const startDate = startDates.sort()[0];
        const endDate = endDates.sort()[endDates.length - 1];
        
        // Get the earliest start time and latest end time
        const startTimes = event.info.map(info => info.start_time);
        const endTimes = event.info.map(info => info.end_time);
        const startTime = startTimes.sort()[0].substring(0, 5); // Format HH:MM
        const endTime = endTimes.sort()[endTimes.length - 1].substring(0, 5); // Format HH:MM

        return {
          ...baseEvent,
          isRecurring: true,
          recurrenceType: 'weekly',
          date: startDate,
          endDate: endDate,
          startTime: startTime,
          endTime: endTime,
          weekDays: weekDays.map(day => {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return days.indexOf(day);
          }),
          // For weekly events, we'll store the original data for generating occurrences
          originalData: event
        };
      }
      
      // Default case (should not happen)
      return baseEvent;
    });
    
    events.value = transformedEvents;
  });
};

onMounted(() => {
  fetchEvents();
});

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
    if (!event.excludedDates) {
      event.excludedDates = [];
    }
    event.excludedDates.push(occurrence.date);
  }
};

defineExpose({
  events,
  handleAddEvent,
  handleUpdateEvent,
  handleDeleteEvent,
  handleDeleteOccurrence
});
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