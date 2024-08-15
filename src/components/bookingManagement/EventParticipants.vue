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
        <div class="export-actions">
          <button class="btn btn-export btn-ics" @click="exportFile('ics')">
            <i class="fas fa-calendar-alt"></i>
            Esporta ICS
          </button>
          <button class="btn btn-export btn-xls" @click="exportFile('xls')">
            <i class="fas fa-file-excel"></i>
            Esporta XLS
          </button>
          <v-btn 
            class="btn btn-export btn-block" 
            @click="toggleEventBlocked"
            :loading="blockLoading"
          >
            <i class="fas fa-lock"></i>
            Blocca
          </v-btn>
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
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="participant in participants" :key="participant.email">
              <td>{{ participant.firstName }}</td>
              <td>{{ participant.lastName }}</td>
              <td>{{ participant.email }}</td>
              <td>{{ participant.phone }}</td>
              <td>{{ participant.numberOfParticipants }}</td>
              <td>{{ participant.notes }}</td>
              <td>
                <button class="btn-delete" @click="deleteParticipant(participant)">
                  <i class="fas fa-trash"></i>
                </button>
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
const blockLoading = ref(false);

const calculatedParticipants = computed(() => {
  return participants.value.reduce((sum, participant) => sum + participant.numberOfParticipants, 0);
});

const displayedParticipants = computed(() => {
  if (props.event && typeof props.event.ticketsSold === 'number') {
    return props.event.ticketsSold;
  }
  return calculatedParticipants.value;
});

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
    
  const params = {};
  
  if (props.isRecurringOccurrence) {
    const [eventId, date, time] = props.event.id.split('-');
    params.event_id = eventId;
    
    params.date = props.event.date || date;
    
    if (props.event.fullStartTime) {
      params.time = props.event.fullStartTime;
    } else {
      const formattedTime = time.length === 4 
        ? `${time.substring(0, 2)}:${time.substring(2, 4)}:00`
        : `${time.substring(0, 2)}:${time.substring(2, 4)}:${time.substring(4, 6)}`;
      params.time = formattedTime;
    }
  } else if (!props.event.isRecurring) {
    params.event_id = props.event.id;
  } else {
    params.event_id = props.event.id;
  }
    
  http.getRequestBooking('booking', params, (response) => {
    loading.value = false;
    
    if (response.status === 'ok' && response.data) {
      participants.value = response.data.map(participant => {
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
    } else {
      console.error('Errore nel recupero dei partecipanti:', response);
      participants.value = [];
    }
  });
};

const deleteParticipant = (participant) => {
  // Placeholder function for future implementation
  console.log('Delete participant:', participant);
  // In future: will call an API endpoint to delete the participant
};

const toggleEventBlocked = () => {
  let params = {};
  if (props.isRecurringOccurrence)
    params = { date: props.event.date, time: props.event.fullStartTime };
  const id = props.isRecurringOccurrence ? props.event.id.split('-')[0] : props.event.id;
  blockLoading.value = true;
  http.postRequestBooking(`event/disable/${id}`, params, function (_data) {
    blockLoading.value = false;
  }, 'PUT');
};

const exportFile = (exportType) => {
  let params = {};
  if (props.isRecurringOccurrence)
    params = { date: props.event.date, time: props.event.fullStartTime };
  const id = props.isRecurringOccurrence ? props.event.id.split('-')[0] : props.event.id;
  http.getRequestBooking(`export/${id}/${exportType}`, params, function (blob) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `export.${exportType}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 'GET', undefined, true);
};

onMounted(fetchParticipants);

watch(() => [props.event.id, props.event.date, props.event.fullStartTime], ([newId, newDate, newTime], [oldId, oldDate, oldTime]) => {
  if (newId !== oldId || newDate !== oldDate || newTime !== oldTime) {
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

.export-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

.btn-export {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-ics {
  background-color: #4CAF50;
  color: white;
}

.btn-ics:hover {
  background-color: #3e8e41;
}

.btn-xls {
  background-color: #217346;
  color: white;
}

.btn-xls:hover {
  background-color: #1a5c38;
}

.btn-block {
  background-color: #6c757d;
  color: white;
}

.btn-block:hover {
  background-color: #5a6268;
}

.event-blocked-notice {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #fff3cd;
  color: #856404;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.event-blocked-notice i {
  font-size: 1.2rem;
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

.btn-delete {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.3rem 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-delete:hover {
  background-color: #c82333;
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
