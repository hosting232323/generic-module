<template>
  <v-container>
    <h1 :style="{ color: data.primaryColor }">
      I nostri contatti
    </h1>
    <v-list>
      <v-list-item height="20" v-for="contact_type in getContactTypes(data.contacts)" style="height: auto;" >
        <template v-slot:prepend>
          <v-icon :icon="CONTACT_ICON_MAP[contact_type]" :color="data.primaryColor" />
        </template>
        <v-list-item-title v-html="data.contacts[contact_type]" class="contact__text" />
      </v-list-item>
    </v-list><br>
    <hr :style="{ height: '5px', backgroundColor: data.primaryColor }" />
    <Map v-if="data.map" />
  </v-container>
</template>

<script setup>
  import Map from '@/components/Map';

  import { storeToRefs } from 'pinia';
  import { useDataStore } from '@/stores/data';

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);

  const CONTACT_ICON_MAP = {
    Phone: 'mdi-phone',
    Address: 'mdi-map-marker',
    Mail: 'mdi-email'
  };
  const getContactTypes = (contacts) => {
    return Object.keys(contacts).filter(contact => CONTACT_ICON_MAP[contact]);
  };
</script>

<style scoped>
  .contact__text {
    white-space: normal;
  }
</style>
