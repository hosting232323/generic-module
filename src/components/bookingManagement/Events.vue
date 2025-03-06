<template>
  <div class="events-dashboard">
    <!-- Header con titolo e pulsante nuovo evento -->
    <div class="dashboard-header">
      <h1>Gestione Eventi</h1>
      <button @click="showAddModal = true" class="btn btn-primary">
        <i class="fas fa-plus-circle"></i>
        Nuovo Evento
      </button>
    </div>

    <!-- Lista Eventi -->
    <div class="events-list">
      <div v-for="event in activeEvents" :key="event.id" class="event-card">
        <div class="event-content">
          <div class="event-main">
            <div class="event-header">
              <h3>{{ event.name }}</h3>
              <span :class="['status-badge', getStatusClass(event.status)]">
                {{ getStatusText(event.status, event) }}
              </span>
            </div>
            <p class="event-description">{{ event.description || event.name }}</p>
            <div class="event-details">
              <div class="detail-item">
                <p class="detail-label">{{ event.isRecurring ? 'Ricorrenza' : 'Data' }}</p>
                <p class="detail-value">
                  <template v-if="event.isRecurring">
                    {{ getRecurrenceText(event) }}
                  </template>
                  <template v-else>
                    {{ formatDate(event.date) }}
                  </template>
                </p>
              </div>
              <div class="detail-item" v-if="!event.isRecurring">
                <p class="detail-label">Orario</p>
                <p class="detail-value">{{ event.startTime }} - {{ event.endTime }}</p>
              </div>
              <div v-if="!event.isRecurring" class="detail-item">
                <p class="detail-label">Partecipanti</p>
                <p class="detail-value">{{ event.ticketsSold || 0 }} / {{ event.capacity || 0 }}</p>
              </div>
            </div>
          </div>
          <div class="event-actions">
            <button @click="showParticipants(event)" class="btn btn-info">
              <i class="fas fa-users"></i>
              {{ event.isRecurring ? 'Elenco degli eventi singoli' : 'Partecipanti' }}
            </button>
            <button @click="editEvent(event)" class="btn btn-secondary">
              Modifica
            </button>
            <button @click="deleteEvent(event.id)" class="btn btn-danger">
              Elimina
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Lista Eventi Passati -->
    <div class="past-events-section">
      <button @click="showPastEvents = !showPastEvents" class="past-events-toggle">
        <i class="fas fa-chevron-down" v-if="showPastEvents"></i>
        <i class="fas fa-chevron-right" v-else></i>
        Eventi Passati
      </button>
      <div v-if="showPastEvents" class="past-events">
        <div v-for="event in pastEvents" :key="event.id" class="event-card past-event">
          <div class="event-content">
            <div class="event-main">
              <div class="event-header">
                <h3>{{ event.name }}</h3>
                <span :class="['status-badge', getStatusClass(event.status)]">
                  {{ getStatusText(event.status, event) }}
                </span>
              </div>
              <p class="event-description">{{ event.description || event.name }}</p>
              <div class="event-details">
                <div class="detail-item">
                  <p class="detail-label">{{ event.isRecurring ? 'Ricorrenza' : 'Data' }}</p>
                  <p class="detail-value">
                    <template v-if="event.isRecurring">
                      {{ getRecurrenceText(event) }}
                    </template>
                    <template v-else>
                      {{ formatDate(event.date) }}
                    </template>
                  </p>
                </div>
                <div class="detail-item" v-if="!event.isRecurring">
                  <p class="detail-label">Orario</p>
                  <p class="detail-value">{{ event.startTime }} - {{ event.endTime }}</p>
                </div>
                <div v-if="!event.isRecurring" class="detail-item">
                  <p class="detail-label">Partecipanti</p>
                  <p class="detail-value">{{ event.ticketsSold || 0 }} / {{ event.capacity || 0 }}</p>
                </div>
              </div>
            </div>
            <div class="event-actions">
              <button @click="showParticipants(event)" class="btn btn-info">
                <i class="fas fa-users"></i>
                {{ event.isRecurring ? 'Elenco degli eventi singoli' : 'Partecipanti' }}
              </button>
              <button @click="deleteEvent(event.id)" class="btn btn-danger">
                Elimina
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Aggiungi/Modifica Evento -->
    <div v-if="showAddModal" class="modal-overlay">
      <div class="modal-content event-form-modal">
        <h2>{{ editingEvent ? 'Modifica Evento' : 'Nuovo Evento' }}</h2>
        <form @submit.prevent="saveEvent" class="event-form">
          <div class="form-content">
            <div class="form-grid">
              <div class="form-group">
                <label>Nome Evento</label>
                <input v-model="eventForm.name" type="text" required>
              </div>
              <div class="form-group">
                <label>Descrizione</label>
                <textarea v-model="eventForm.description" rows="3" required></textarea>
              </div>
              <div class="form-group">
                <label>Tipo Evento</label>
                <select v-model="eventForm.isRecurring" class="form-control">
                  <option :value="false">Singolo</option>
                  <option :value="true">Ricorrente</option>
                </select>
              </div>
              <div v-if="eventForm.isRecurring" class="form-group">
                <label>Frequenza</label>
                <select v-model="eventForm.recurrenceType" class="form-control">
                  <option value="weekly">Settimanale</option>
                  <option value="monthly">Mensile</option>
                </select>
              </div>
              <div v-if="eventForm.isRecurring && eventForm.recurrenceType === 'weekly'" class="form-group">
                <label>Giorni della Settimana</label>
                <div class="weekday-checkboxes">
                  <label v-for="(day, index) in weekDays" :key="day" class="weekday-checkbox">
                    <input 
                      type="checkbox" 
                      :value="index" 
                      v-model="eventForm.weekDays"
                      :required="eventForm.weekDays.length === 0"
                    >
                    {{ day }}
                  </label>
                </div>
                <small class="error-text" v-if="eventForm.weekDays.length === 0">
                  Seleziona almeno un giorno
                </small>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>{{ eventForm.isRecurring ? 'Data Inizio' : 'Data' }}</label>
                  <input v-model="eventForm.date" type="date" required>
                </div>
                <div v-if="eventForm.isRecurring" class="form-group">
                  <label>Data Fine</label>
                  <input v-model="eventForm.endDate" type="date" required>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Orario di Inizio</label>
                  <input v-model="eventForm.startTime" type="time" required>
                </div>
                <div class="form-group">
                  <label>Orario di Fine</label>
                  <input v-model="eventForm.endTime" type="time" required>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Capacità</label>
                  <input v-model.number="eventForm.capacity" type="number" required>
                </div>
                <div class="form-group">
                  <label>Biglietti Venduti</label>
                  <input v-model.number="eventForm.ticketsSold" type="number" required>
                </div>
              </div>
            </div>
          </div>
          <div class="form-actions">
            <button type="button" @click="showAddModal = false" class="btn btn-secondary">
              Annulla
            </button>
            <button type="submit" class="btn btn-primary">
              {{ editingEvent ? 'Salva Modifiche' : 'Crea Evento' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Occorrenze Evento Ricorrente -->
    <div v-if="showOccurrenceModal" class="modal-overlay">
      <div class="modal-content recurring-events-modal">
        <div class="modal-header">
          <div class="header-navigation">
            <button @click="showOccurrenceModal = false" class="btn btn-link">
              <i class="fas fa-arrow-left"></i>
              Torna agli eventi
            </button>
            <h2>{{ selectedEvent.name }}</h2>
          </div>
          <!-- Rimosso il bottone "Aggiungi Occorrenza" come richiesto -->
        </div>
        <div class="occurrences-list-container">
          <div class="occurrences-list">
            <div v-for="occurrence in selectedEvent.occurrences" :key="occurrence.id" class="occurrence-card">
              <div class="occurrence-content">
                <div class="occurrence-info">
                  <div class="occurrence-header">
                    <h3>{{ formatDate(occurrence.date) }}</h3>
                    <span :class="['status-badge', getStatusClass(occurrence.status)]">
                      {{ getStatusText(occurrence.status, occurrence) }}
                    </span>
                  </div>
                  <div class="occurrence-details">
                    <div class="detail-item">
                      <p class="detail-label">Orario</p>
                      <p class="detail-value">{{ occurrence.startTime }} - {{ occurrence.endTime }}</p>
                    </div>
                    <div class="detail-item">
                      <p class="detail-label">Partecipanti</p>
                      <p class="detail-value">{{ occurrence.ticketsSold }} / {{ occurrence.capacity }}</p>
                    </div>
                  </div>
                </div>
                <div class="occurrence-actions">
                  <button @click="showOccurrenceParticipants(occurrence)" class="btn btn-info">
                    <i class="fas fa-users"></i>
                    Partecipanti
                  </button>
                  <button @click="deleteOccurrence(occurrence.id)" class="btn btn-danger">
                    Elimina
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Partecipanti -->
    <div v-if="showParticipantsModal" class="modal-overlay">
      <EventParticipants 
        :event="participantsEvent" 
        :isRecurringOccurrence="isRecurringOccurrence"
        @close="showParticipantsModal = false" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';
import EventParticipants from './EventParticipants.vue';
import './Events.css';

const props = defineProps({
  events: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['refresh']);

// Stato del componente
const showAddModal = ref(false);
const showOccurrenceModal = ref(false);
const showParticipantsModal = ref(false);
const showPastEvents = ref(false);
const editingEvent = ref(null);
const selectedEvent = ref(null);
const participantsEvent = ref(null);
const isRecurringOccurrence = ref(false);

// Giorni della settimana
const weekDays = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];

// Form per l'aggiunta/modifica di un evento
const eventForm = ref({
  name: '',
  description: '',
  isRecurring: false,
  recurrenceType: 'weekly',
  weekDays: [],
  date: '',
  endDate: '',
  startTime: '',
  endTime: '',
  capacity: 20,
  ticketsSold: 0
});

// Filtra gli eventi attivi e passati
const activeEvents = computed(() => {
  return props.events.filter(event => 
    event.status === 'upcoming' || 
    event.status === 'active' || 
    event.status === 'ongoing'
  );
});

const pastEvents = computed(() => {
  return props.events.filter(event => event.status === 'completed');
});

// Formatta una data
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Ottiene il testo della ricorrenza
const getRecurrenceText = (event) => {
  if (event.recurrenceType === 'weekly') {
    const days = event.weekDays
      .map(dayIndex => weekDays[dayIndex])
      .join(', ');
    
    return `${days}, dal ${formatDate(event.date)} al ${formatDate(event.endDate)}`;
  } else if (event.recurrenceType === 'monthly') {
    return `Mensile, dal ${formatDate(event.date)} al ${formatDate(event.endDate)}`;
  }
  
  return '';
};

// Ottiene la classe CSS per lo stato dell'evento
const getStatusClass = (status) => {
  switch (status) {
    case 'active':
      return 'status-active';
    case 'completed':
      return 'status-completed';
    case 'ongoing':
      return 'status-ongoing';
    case 'upcoming':
      return 'status-upcoming';
    default:
      return '';
  }
};

// Ottiene il testo dello stato dell'evento
const getStatusText = (status, event) => {
  switch (status) {
    case 'active':
      return 'Attivo';
    case 'completed':
      return 'Completato';
    case 'ongoing':
      return 'In corso';
    case 'upcoming':
      return 'Prossimo';
    default:
      return '';
  }
};

// Mostra il modale dei partecipanti
const showParticipants = (event) => {
  if (event.isRecurring) {
    // Per eventi ricorrenti, mostra le occorrenze
    selectedEvent.value = event;
    showOccurrenceModal.value = true;
  } else {
    // Per eventi singoli, mostra i partecipanti
    participantsEvent.value = event;
    isRecurringOccurrence.value = false;
    showParticipantsModal.value = true;
  }
};

// Mostra i partecipanti di un'occorrenza
const showOccurrenceParticipants = (occurrence) => {
  participantsEvent.value = occurrence;
  isRecurringOccurrence.value = true;
  showParticipantsModal.value = true;
  showOccurrenceModal.value = false;
};

// Modifica un evento
const editEvent = (event) => {
  editingEvent.value = event;
  
  // Popola il form con i dati dell'evento
  eventForm.value = {
    id: event.id,
    name: event.name,
    description: event.description || event.name,
    isRecurring: event.isRecurring,
    recurrenceType: event.recurrenceType || 'weekly',
    weekDays: event.weekDays || [],
    date: event.date,
    endDate: event.endDate || event.date,
    startTime: event.startTime,
    endTime: event.endTime,
    capacity: event.capacity || 20,
    ticketsSold: event.ticketsSold || 0
  };
  
  showAddModal.value = true;
};

// Salva un evento
const saveEvent = () => {
  // Qui implementeremo la logica per salvare l'evento nel backend
  // Per ora, chiudiamo solo il modale
  showAddModal.value = false;
  emit('refresh');
};

// Elimina un evento
const deleteEvent = (eventId) => {
  if (confirm('Sei sicuro di voler eliminare questo evento?')) {
    // Qui implementeremo la logica per eliminare l'evento dal backend
    emit('refresh');
  }
};

// Elimina un'occorrenza
const deleteOccurrence = (occurrenceId) => {
  if (confirm('Sei sicuro di voler eliminare questa occorrenza?')) {
    // Qui implementeremo la logica per eliminare l'occorrenza dal backend
    emit('refresh');
  }
};
</script>
<style scoped>
/* Styles moved to Events.css */
</style>