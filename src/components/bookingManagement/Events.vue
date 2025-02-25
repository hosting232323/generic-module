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

    <!-- Cards statistiche -->
    <div class="stats-grid">
      <div class="stats-card">
        <div class="stats-header">
          <h3>Eventi Totali</h3>
          <i class="fas fa-calendar"></i>
        </div>
        <div class="stats-value">{{ events.length }}</div>
      </div>

      <div class="stats-card">
        <div class="stats-header">
          <h3>Partecipanti Totali</h3>
          <i class="fas fa-users"></i>
        </div>
        <div class="stats-value">{{ totalParticipants }}</div>
      </div>

      <div class="stats-card">
        <div class="stats-header">
          <h3>Tasso di Riempimento</h3>
          <i class="fas fa-chart-line"></i>
        </div>
        <div class="stats-value">{{ occupancyRate }}%</div>
      </div>
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
            <p class="event-description">{{ event.description }}</p>
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
              <div class="detail-item">
                <p class="detail-label">Orario</p>
                <p class="detail-value">{{ event.startTime }} - {{ event.endTime }}</p>
              </div>
              <div v-if="!event.isRecurring" class="detail-item">
                <p class="detail-label">Partecipanti</p>
                <p class="detail-value">{{ event.ticketsSold }} / {{ event.capacity }}</p>
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
              <p class="event-description">{{ event.description }}</p>
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
                <div class="detail-item">
                  <p class="detail-label">Orario</p>
                  <p class="detail-value">{{ event.startTime }} - {{ event.endTime }}</p>
                </div>
                <div v-if="!event.isRecurring" class="detail-item">
                  <p class="detail-label">Partecipanti</p>
                  <p class="detail-value">{{ event.ticketsSold }} / {{ event.capacity }}</p>
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

    <!-- Modal Partecipanti -->
    <div v-if="showParticipantsModal" class="modal-overlay" @click.self="showParticipantsModal = false">
      <EventParticipants 
        :event="selectedEvent" 
        @close="showParticipantsModal = false"
      />
    </div>

    <!-- Modal Selezione Occorrenza -->
    <div v-if="showOccurrenceModal" class="modal-overlay">
      <div class="modal-content recurring-events-modal">
        <div class="modal-header">
          <div class="header-navigation">
            <button @click="showOccurrenceModal = false" class="btn btn-link">
              <i class="fas fa-arrow-left"></i>
              Torna alla lista
            </button>
          </div>
          <h2>{{ selectedEvent.name }}</h2>
          <p class="event-recurrence">{{ getRecurrenceText(selectedEvent) }}</p>
        </div>
        
        <div class="event-period">
          <div class="period-item">
            <span class="period-label">Periodo:</span>
            <span class="period-value">
              {{ formatDate(selectedEvent.date) }} - {{ formatDate(selectedEvent.endDate) }}
            </span>
          </div>
          <div class="period-item">
            <span class="period-label">Orario:</span>
            <span class="period-value">{{ selectedEvent.startTime }} - {{ selectedEvent.endTime }}</span>
          </div>
        </div>

        <div class="occurrence-container">
          <div class="list-header">
            <h3>Eventi singoli</h3>
            <div class="occurrence-count">
              Totale: {{ eventOccurrences.length }} eventi
            </div>
          </div>
          
          <div class="occurrences-grid">
            <div v-for="occurrence in eventOccurrences" 
                 :key="occurrence.date" 
                 class="occurrence-card">
              <div class="occurrence-info">
                <div class="occurrence-date">
                  {{ formatDate(occurrence.date) }}
                </div>
                <div class="occurrence-time">
                  {{ occurrence.startTime }} - {{ occurrence.endTime }}
                </div>
              </div>
              <div class="occurrence-actions">
                <button @click="viewOccurrenceParticipants(occurrence)" 
                        class="btn btn-primary btn-sm">
                  <i class="fas fa-users"></i>
                  Partecipanti
                </button>
                <button @click="deleteOccurrence(occurrence)" 
                        class="btn btn-danger btn-sm">
                  <i class="fas fa-trash"></i>
                  Elimina
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventParticipants from './EventParticipants.vue';

