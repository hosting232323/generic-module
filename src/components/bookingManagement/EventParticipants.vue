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

      <div class="participants-table">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Cognome</th>
              <th>Email</th>
              <th>Telefono</th>
              <th>N° Partecipanti</th>
              <th>Lingua</th>
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
              <td>{{ participant.language }}</td>
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

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      participants: this.generateRandomParticipants()
    };
  },

  computed: {
    totalParticipants() {
      return this.participants.reduce((sum, p) => sum + p.numberOfParticipants, 0);
    }
  },

  methods: {
    generateRandomParticipants() {
      const languages = ['Italiano', 'Inglese', 'Francese', 'Tedesco', 'Spagnolo'];
      const firstNames = ['Marco', 'Anna', 'Giuseppe', 'Maria', 'Giovanni', 'Laura', 'Paolo', 'Chiara'];
      const lastNames = ['Rossi', 'Bianchi', 'Verdi', 'Ferrari', 'Romano', 'Costa'];
      const notes = [
        'Richiesta posto vicino al palco',
        'Allergia al lattosio',
        'Necessita di assistenza',
        'Gruppo familiare',
        null,
        null
      ];

      const numParticipants = Math.floor(Math.random() * (this.event.capacity * 0.8));
      const participants = [];

      for (let i = 0; i < numParticipants; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        
        participants.push({
          firstName,
          lastName,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}@email.com`,
          phone: `+39 ${Math.floor(Math.random() * 1000).toString().padStart(3, '0')} ${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`,
          numberOfParticipants: Math.floor(Math.random() * 3) + 1,
          language: languages[Math.floor(Math.random() * languages.length)],
          notes: notes[Math.floor(Math.random() * notes.length)]
        });
      }

      return participants;
    }
  }
};
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

tr:hover {
  background-color: #f8f8f8;
}

.notes-tooltip {
  color: #666;
  cursor: help;
}

.notes-tooltip:hover {
  color: #333;
}
</style>
