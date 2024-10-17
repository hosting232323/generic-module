<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="firstName"
          label="Nome"
          placeholder="Inserisci il nome"
          outlined
          dense
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="lastName"
          label="Cognome"
          placeholder="Inserisci il cognome"
          outlined
          dense
        />
      </v-col>
    </v-row>
    

    <!-- Autocomplete per la regione -->
    <v-autocomplete
      v-model="selectedRegion"
      :items="availableRegions"
      label="Seleziona una regione"
      placeholder="Inserisci la regione"
      hide-no-data
      hide-selected
      :readonly="addressMode === 2"
      outlined
      dense
    />

    <!-- Autocomplete per la provincia -->
    <v-autocomplete
      v-model="selectedProvince"
      :items="availableProvinces"
      label="Seleziona una provincia"
      placeholder="Inserisci la provincia"
      hide-no-data
      hide-selected
      :readonly="addressMode === 2"
      :disabled="addressMode === 1 ? !selectedRegion : false"
      outlined
      dense
    />

    <!-- Autocomplete per la città -->
    <v-autocomplete
      v-model="selectedCity"
      :items="availableCities"
      label="Seleziona una città"
      placeholder="Inserisci la città"
      hide-no-data
      hide-selected
      :disabled="addressMode === 1 ? !selectedProvince : false"
      outlined
      dense
    />

    <v-text-field
      v-model="streetAddress"
      label="Inserisci la via e il numero"
      placeholder="Via e numero"
      outlined
      dense
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import comuniData from '@/utils/comuni.json';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';

// Store e variabili
const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);

const store = data.value.store;
const addressMode = store.addressMode;

// Salvataggio selezione
const firstName = ref('');
const lastName = ref('');
const streetAddress = ref('');
const selectedRegion = ref('');
const selectedProvince = ref('');
const selectedCity = ref('');

// Salvataggio disponibilità
const availableRegions = ref([]);
const availableProvinces = ref([]);
const availableCities = ref([]);

// Funzioni di aggiornamento
const updateProvince = () => {
  if (selectedRegion.value && comuniData[selectedRegion.value]) {
    availableProvinces.value = Object.keys(comuniData[selectedRegion.value]);
    selectedProvince.value = '';
    availableCities.value = [];
    selectedCity.value = '';
  }
};

const updateCity = () => {
  if (selectedProvince.value && comuniData[selectedRegion.value][selectedProvince.value]) {
    availableCities.value = comuniData[selectedRegion.value][selectedProvince.value];
    selectedCity.value = '';
  }
};

const updateRegionForProvince = () => {
  for (const regione in comuniData) {
    if (comuniData[regione][selectedProvince.value]) {
      selectedRegion.value = regione;
      updateCity();
      break;
    }
  }
};

const updateRegionAndProvinceForCities = () => {
  for (const regione in comuniData) {
    for (const provincia in comuniData[regione]) {
      const citiesInProvince = comuniData[regione][provincia];
      const allCitiesMatch = availableCities.value.every(city => citiesInProvince.includes(city));

      if (allCitiesMatch) {
        selectedProvince.value = provincia;
        selectedRegion.value = regione;
        break;
      }
    }
  }
};

// Funzione per impostare le città predefinite
const setCittaPredefinite = () => {
  if (addressMode === 3) {
    availableCities.value = store.cities;
    updateRegionAndProvinceForCities();
    selectedCity.value = '';
  } else if (addressMode === 2) {
    selectedProvince.value = store.province;
    updateRegionForProvince();
  }
};

// Watchers
watch(selectedRegion, () => {
  if (addressMode == 1) {
    updateProvince();
  }
});

watch(selectedProvince, () => {
  if (addressMode === 1) {
    updateCity();
  } else if (addressMode === 2) {
    updateRegionForProvince();
  }
});

onMounted(() => {
  if (addressMode === 1) {
    availableRegions.value = Object.keys(comuniData);
  } else {
    setCittaPredefinite();
  }
});
</script>