export default {
  components: {
    EventParticipants
  },

  props: {
    events: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  data() {
    return {
      weekDays: ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'],
      showAddModal: false,
      showParticipantsModal: false,
      showOccurrenceModal: false,
      showPastEvents: false,
      selectedEvent: null,
      eventOccurrences: [],
      editingEvent: null,
      eventForm: {
        name: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
        capacity: 0,
        ticketsSold: 0,
        isRecurring: false,
        recurrenceType: 'weekly',
        weekDays: [],
        endDate: '',
        excludedDates: []
      }
    };
  },

  computed: {
    totalParticipants() {
      return this.events.reduce((acc, event) => acc + event.ticketsSold, 0);
    },
    occupancyRate() {
      const totalCapacity = this.events.reduce((acc, event) => acc + event.capacity, 0);
      const totalSold = this.events.reduce((acc, event) => acc + event.ticketsSold, 0);
      return totalCapacity ? Math.round((totalSold / totalCapacity) * 100) : 0;
    },
    sortedEvents() {
      return [...this.events].sort((a, b) => {
        // Confronta prima le date
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateA.getTime() !== dateB.getTime()) {
          return dateA - dateB;
        }
        
        // Se le date sono uguali, confronta gli orari di inizio
        const [hoursA, minutesA] = a.startTime.split(':').map(Number);
        const [hoursB, minutesB] = b.startTime.split(':').map(Number);
        const timeCompare = hoursA * 60 + minutesA - (hoursB * 60 + minutesB);
        if (timeCompare !== 0) {
          return timeCompare;
        }
        
        // Se anche gli orari di inizio sono uguali, confronta gli orari di fine
        const [endHoursA, endMinutesA] = a.endTime.split(':').map(Number);
        const [endHoursB, endMinutesB] = b.endTime.split(':').map(Number);
        return (endHoursA * 60 + endMinutesA) - (endHoursB * 60 + endMinutesB);
      });
    },
    eventsWithStatus() {
      return this.sortedEvents.map(event => ({
        ...event,
        status: this.calculateEventStatus(event)
      }));
    },
    activeEvents() {
      return this.eventsWithStatus.filter(event => event.status !== 'completed');
    },
    pastEvents() {
      return this.eventsWithStatus.filter(event => event.status === 'completed');
    }
  },

  methods: {
    calculateEventStatus(event) {
      const now = new Date();
      const eventDate = new Date(event.date);
      const [startHours, startMinutes] = event.startTime.split(':').map(Number);
      const [endHours, endMinutes] = event.endTime.split(':').map(Number);
      
      const eventStart = new Date(eventDate);
      eventStart.setHours(startHours, startMinutes, 0);
      
      const eventEnd = new Date(eventDate);
      eventEnd.setHours(endHours, endMinutes, 0);

      // Rimuovi ore, minuti e secondi per confrontare solo le date
      const todayDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const eventDateOnly = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());

      if (eventDateOnly < todayDate || (eventDateOnly.getTime() === todayDate.getTime() && now > eventEnd)) {
        return 'completed';
      } else if (eventDateOnly.getTime() === todayDate.getTime() && now >= eventStart && now <= eventEnd) {
        return 'ongoing';
      } else {
        return 'upcoming';
      }
    },

    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString('it-IT', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    },

    getStatusClass(status) {
      const classes = {
        upcoming: 'upcoming',
        ongoing: 'ongoing',
        completed: 'completed'
      };
      return classes[status] || classes.upcoming;
    },

    getStatusText(status, event) {
      if (event && event.isRecurring) {
        return 'Evento ricorrente';
      }
      
      const texts = {
        upcoming: 'In Programma',
        ongoing: 'In Corso',
        completed: 'Completato',
        cancelled: 'Annullato'
      };
      return texts[status] || status;
    },

    editEvent(event) {
      this.editingEvent = event;
      this.eventForm = { ...event };
      this.showAddModal = true;
    },

    deleteEvent(eventId) {
      if (confirm('Sei sicuro di voler eliminare questo evento?')) {
        this.$emit('delete-event', eventId);
      }
    },

    saveEvent() {
      const eventData = {
        ...this.eventForm,
        capacity: Number(this.eventForm.capacity),
        ticketsSold: Number(this.eventForm.ticketsSold)
      };

      if (this.editingEvent) {
        eventData.id = this.editingEvent.id;
        this.$emit('update-event', eventData);
      } else {
        this.$emit('add-event', eventData);
      }

      this.resetForm();
    },

    resetForm() {
      this.eventForm = {
        name: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
        capacity: 0,
        ticketsSold: 0,
        isRecurring: false,
        recurrenceType: 'weekly',
        weekDays: [],
        endDate: '',
        excludedDates: []
      };
      this.editingEvent = null;
      this.showAddModal = false;
    },

    showParticipants(event) {
      if (event.isRecurring) {
        this.selectedEvent = event;
        this.eventOccurrences = this.generateOccurrences(event);
        this.showOccurrenceModal = true;
      } else {
        this.selectedEvent = event;
        this.showParticipantsModal = true;
      }
    },

    viewOccurrenceParticipants(occurrence) {
      this.selectedEvent = { ...this.selectedEvent, date: occurrence.date };
      this.showOccurrenceModal = false;
      this.showParticipantsModal = true;
    },

    getRecurrenceText(event) {
      if (event.recurrenceType === 'weekly') {
        const selectedDays = event.weekDays
          .map(day => this.weekDays[parseInt(day)])
          .join(' e ');
        return `Ogni ${selectedDays}`;
      } else if (event.recurrenceType === 'monthly') {
        const dayOfMonth = new Date(event.date).getDate();
        return `Ogni ${dayOfMonth} del mese`;
      }
      return '';
    },

    generateOccurrences(event) {
      const occurrences = [];
      const startDate = new Date(event.date);
      const endDate = new Date(event.endDate);
      
      let currentDate = new Date(startDate);
      
      // Funzione helper per convertire il getDay() di JS (0-6, domenica-sabato) 
      // nel nostro formato (0-6, lunedì-domenica)
      const convertDay = (jsDay) => jsDay === 0 ? 6 : jsDay - 1;
      
      while (currentDate <= endDate) {
        // Per eventi settimanali, verifica se il giorno corrente è tra quelli selezionati
        if (event.recurrenceType === 'weekly') {
          const adjustedDay = convertDay(currentDate.getDay()).toString();
          if (event.weekDays.includes(adjustedDay)) {
            const dateStr = currentDate.toISOString().split('T')[0];
            // Verifica se la data non è tra quelle escluse
            if (!event.excludedDates || !event.excludedDates.includes(dateStr)) {
              occurrences.push({
                date: dateStr,
                startTime: event.startTime,
                endTime: event.endTime
              });
            }
          }
          currentDate.setDate(currentDate.getDate() + 1);
        } else if (event.recurrenceType === 'monthly') {
          const dateStr = currentDate.toISOString().split('T')[0];
          // Verifica se la data non è tra quelle escluse
          if (!event.excludedDates || !event.excludedDates.includes(dateStr)) {
            occurrences.push({
              date: dateStr,
              startTime: event.startTime,
              endTime: event.endTime
            });
          }
          currentDate.setMonth(currentDate.getMonth() + 1);
        }
      }
      
      return occurrences;
    },
    
    deleteOccurrence(occurrence) {
      if (confirm('Sei sicuro di voler eliminare questo evento singolo?')) {
        this.$emit('delete-occurrence', occurrence);
      }
    }
  }
};
</script>

