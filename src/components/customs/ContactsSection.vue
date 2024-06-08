<template>
  <v-container>
    <h1 :style="{ color: info.primaryColor }">
      I nostri contatti
    </h1>
    <v-list>
      <v-list-item
        v-for="(contact_type, index) in getContactTypes(content)"
        :key="index"
        height="20"
        style="height: auto;"
      >
        <template #prepend>
          <v-icon
            :icon="CONTACT_ICON_MAP[contact_type]"
            :color="info.primaryColor"
          />
        </template>
        <v-list-item-title
          class="contact__text"
          v-html="content[contact_type]"
        />
      </v-list-item>
    </v-list><br>
    <hr :style="{ height: '5px', backgroundColor: info.primaryColor }">
  </v-container>
</template>

<script setup>
const { content, info } = defineProps({
  content: {
    type: Object,
    required: true
  },
  info: {
    type: Object,
    required: true
  }
});

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
