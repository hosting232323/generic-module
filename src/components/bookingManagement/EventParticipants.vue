<template>
  <div class="participants-modal">
    <div class="modal-header">
      <h2>Partecipanti all'evento</h2>
      <button @click="$emit('close')" class="btn-close">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <div class="participants-content">
      <div class="participants-stats">
        <div class="stat-item">
          <span class="stat-label">Totale Partecipanti:</span>
          <span class="stat-value">{{ totalParticipants }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Posti Disponibili:</span>
          <span class="stat-value">{{ event.capacity - totalParticipants }}</span>
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
import { ref, computed, defineProps, defineEmits, onMounted } from 'vue';
import http from '@/utils/http';

const props = defineProps({
  event: {
    type: Object,
    required: true
  }
});

defineEmits(['close']);

const participants = ref([]);
const loading = ref(true);

// Fetch participants from booking endpoint
const fetchParticipants = () => {
  loading.value = true;
  
  // Different parameters based on event type
  let params = {};
  
  if (props.event.isRecurring) {
    // For Weekly events, we need event ID, date, and time
    params = {
      event_id: props.event.id,
      date: props.event.date,
      time: props.event.startTime
    };
  } else {
    // For Single events, we only need event ID
    params = {
      event_id: props.event.id
    };
  }
  
  http.getRequestBooking('booking', params, (data) => {
    if (data && data.data) {
      // Transform the data to match our component's expected format
      participants.value = data.data.map(booking => ({
        firstName: booking.enrichment?.first_name || '',
        lastName: booking.enrichment?.last_name || '',
        email: booking.email || '',
        phone: booking.enrichment?.phone || '',
        numberOfParticipants: booking.participants || 0,
        notes: booking.enrichment?.notes || ''
      }));
    } else {
      participants.value = [];
    }
    loading.value = false;
  });
};

onMounted(() => {
  fetchParticipants();
});

const totalParticipants = computed(() => {
  return participants.value.reduce((sum, p) => sum + p.numberOfParticipants, 0);
});
</script>

<style scoped>
.participants-modal {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.25rem;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
}

.btn-close:hover {
  color: #333;
}

.participants-content {
  padding: 1.5rem;
  overflow-y: auto;
}

.participants-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stat-label {
  font-weight: 500;
  color: #666;
}

.stat-value {
  font-weight: 600;
  color: #333;
}

.participants-table {
  width: 100%;
  overflow-x: auto;
}

.loading-indicator, .no-participants {
  text-align: center;
  padding: 2rem;
  color: #666;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
}

th {
  background-color: #f8f8f8;
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: 500;
  color: #666;
  border-bottom: 2px solid #eee;
}

td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #eee;
}

tr:hover td {
  background-color: #f9f9f9;
}

.notes-tooltip {
  cursor: help;
  color: #17a2b8;
}
</style>
