<template>
  <div class="admin-container">
    <main class="admin-main">
      <Events :events="events" @refresh="fetchEvents" />
    </main>
  </div>
</template>

<script setup>
import Events from '@/components/bookingManagement/Events.vue';
import { ref, onMounted } from 'vue';
import http from '@/utils/http';

const events = ref([]);

const transformEvents = (backendEvents) => {
  const transformedEvents = backendEvents.map(event => {
    if (event.type === "Single") {
      return {
        id: event.id,
        name: event.name,
        isRecurring: false,
        date: event.info.start_date,
        startTime: event.info.start_time.substring(0, 5),
        endTime: event.info.end_time.substring(0, 5),
        capacity: event.enrichment.capacity,
        ticketsSold: event.enrichment.participants,
        status: determineEventStatus(event.info.start_date, event.info.start_time)
      };
    } else if (event.type === "Weekly") {
      const weekDays = [...new Set(event.info.map(info => info.start_day))];
      
      const startDate = event.info.reduce((earliest, info) => 
        info.start_date < earliest ? info.start_date : earliest, 
        event.info[0].start_date
      );
      
      const endDate = event.info.reduce((latest, info) => 
        info.end_date > latest ? info.end_date : latest, 
        event.info[0].end_date
      );
      
      const startTime = event.info[0].start_time.substring(0, 5);
      const endTime = event.info[0].end_time.substring(0, 5);
      
      const totalParticipants = event.enrichment.slot.reduce(
        (sum, slot) => sum + slot.participants, 0
      );
      
      const totalCapacity = event.enrichment.slot.reduce(
        (sum, slot) => sum + slot.capacity, 0
      );
      
      return {
        id: event.id,
        name: event.name,
        isRecurring: true,
        recurrenceType: 'weekly',
        weekDays: weekDaysToIndices(weekDays),
        date: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime,
        capacity: totalCapacity,
        ticketsSold: totalParticipants,
        occurrences: transformOccurrences(event),
        status: determineRecurringEventStatus(startDate, endDate)
      };
    }
    
    return null;
  }).filter(event => event !== null);

  return transformedEvents.sort((a, b) => {
    const now = new Date();
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    
    if (a.isRecurring !== b.isRecurring) {
      return a.isRecurring ? -1 : 1;
    }
    
    if (a.isRecurring && b.isRecurring) {
      if (dateA.getTime() !== dateB.getTime()) {
        const diffA = Math.abs(dateA - now);
        const diffB = Math.abs(dateB - now);
        return diffA - diffB;
      }
    } else if (!a.isRecurring && !b.isRecurring) {
      if (dateA.getTime() !== dateB.getTime()) {
        const diffA = Math.abs(dateA - now);
        const diffB = Math.abs(dateB - now);
        return diffA - diffB;
      }
    }
    
    const timeA = a.startTime.split(':').map(Number);
    const timeB = b.startTime.split(':').map(Number);
    
    if (timeA[0] !== timeB[0]) {
      return timeA[0] - timeB[0];
    }
    
    return timeA[1] - timeB[1];
  });
};

const weekDaysToIndices = (weekDays) => {
  const dayMap = {
    'Sunday': 0,
    'Monday': 1,
    'Tuesday': 2,
    'Wednesday': 3,
    'Thursday': 4,
    'Friday': 5,
    'Saturday': 6
  };
  
  return weekDays.map(day => dayMap[day]).sort();
};

const transformOccurrences = (event) => {
  const occurrences = [];
  
  event.enrichment.slot.forEach(slot => {
    const startTimeFormatted = slot.start_time + (slot.start_time.length === 5 ? ':00' : '');
    const timeForId = startTimeFormatted.replace(/:/g, '');
    
    occurrences.push({
      id: `${event.id}-${slot.start_date}-${timeForId}`,
      name: event.name,
      date: slot.start_date,
      startTime: startTimeFormatted.substring(0, 5),
      endTime: calculateEndTime(event, slot),
      capacity: slot.capacity,
      ticketsSold: slot.participants,
      status: determineEventStatus(slot.start_date, startTimeFormatted),
      fullStartTime: startTimeFormatted
    });
  });
  
  return occurrences;
};

const calculateEndTime = (event, slot) => {
  const nextSlot = event.enrichment.slot.find(s => 
    s.start_date === slot.start_date && s.start_time > slot.start_time
  );
  
  if (nextSlot) {
    return nextSlot.start_time.substring(0, 5);
  } else {
    const infoForDay = event.info.find(info => info.start_date === slot.start_date);
    if (infoForDay && infoForDay.end_time) {
      return infoForDay.end_time.substring(0, 5);
    }
    
    const startTimeParts = slot.start_time.split(':');
    const startHour = parseInt(startTimeParts[0]);
    const startMinute = parseInt(startTimeParts[1] || 0);
    let endHour = startHour + 1;
    
    if (endHour > 23) {
      endHour = 23;
      return `${endHour.toString().padStart(2, '0')}:59`;
    }
    
    return `${endHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
  }
};

const determineEventStatus = (date, time) => {
  const now = new Date();
  const eventDate = new Date(`${date}T${time}`);
  
  if (eventDate < now) {
    return 'completed';
  } else if (isSameDay(eventDate, now) && isTimeInRange(now, time)) {
    return 'ongoing';
  } else {
    return 'upcoming';
  }
};

const determineRecurringEventStatus = (startDate, endDate) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (end < now) {
    return 'completed';
  } else if (start <= now && now <= end) {
    return 'active';
  } else {
    return 'upcoming';
  }
};

const isSameDay = (date1, date2) => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

const isTimeInRange = (now, eventTime) => {
  const [hours, minutes] = eventTime.split(':').map(Number);
  const eventTimeMinutes = hours * 60 + minutes;
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  
  return Math.abs(eventTimeMinutes - nowMinutes) <= 60;
};

const fetchEvents = () => {
  http.getRequestBooking('event', {}, (response) => {
    if (response.status === 'ok' && response.data) {
      events.value = transformEvents(response.data);
    } else {
    }
  });
};

onMounted(() => {
  fetchEvents();
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