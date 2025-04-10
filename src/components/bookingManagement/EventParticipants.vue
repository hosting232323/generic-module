<template>
  <v-card class="participants-modal">
    <v-card-title class="d-flex justify-space-between align-center pa-4">
      <span>Partecipanti all'evento</span>
      <v-btn icon="mdi-close" variant="text" @click="$emit('close')" />
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="d-flex flex-column">
              <h3 class="text-h5">{{ props.event.name }}</h3>
              <p v-if="props.isRecurringOccurrence" class="text-body-1">
                Data: {{ formatDate(props.event.date) }} | 
                Orario: {{ props.event.startTime }} - {{ props.event.endTime }}
              </p>
            </div>
          </v-col>

          <v-col cols="12" sm="6" md="auto">
            <v-card variant="outlined" class="pa-4">
              <div class="text-caption text-medium-emphasis">Totale Partecipanti</div>
              <div class="text-h6">{{ displayedParticipants }}</div>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="auto">
            <v-card variant="outlined" class="pa-4">
              <div class="text-caption text-medium-emphasis">Posti Disponibili</div>
              <div class="text-h6">{{ props.event.capacity - displayedParticipants }}</div>
            </v-card>
          </v-col>

          <v-col cols="12" class="d-flex gap-6 mt-4">
            <v-btn
              class="me-4"
              color="#f34455"
              prepend-icon="mdi-calendar"
              @click="exportFile('ics')"
            >
              Esporta ICS
            </v-btn>
            <v-btn
              class="me-4"
              color="#f34455"
              prepend-icon="mdi-file-excel"
              @click="exportFile('xls')"
            >
              Esporta XLS
            </v-btn>
            <v-btn
              class="me-4"
              :loading="blockLoading"
              color="#f34455"
              prepend-icon="mdi-lock"
              @click="toggleEventBlocked"
            >
              Blocca
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-4">
          <v-col cols="12">
            <v-progress-circular
              v-if="loading"
              indeterminate
              color="#f34455"
              class="ma-4"
            />

            <v-alert
              v-else-if="participants.length === 0"
              type="info"
              text="Nessun partecipante registrato per questo evento."
            />

            <v-table
              v-else
              hover
            >
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
                    <v-btn
                      color="error"
                      icon="mdi-delete"
                      size="small"
                      variant="text"
                      @click="deleteParticipant(participant)"
                    />
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
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

