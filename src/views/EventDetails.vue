<template>
  <div class="event-details">
    <div class="header">
      <button class="back-button" @click="router.back()">
        ← Torna indietro
      </button>
    </div>

    <div v-if="event" class="content">
      <div class="event-info-card">
        <h1>{{ event.name }}</h1>
        <div class="info-grid">
          <div class="info-item full-width">
            <div class="info-label">Descrizione</div>
            <div class="info-value">{{ event.description || 'Nessuna descrizione disponibile' }}</div>
          </div>

          <div v-if="selectedSlot" class="info-item full-width">
            <div class="info-label">Dettagli prenotazione</div>
            <div class="info-value booking-details">
              <div class="detail-row">
                <span class="detail-label">Giorno:</span>
                <span class="detail-value">{{ formatFullDate(selectedSlot.info.start_day, route.query.selectedDate) }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Orario:</span>
                <span class="detail-value">{{ formatTime(selectedSlot.info.start_time) }} - {{ formatTime(selectedSlot.info.end_time) }}</span>
              </div>
              <div v-if="event.price" class="detail-row">
                <span class="detail-label">Prezzo:</span>
                <span class="detail-value">€{{ event.price }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="booking-form-card">
        <h2>Prenota</h2>
        <form @submit.prevent="submitBooking" class="booking-form">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">Nome *</label>
              <input 
                id="firstName"
                v-model="bookingForm.firstName"
                type="text"
                required
                placeholder="Inserisci il tuo nome"
              >
            </div>

            <div class="form-group">
              <label for="lastName">Cognome *</label>
              <input 
                id="lastName"
                v-model="bookingForm.lastName"
                type="text"
                required
                placeholder="Inserisci il tuo cognome"
              >
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email *</label>
            <input 
              id="email"
              v-model="bookingForm.email"
              type="email"
              required
              placeholder="Inserisci la tua email"
            >
          </div>

          <div class="form-group">
            <label for="phone">Telefono *</label>
            <input 
              id="phone"
              v-model="bookingForm.phone"
              type="tel"
              required
              placeholder="Inserisci il tuo numero di telefono"
            >
          </div>

          <div class="form-group">
            <label for="timeSlot">Fascia Oraria *</label>
              <select 
                id="timeSlot"
                v-model="bookingForm.timeSlot"
                required
              >
              <option value="">Seleziona</option>
              <option v-for="n in availableTimeSlot" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>

          <div class="form-group">
            <label for="participants">Numero di partecipanti *</label>
            <div v-if="isEventFull" class="full-warning">
              L'evento è al completo
            </div>
            <select 
              v-else
              id="participants"
              v-model="bookingForm.participants"
              required
            >
              <option value="">Seleziona</option>
              <option v-for="n in availableSpots" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>

          <div class="form-group">
            <label for="notes">Note aggiuntive</label>
            <textarea 
              id="notes"
              v-model="bookingForm.notes"
              rows="4"
              placeholder="Inserisci eventuali note o richieste particolari"
            ></textarea>
          </div>

          <div class="form-group privacy-policy-section">
            <div class="checkbox-container">
              <input 
                type="checkbox" 
                id="privacyPolicy"
                v-model="bookingForm.privacyAccepted"
                required
                :class="{ 'error': showPrivacyError }"
              >
              <label for="privacyPolicy" class="checkbox-label" :class="{ 'text-error': showPrivacyError }">
                Ho letto e accetto la <a href="https://www.museocivicobari.it/privacy-policy/" target="_blank" class="privacy-link">privacy policy</a>
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            class="submit-button" 
            :class="{ 'disabled': !bookingForm.privacyAccepted }"
            :disabled="isSubmitting || !selectedSlot || !bookingForm.privacyAccepted"
          >
            {{ isSubmitting ? 'Invio in corso...' : 'Conferma prenotazione' }}
          </button>
        </form>
      </div>
    </div>

    <div v-else>
      Evento non trovato
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEventsStore } from '@/stores/events';

const route = useRoute();
const router = useRouter();
const eventsStore = useEventsStore();

const event = computed(() => eventsStore.getEventById(Number(route.params.id)));
const selectedSlot = ref(null);

// Imposta lo slot selezionato se presente nei parametri URL
onMounted(() => {
  const slotIndex = route.query.slotIndex;
  if (slotIndex !== undefined && event.value?.info) {
    if (event.value.type === 'Single') {
      selectedSlot.value = {
        label: `${formatFullDate('', route.query.selectedDate)} - ${event.value.info.start_time} - ${event.value.info.end_time}`,
        info: {
          ...event.value.info,
          start_day: new Date(route.query.selectedDate).toLocaleDateString('en-US', { weekday: 'long' })
        }
      };
    } else if (event.value.type === 'Weekly' && Array.isArray(event.value.info)) {
      const slot = event.value.info.find((s, index) => index === parseInt(slotIndex));
      if (slot) {
        selectedSlot.value = {
          label: `${formatDay(slot.start_day)} - ${slot.start_time} - ${slot.end_time}`,
          info: slot
        };
      }
    }
  }
});

const isSubmitting = ref(false);
const bookingForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  participants: '',
  participant_names: [],
  notes: '',
  privacyAccepted: false
});

