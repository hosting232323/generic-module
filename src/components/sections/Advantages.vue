<template>
  <v-container>
    <h1 :style="{ color: props.primaryColor }">
      {{ props.title }}
    </h1>
    <v-card elevation="20" v-for="advantage in props.content" class="margin_top__default">
      <v-img :src="advantage.image" style="max-height: 600px;" cover />
      <v-card-title style="white-space: normal;">
        {{ advantage.name }}
      </v-card-title>
      <v-card-text v-if="advantage.description">
        <div v-html="advantage.description" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
  const { content, info } = defineProps(['content', 'info']);

  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    content: {
      type: array,
      required: true
    },
    primaryColor: {
      type: String,
      required: true
    },
    secondaryColor: {
      type: String,
      required: true
    },
  })

</script>
