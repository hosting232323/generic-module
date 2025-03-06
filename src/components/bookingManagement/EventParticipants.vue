<template>
  <div class="participants-modal">
    <div class="modal-header">
      <h2>Partecipanti all'evento</h2>
      <button @click="$emit('close')" class="btn-close">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <div class="participants-content">
      <div class="participants-info">
        <div class="event-details">
          <h3>{{ props.event.name }}</h3>
          <p v-if="props.isRecurringOccurrence">
            Data: {{ formatDate(props.event.date) }} | 
            Orario: {{ props.event.startTime }} - {{ props.event.endTime }}
          </p>
        </div>
        <div class="participants-stats">
          <div class="stat-item">
            <span class="stat-label">Totale Partecipanti:</span>
            <span class="stat-value">{{ displayedParticipants }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Posti Disponibili:</span>
            <span class="stat-value">{{ props.event.capacity - displayedParticipants }}</span>
          </div>
        </div>
      </div>

      <div v-if="loading" class="loading-indicator">
        <p>Caricamento partecipanti in corso...</p>
      </div>

      <div v-else-if="participants.length === 0" class="no-participants">
        <p>Nessun partecipante registrato per questo evento.</p>
      </div>

      <div v-else class="participants-table">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cognome</th>
              <th>Email</th>
              <th>Telefono</th>
              <th>N° Partecipanti</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="participant in participants" :key="participant.email">
              <td>{{ participant.firstName }}</td>
              <td>{{ participant.lastName }}</td>
              <td>{{ participant.email }}</td>
              <td>{{ participant.phone }}</td>
              <td>{{ participant.numberOfParticipants }}</td>
              <td>
                <span v-if="participant.notes" class="notes-tooltip" :title="participant.notes">
                  <i class="fas fa-info-circle"></i>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, onMounted, watch } from 'vue';
import http from '@/utils/http';

const props = defineProps({
  event: {
    type: Object,
    required: true
  },
  isRecurringOccurrence: {
    type: Boolean,
    default: false
  }
});

defineEmits(['close']);

const participants = ref([]);
const loading = ref(true);

// Calcola il totale dei partecipanti dai dati dei partecipanti caricati
const calculatedParticipants = computed(() => {
  return participants.value.reduce((sum, participant) => sum + participant.numberOfParticipants, 0);
});

// Determina quale valore di partecipanti mostrare
const displayedParticipants = computed(() => {
  // Se l'evento ha già il numero di partecipanti, usalo direttamente
  if (props.event && typeof props.event.ticketsSold === 'number') {
    return props.event.ticketsSold;
  }
  // Altrimenti usa il valore calcolato dai partecipanti caricati
  return calculatedParticipants.value;
});

// Formatta una data nel formato italiano
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

const fetchParticipants = () => {
  loading.value = true;
  
  console.log('Evento ricevuto in EventParticipants:', props.event);
  
  // Costruisci i parametri della richiesta in base al tipo di evento
  const params = {};
  
  if (props.isRecurringOccurrence) {
    // Se è un'occorrenza di un evento ricorrente, usa l'ID dell'occorrenza
    const [eventId, date, time] = props.event.id.split('-');
    params.event_id = eventId;
    
    // Assicurati che la data sia completa (YYYY-MM-DD)
    params.date = props.event.date || date;
    
    // Usa l'orario completo con i secondi se disponibile, altrimenti formattalo
    if (props.event.fullStartTime) {
      params.time = props.event.fullStartTime;
    } else {
      // Formatta l'orario nel formato HH:MM:SS
      const formattedTime = time.length === 4 
        ? `${time.substring(0, 2)}:${time.substring(2, 4)}:00`
        : `${time.substring(0, 2)}:${time.substring(2, 4)}:${time.substring(4, 6)}`;
      params.time = formattedTime;
    }
  } else if (!props.event.isRecurring) {
    // Se è un evento singolo, usa l'ID dell'evento
    params.event_id = props.event.id;
  } else {
    // Se è un evento ricorrente (ma non un'occorrenza specifica), usa l'ID dell'evento
    params.event_id = props.event.id;
  }
  
  console.log('Parametri richiesta partecipanti:', params);
  
  http.getRequestBooking('booking', params, (response) => {
    loading.value = false;
    console.log('Risposta partecipanti dal backend:', response);
    
    if (response.status === 'ok' && response.data) {
      participants.value = response.data.map(participant => {
        // Estrai i dati dall'oggetto enrichment se presente
        const enrichment = participant.enrichment || {};
        
        return {
          firstName: enrichment.first_name || '',
          lastName: enrichment.last_name || '',
          email: participant.email || '',
          phone: enrichment.phone || '',
          numberOfParticipants: participant.participants || 1,
          notes: enrichment.notes || ''
        };
      });
      console.log('Partecipanti trasformati:', participants.value);
    } else {
      console.error('Errore nel recupero dei partecipanti:', response);
      participants.value = [];
    }
  });
};

// Carica i partecipanti all'avvio del componente
onMounted(fetchParticipants);

// Ricarica i partecipanti quando cambia l'evento visualizzato
watch(() => [props.event.id, props.event.date, props.event.fullStartTime], ([newId, newDate, newTime], [oldId, oldDate, oldTime]) => {
  if (newId !== oldId || newDate !== oldDate || newTime !== oldTime) {
    console.log('Evento o dettagli cambiati, ricarico i partecipanti');
    fetchParticipants();
  }
}, { immediate: false });
</script>

<style scoped>
.participants-modal {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.participants-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.participants-info {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
}

.event-details {
  margin-bottom: 1rem;
}

.event-details h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}

.event-details p {
  margin: 0;
  color: #666;
}

.participants-stats {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.25rem;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: bold;
}

.loading-indicator, .no-participants {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.participants-table {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

th {
  background-color: #f5f5f5;
  font-weight: 600;
}

tr:hover {
  background-color: #f9f9f9;
}

.notes-tooltip {
  cursor: help;
  color: #007bff;
}

.btn-close {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  color: #666;
}

.btn-close:hover {
  color: #333;
}
</style>