const availableTimeSlot = computed(() => {
  const slots = event.value.enrichment.slot;
  return slots.map(s => `${s.start_time} - ${s.end_time}`);
})

const availableSpots = computed(() => {
  if (!event.value) return 0;

  if (event.value.type === 'Single') {
    return event.value.enrichment?.capacity ? event.value.enrichment.capacity - (event.value.enrichment.participants || 0) : 10;
  } 

  if (event.value.type === 'Weekly' && selectedSlot.value?.info) {
  
    const selectedDateFormatted = new Date(route.query.selectedDate).toISOString().split('T')[0];
    const slot = event.value.enrichment?.slot?.find(s => {
      const slotDateFormatted = new Date(s.start_date).toISOString().split('T')[0];
      const slotStartTimeFormatted = s.start_time.length === 5 ? s.start_time + ':00' : s.start_time;
      return slotDateFormatted === selectedDateFormatted && slotStartTimeFormatted === selectedSlot.value.info.start_time;
    });

    if (!slot) {
      return 0;
    }
    return slot.capacity - slot.participants;
  }
  

  return 10;
});


const isEventFull = computed(() => availableSpots.value <= 0);

const formatDay = (day) => {
  const days = {
    'Monday': 'Lunedì',
    'Tuesday': 'Martedì',
    'Wednesday': 'Mercoledì',
    'Thursday': 'Giovedì',
    'Friday': 'Venerdì',
    'Saturday': 'Sabato',
    'Sunday': 'Domenica'
  };
  return days[day] || day;
};

const formatFullDate = (dayOfWeek, date) => {
  const dateObj = new Date(date);
  const day = formatDay(dayOfWeek);
  const formattedDate = dateObj.toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  return `${day} ${formattedDate}`;
};

const formatTime = (time) => {
  if (!time) return '';
  return time.substring(0, 5); // Prende solo HH:mm
};

const showPrivacyError = ref(false);

async function submitBooking() {
  if (!bookingForm.value.privacyAccepted) {
    showPrivacyError.value = true;
    return;
  }
  
  showPrivacyError.value = false;
  isSubmitting.value = true;

  const booking = await eventsStore.bookEvent({
    event_id: event.value.id,
    slot_id: selectedSlot.value.info.id,
    date: route.query.selectedDate,
    time: selectedSlot.value.info.start_time,
    email: bookingForm.value.email,
    participants: parseInt(bookingForm.value.participants),
    enrichment: {
      first_name: bookingForm.value.firstName,
      last_name: bookingForm.value.lastName,
      phone: bookingForm.value.phone,
      notes: bookingForm.value.notes,
      participant_names: bookingForm.value.participant_names.filter(name => name && name.trim())
    }
  });

  if (booking.error)
    alert(booking.error);
  else {
    router.push({
      name: 'BookingConfirmation',
      query: {
        selectedDate: route.query.selectedDate
      }
    });
  }
  isSubmitting.value = false;
};
</script>

<style>
@import '../styles/EventDetails.css';
</style>
