<template>
  <div class="events-dashboard">
    <div class="dashboard-header">
      <h1>Gestione Eventi</h1>
    </div>

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
          </div>
        </div>
      </div>
    </div>

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
            </div>
          </div>
        </div>
      </div>
    </div>

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
        </div>
        <div class="occurrences-list-container">
          <div class="occurrences-list">
            <div v-for="occurrence in sortedOccurrences" :key="occurrence.id" class="occurrence-card">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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
import '../../styles/Events.css';

const props = defineProps({
  events: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['refresh']);

const showOccurrenceModal = ref(false);
const showParticipantsModal = ref(false);
const showPastEvents = ref(false);
const selectedEvent = ref(null);
const participantsEvent = ref(null);
const isRecurringOccurrence = ref(false);

const weekDays = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];

// Computed property to sort occurrences
const sortedOccurrences = computed(() => {
  if (!selectedEvent.value?.occurrences) return [];
  
  const now = new Date();
  return [...selectedEvent.value.occurrences].sort((a, b) => {
    // First, separate completed events
    if (a.status === 'completed' && b.status !== 'completed') return 1;
    if (a.status !== 'completed' && b.status === 'completed') return -1;
    
    // Then sort by date and time for non-completed events
    const dateA = new Date(`${a.date}T${a.startTime}`);
    const dateB = new Date(`${b.date}T${b.startTime}`);
    return dateA - dateB;
  });
});

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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

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

const showParticipants = (event) => {
  if (event.isRecurring) {
    selectedEvent.value = event;
    showOccurrenceModal.value = true;
  } else {
    participantsEvent.value = event;
    isRecurringOccurrence.value = false;
    showParticipantsModal.value = true;
  }
};

const showOccurrenceParticipants = (occurrence) => {
  participantsEvent.value = occurrence;
  isRecurringOccurrence.value = true;
  showParticipantsModal.value = true;
  showOccurrenceModal.value = false;
};
</script>
<style scoped>
/* Styles moved to Events.css */
</style>