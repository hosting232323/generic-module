<template>
  <v-container :style="{ color: data.primaryColor }">
    <center>
    <h2>
      Rapporto con i Clienti
    </h2>
    <p class="black_text">
      Il nostro successo si basa su rapporti di fiducia e trasparenza con i clienti, dimostrando dedizione e impegno costante.
    </p><br>
    <h2>
      Professionalità e Affidabilità
    </h2>
    <p class="black_text">
      Il nostro team offre un servizio d'eccellenza, mantenendo elevati standard di qualità e supporto costante.
    </p><br>
    <h2>
      Storia Quarantennale
    </h2>
    <p class="black_text">
      Con oltre quarant'anni di esperienza, abbiamo costruito una solida reputazione, sviluppando rapporti duraturi con clienti e partner.
    </p><br>
    <h2>
      Impegno per la <span class="green_text">Sostenibilità</span>
    </h2>
    <p class="black_text">
      Collaboriamo con marchi e fornitori etici, promuovendo materiali <span class="green_text">eco-friendly</span> e processi produttivi responsabili.
    </p>
  </center>
  </v-container>
</template>

<script setup>
  import { storeToRefs } from 'pinia';
  import { useDataStore } from '@/stores/data';

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);
</script>

<style scoped>
  .green_text {
    color: #009900;
  }

  .black_text {
    color: black;
    font-size: large;
  }
</style>
