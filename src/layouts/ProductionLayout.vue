<template>
  <v-app>
    <UpArrow :info="info" />
    <AppBar :info="info" :addOn="addOn" :components="components" :routeId="routeId" />
    <View :info="info" :addOn="addOn" :components="components" /> 
    <Footer :info="info" />
  </v-app>
</template>

<script setup>
  import UpArrow from './UpArrow.vue';
  import View from './View.vue';
  import AppBar from './AppBar.vue';
  import Footer from './Footer.vue';
  import { computed } from 'vue';
  import productionData from '@/productionData';


  const props = defineProps({
    content: {
      type: Object,
      default: () => productionData
    },
    routeId: {
      type: String,
      required: false
    },
  })

  const content = computed(() => props.content);

  const info = computed(() => content.value.info);
  const addOn = computed(() => content.value.addOn);
  const components = computed(() => content.value.components);

</script>
