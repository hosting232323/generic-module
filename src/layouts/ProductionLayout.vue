<template>
  <v-app>
    <UpArrow :info="info" />
    <AppBar :info="info" :addOn="addOn" :components="components" />
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
      required: false
    }
  })

  const content = computed(() => Object.keys(props.content).length > 0 ? props.content : productionData);

  const info = computed(() => content.value.info);
  const addOn = computed(() => content.value.addOn);
  const components = computed(() => content.value.components);

</script>
