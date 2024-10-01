<template>
  <!-- <v-container>
    <v-row>
      <v-col cols="12" md="3" v-for="ownership in ownerships">
        <v-card
          v-if="!ownership.addActivity"
          :class="{ 'selected-card': ownership.business_activity.id == selectedBusinessActivityId }"
          @click="selectActivity(ownership, index)"
          :disabled="ownership.business_activity.id == selectedBusinessActivityId"
        >
          <v-img
            height="200"
            :src="getImageForActivity(ownership)"
            cover
          />
          <v-card-title>{{ ownership.business_activity.name }}</v-card-title>

          <v-card-subtitle class="pt-4">
            {{ ownership.membership }} Membership
          </v-card-subtitle>

          <v-card-text>
            <div>{{ ownership.business_activity.address }}, {{ ownership.business_activity.street_number }}</div>
            <div>{{ ownership.business_activity.city }}</div>
          </v-card-text>

          <v-card-actions>
            <v-btn color="purple">Dettagli</v-btn>
          </v-card-actions>
        </v-card>
        
      </v-col>
    </v-row>
  </v-container> -->
</template>
  
<script setup>
  const businessActivityBrooking = import.meta.env.BUSINESS_ACTIVITY_BROOKING;
  import { useHead } from '@vueuse/head';
  import { ref, onMounted } from 'vue';
  import http from '@/utils/http';
  const ownerships = ref([]);

  const fetchBusinessActivities = () => {
    http.getRequestBrooking(`api/shop/product/${businessActivityBrooking}/`, {}, function (data) {
      // ownerships.value = data;
      // ownerships.value.push({
      //     addActivity: true
      //   });
        console.log(data);
    }, true);
  };

  const getImageForActivity = (ownership) => {
    return ownership.business_activity.image_url
      ? ownership.business_activity.image_url
      : 'https://4kwallpapers.com/images/walls/thumbs_3t/11056.jpg';
  };

  useHead({
    title: 'About Page',
    meta: [
      { name: 'description', content: 'This is the about page' }
    ]
  });

  onMounted(() => {
    fetchBusinessActivities();
  });
</script>
