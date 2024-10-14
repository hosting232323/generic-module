<template>
  <v-app>
    <UpArrow />
    <AppBar />
    <View />
    <Footer />
    <Popup 
      :initialVisible="popupVisible" 
      :content="popupContent" 
      :type="popupType" 
      @update:visible="popupVisible = $event"
    />
  </v-app>
</template>

<script setup>
  import UpArrow from './UpArrow.vue';
  import View from './View.vue';
  import AppBar from './AppBar.vue';
  import Footer from './Footer.vue';
  import Popup from './Popup.vue';

  import { ref } from 'vue';
  import { useDataStore } from '@/stores/data';

  const dataStore = useDataStore();
  const { initData } = dataStore;
  initData();

  const popupVisible = ref(false);
  const popupContent = ref('');
  const popupType = ref('success');

  const showPopup = (content, type = 'success') => {
    popupContent.value = content;
    popupType.value = type;
    popupVisible.value = true;
  };
</script>
