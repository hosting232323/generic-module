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

// Funzione per trasformare gli eventi dal backend nel formato richiesto dal componente Events
const transformEvents = (backendEvents) => {
  return backendEvents.map(event => {
    if (event.type === "Single") {
      // Trasforma eventi singoli
      return {
        id: event.id,
        name: event.name,
        isRecurring: false,
        date: event.info.start_date,
        startTime: event.info.start_time.substring(0, 5), // Rimuovi i secondi
        endTime: event.info.end_time.substring(0, 5), // Rimuovi i secondi
        capacity: event.enrichment.capacity,
        ticketsSold: event.enrichment.participants,
        status: determineEventStatus(event.info.start_date, event.info.start_time)
      };
    } else if (event.type === "Weekly") {
      // Trasforma eventi settimanali
      // Determina i giorni della settimana dall'array info
      const weekDays = [...new Set(event.info.map(info => info.start_day))];
      
      // Trova la prima e l'ultima data
      const startDate = event.info.reduce((earliest, info) => 
        info.start_date < earliest ? info.start_date : earliest, 
        event.info[0].start_date
      );
      
      const endDate = event.info.reduce((latest, info) => 
        info.end_date > latest ? info.end_date : latest, 
        event.info[0].end_date
      );
      
      // Calcola gli orari di inizio e fine
      const startTime = event.info[0].start_time.substring(0, 5);
      const endTime = event.info[0].end_time.substring(0, 5);
      
      // Calcola il numero totale di partecipanti
      const totalParticipants = event.enrichment.slot.reduce(
        (sum, slot) => sum + slot.participants, 0
      );
      
      // Calcola la capacità totale
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
    
    return null; // In caso di tipo sconosciuto
  }).filter(event => event !== null);
};

// Converte i nomi dei giorni della settimana in indici (0-6, dove 0 è Domenica)
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

// Trasforma le occorrenze di un evento ricorrente
const transformOccurrences = (event) => {
  // Array per memorizzare tutte le occorrenze
  const occurrences = [];
  
  // Aggiungi direttamente tutti gli slot dall'enrichment
  event.enrichment.slot.forEach(slot => {
    // Crea un ID univoco per l'occorrenza
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
      // Salva anche l'orario completo con i secondi per la chiamata API
      fullStartTime: startTimeFormatted
    });
  });
  
  return occurrences;
};

// Funzione per calcolare l'orario di fine di uno slot
const calculateEndTime = (event, slot) => {
  // Cerca lo slot successivo nello stesso giorno
  const nextSlot = event.enrichment.slot.find(s => 
    s.start_date === slot.start_date && s.start_time > slot.start_time
  );
  
  if (nextSlot) {
    // Se c'è uno slot successivo, usa il suo orario di inizio come orario di fine
    return nextSlot.start_time.substring(0, 5);
  } else {
    // Altrimenti cerca l'orario di fine nell'array info
    const infoForDay = event.info.find(info => info.start_date === slot.start_date);
    if (infoForDay && infoForDay.end_time) {
      return infoForDay.end_time.substring(0, 5);
    }
    
    // Se non troviamo un orario di fine, assumiamo che duri un'ora
    const startTimeParts = slot.start_time.split(':');
    const startHour = parseInt(startTimeParts[0]);
    const startMinute = parseInt(startTimeParts[1] || 0);
    let endHour = startHour + 1;
    
    // Gestisci il caso in cui l'ora supera le 23
    if (endHour > 23) {
      endHour = 23;
      return `${endHour.toString().padStart(2, '0')}:59`;
    }
    
    return `${endHour.toString().padStart(2, '0')}:${startMinute.toString().padStart(2, '0')}`;
  }
};

// Determina lo stato di un evento singolo
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

// Determina lo stato di un evento ricorrente
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

// Controlla se due date sono lo stesso giorno
const isSameDay = (date1, date2) => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

// Controlla se un orario è nell'intervallo corrente (± 1 ora)
const isTimeInRange = (now, eventTime) => {
  const [hours, minutes] = eventTime.split(':').map(Number);
  const eventTimeMinutes = hours * 60 + minutes;
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  
  return Math.abs(eventTimeMinutes - nowMinutes) <= 60;
};

// Funzione per recuperare gli eventi dal backend
const fetchEvents = () => {
  http.getRequestBooking('event', {}, (response) => {
    if (response.status === 'ok' && response.data) {
      console.log('Eventi ricevuti dal backend:', response.data);
      events.value = transformEvents(response.data);
      console.log('Eventi trasformati:', events.value);
    } else {
      console.error('Errore nel recupero degli eventi:', response);
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