<template>
  <v-container class="events-dashboard">
    <v-row>
      <v-col>
        <h1 class="text-h4 mb-6">Gestione Eventi</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="event in activeEvents" :key="event.id" cols="12">
        <v-card>
          <v-card-item>
            <v-row>
              <v-col cols="12" md="8">
                <div class="d-flex align-center">
                  <h3 class="text-h5 mr-4">{{ event.name }}</h3>
                  <v-chip
                    :color="getStatusClass(event.status)"
                    class="ml-2"
                  >
                    {{ getStatusText(event.status, event) }}
                  </v-chip>
                </div>
                <p class="text-body-1 text-medium-emphasis mt-2">{{ event.description || event.name }}</p>
                <v-row class="mt-4">
                  <v-col cols="12" sm="4">
                    <div class="text-caption text-medium-emphasis">{{ event.isRecurring ? 'Ricorrenza' : 'Data' }}</div>
                    <div class="text-body-1">
                      <template v-if="event.isRecurring">
                        {{ getRecurrenceText(event) }}
                      </template>
                      <template v-else>
                        {{ formatDate(event.date) }}
                      </template>
                    </div>
                  </v-col>
                  <v-col v-if="!event.isRecurring" cols="12" sm="4">
                    <div class="text-caption text-medium-emphasis">Orario</div>
                    <div class="text-body-1">{{ event.startTime }} - {{ event.endTime }}</div>
                  </v-col>
                  <v-col v-if="!event.isRecurring" cols="12" sm="4">
                    <div class="text-caption text-medium-emphasis">Partecipanti</div>
                    <div class="text-body-1">{{ event.ticketsSold || 0 }} / {{ event.capacity || 0 }}</div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="4" class="d-flex justify-end align-center">
                <v-btn
                  color="#f34455"
                  prepend-icon="mdi-account-group"
                  @click="showParticipants(event)"
                >
                  {{ event.isRecurring ? 'Elenco degli eventi singoli' : 'Partecipanti' }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-6">
      <v-col>
        <v-expansion-panels v-model="showPastEvents">
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center">
                <v-icon :icon="showPastEvents ? 'mdi-chevron-down' : 'mdi-chevron-right'" class="mr-2" />
                Eventi Passati
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-row>
                <v-col v-for="event in pastEvents" :key="event.id" cols="12">
                  <v-card variant="outlined">
                    <v-card-item>
                      <v-row>
                        <v-col cols="12" md="8">
                          <div class="d-flex align-center">
                            <h3 class="text-h5 mr-4">{{ event.name }}</h3>
                            <v-chip
                              :color="getStatusClass(event.status)"
                              class="ml-2"
                            >
                              {{ getStatusText(event.status, event) }}
                            </v-chip>
                          </div>
                          <p class="text-body-1 text-medium-emphasis mt-2">{{ event.description || event.name }}</p>
                          <v-row class="mt-4">
                            <v-col cols="12" sm="4">
                              <div class="text-caption text-medium-emphasis">{{ event.isRecurring ? 'Ricorrenza' : 'Data' }}</div>
                              <div class="text-body-1">
                                <template v-if="event.isRecurring">
                                  {{ getRecurrenceText(event) }}
                                </template>
                                <template v-else>
                                  {{ formatDate(event.date) }}
                                </template>
                              </div>
                            </v-col>
                            <v-col v-if="!event.isRecurring" cols="12" sm="4">
                              <div class="text-caption text-medium-emphasis">Orario</div>
                              <div class="text-body-1">{{ event.startTime }} - {{ event.endTime }}</div>
                            </v-col>
                            <v-col v-if="!event.isRecurring" cols="12" sm="4">
                              <div class="text-caption text-medium-emphasis">Partecipanti</div>
                              <div class="text-body-1">{{ event.ticketsSold || 0 }} / {{ event.capacity || 0 }}</div>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12" md="4" class="d-flex justify-end align-center">
                          <v-btn
                            color="#f34455"
                            prepend-icon="mdi-account-group"
                            @click="showParticipants(event)"
                          >
                            {{ event.isRecurring ? 'Elenco degli eventi singoli' : 'Partecipanti' }}
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-item>
                  </v-card>
                </v-col>
              </v-row>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>

    <v-dialog
      v-model="showOccurrenceModal"
      max-width="800"
      scrollable
    >
      <v-card>
        <v-toolbar density="compact">
          <v-btn color="#f34455" icon @click="showOccurrenceModal = false">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-toolbar-title>{{ selectedEvent?.name }}</v-toolbar-title>
        </v-toolbar>
        <v-card-text class="pa-4">
          <v-row>
            <v-col v-for="occurrence in sortedOccurrences" :key="occurrence.id" cols="12">
              <v-card variant="outlined">
                <v-card-item>
                  <v-row>
                    <v-col cols="12" md="8">
                      <div class="d-flex align-center">
                        <h3 class="text-h6">{{ formatDate(occurrence.date) }}</h3>
                        <v-chip
                          :color="getStatusClass(occurrence.status)"
                          class="ml-2"
                        >
                          {{ getStatusText(occurrence.status, occurrence) }}
                        </v-chip>
                      </div>
                      <v-row class="mt-4">
                        <v-col cols="12" sm="6">
                          <div class="text-caption text-medium-emphasis">Orario</div>
                          <div class="text-body-1">{{ occurrence.startTime }} - {{ occurrence.endTime }}</div>
                        </v-col>
                        <v-col cols="12" sm="6">
                          <div class="text-caption text-medium-emphasis">Partecipanti</div>
                          <div class="text-body-1">{{ occurrence.ticketsSold }} / {{ occurrence.capacity }}</div>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" md="4" class="d-flex justify-end align-center">
                      <v-btn
                        color="#f34455"
                        prepend-icon="mdi-account-group"
                        @click="showOccurrenceParticipants(occurrence)"
                      >
                        Partecipanti
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-item>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="showParticipantsModal"
      max-width="800"
    >
      <EventParticipants 
        :event="participantsEvent" 
        :isRecurringOccurrence="isRecurringOccurrence"
        @close="showParticipantsModal = false" 
      />
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';
import EventParticipants from './EventParticipants.vue';

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
.events-dashboard {
  background-color: #f7f4ef;
}
</style>
