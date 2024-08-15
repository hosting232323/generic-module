<template>
  <div>
    {{ site.name }}
    <v-slide-group v-model="slideGroupIndex">
      <v-slide-group-item v-for="(image, index) in duplicatedImages" :key="index">
        <v-card>
          <v-img width="750" height="750" :src="image" />
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </div>
</template>

<script setup>
  import { ref, computed } from 'vue';

  const { site } = defineProps(['site']);

  const duplicatedImages = computed(() => {
    return Array(9).fill(site.images).flat();
  });

  const slideGroupIndex = ref(site.images.length * 4);
</script>
