<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-text-field
          v-model="addressStore.firstname"
          label="Nome"
          placeholder="Inserisci il nome"
          outlined
          dense
          :rules="[value => !!value || 'Campo obbligatorio']"
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="addressStore.lastname"
          label="Cognome"
          placeholder="Inserisci il cognome"
          outlined
          dense
          :rules="[value => !!value || 'Campo obbligatorio']"
        />
      </v-col>
    </v-row>

    <!-- Autocomplete per la regione -->
    <v-autocomplete
      v-model="addressStore.region"
      :items="availableRegions"
      label="Seleziona una regione"
      placeholder="Inserisci la regione"
      hide-no-data
      hide-selected
      :readonly="addressMode === 2"
      outlined
      dense
      :rules="[value => !!value || 'Campo obbligatorio']"
    />

    <!-- Autocomplete per la provincia -->
    <v-autocomplete
      v-model="addressStore.province"
      :items="availableProvinces"
      label="Seleziona una provincia"
      placeholder="Inserisci la provincia"
      hide-no-data
      hide-selected
      :readonly="addressMode === 2"
      :disabled="addressMode === 1 ? !addressStore.region : false"
      outlined
      dense
      :rules="[value => !!value || 'Campo obbligatorio']"
    />

    <!-- Autocomplete per la città -->
    <v-autocomplete
      v-model="addressStore.city"
      :items="availableCities"
      label="Seleziona una città"
      placeholder="Inserisci la città"
      hide-no-data
      hide-selected
      :disabled="addressMode === 1 ? !addressStore.province : false"
      outlined
      dense
      :rules="[value => !!value || 'Campo obbligatorio']"
    />

    <v-text-field
      v-model="addressStore.address"
      label="Inserisci la via e il numero civico"
      placeholder="Via e numero"
      outlined
      dense
      :rules="[value => !!value || 'Campo obbligatorio']"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import comuniData from '@/assets/comuni.json';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';
import { useAddressStore } from '@/stores/address';

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);

const store = data.value.store;
const addressMode = store?.addressMode;

const addressStore = useAddressStore();

const availableRegions = ref([]);
const availableProvinces = ref([]);
const availableCities = ref([]);

const updateProvince = (isInput = false) => {
  if (addressStore.region && addressStore.province && !isInput) return; 
  if (addressStore.region && comuniData[addressStore.region]) {
    availableProvinces.value = Object.keys(comuniData[addressStore.region]);
    addressStore.province = '';
    availableCities.value = [];
    addressStore.city = '';
  }
};

const updateCity = (isInput = false) => {
  if (addressStore.region && addressStore.province && addressStore.city && !isInput) return;
  if (addressStore.province && comuniData[addressStore.region]?.[addressStore.province]) {
    availableCities.value = comuniData[addressStore.region][addressStore.province];
    addressStore.city = '';
  }
};

const updateRegionForProvince = () => {
  for (const regione in comuniData) {
    if (comuniData[regione][addressStore.province]) {
      addressStore.region = regione;
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
        addressStore.province = provincia;
        addressStore.region = regione;
        break;
      }
    }
  }
};

const setCittaPredefinite = () => {
  if (addressMode === 3) {
    availableCities.value = store.cities;
    updateRegionAndProvinceForCities();
    addressStore.city = '';
  } else if (addressMode === 2) {
    addressStore.province = store.province;
    updateRegionForProvince();
  }
};

watch(() => addressStore.region, () => {
  if (addressMode == 1) {
    updateProvince(true);
  }
});

watch(() => addressStore.province, () => {
  if (addressMode === 1) {
    updateCity(true);
  } else if (addressMode === 2) {
    updateRegionForProvince();
  }
});

onMounted(() => {
  if (addressStore.region) {
    updateProvince();
    if (addressStore.province) {
      updateCity();
    }
  }

  if (addressMode === 1) {
    availableRegions.value = Object.keys(comuniData);
  } else {
    setCittaPredefinite();
  }
});
</script>