<style scoped>
.events-dashboard {
  padding: 1.5rem;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.dashboard-header h1 {
  font-size: 1.875rem;
  font-weight: bold;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stats-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.stats-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.stats-header h3 {
  font-size: 0.875rem;
  color: #666;
  margin: 0;
}

.stats-header i {
  color: #666;
}

.stats-value {
  font-size: 1.5rem;
  font-weight: bold;
}

.events-list {
  display: grid;
  gap: 1.5rem;
}

.event-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.event-content {
  padding: 1.5rem;
}

.event-main {
  flex: 1;
}

.event-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.event-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
}

.status-badge.upcoming {
  background-color: #e6f3ff;
  color: #1a73e8;
}

.status-badge.ongoing {
  background-color: #e6f7e6;
  color: #28a745;
}

.status-badge.completed {
  background-color: #f0f0f0;
  color: #666;
}

.event-description {
  color: #666;
  margin-bottom: 1rem;
}

.event-details {
  display: flex;
  gap: 1.5rem;
}

.detail-item {
  min-width: 120px;
}

.detail-label {
  font-size: 0.875rem;
  color: #666;
  margin: 0 0 0.25rem 0;
}

.detail-value {
  font-weight: 500;
  margin: 0;
}

.event-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.past-events-section {
  margin-top: 2rem;
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.past-events-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #666;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.2s;
  margin-bottom: 1rem;
}

.past-events-toggle:hover {
  color: #333;
}

.past-events-toggle i {
  font-size: 0.875rem;
  transition: transform 0.2s;
}

.past-events {
  margin-top: 1rem;
}

.past-event {
  opacity: 0.8;
}

.past-event .event-content {
  background-color: #f8f8f8;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  width: 100%;
  max-width: 600px;
  margin: 1rem;
}

.modal-content h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0 0 1.5rem 0;
}

/* Form styles */
.event-form-modal {
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.event-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.form-content {
  flex: 1;
  overflow-y: auto;
  padding-right: 1rem;
}

.form-grid {
  display: grid;
  gap: 1rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group textarea {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group textarea {
  resize: vertical;
}

.form-actions {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  background: white;
}

.weekday-checkboxes {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.5rem;
}

.weekday-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.weekday-checkbox input[type="checkbox"] {
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
}

.error-text {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

/* Button styles */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: background-color 0.2s;
}

.btn-primary {
  background-color: #1a73e8;
  color: white;
}

.btn-primary:hover {
  background-color: #1557b0;
}

.btn-secondary {
  background-color: #f0f0f0;
  color: #333;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-info {
  background-color: #17a2b8;
  color: white;
}

.btn-info:hover {
  background-color: #138496;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .event-details {
    flex-direction: column;
    gap: 1rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}

.recurring-events-modal {
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header-navigation {
  margin-bottom: 1rem;
}

.btn-link {
  background: none;
  border: none;
  color: #007bff;
  padding: 0;
  font-size: 1rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-link:hover {
  color: #0056b3;
  text-decoration: underline;
}

.occurrence-container {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.occurrences-grid {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
  margin: -0.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  align-content: start;
}

.occurrence-actions {
  display: flex;
  gap: 0.5rem;
}

.occurrence-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn-sm {
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  flex: 1;
  white-space: nowrap;
}
</style>