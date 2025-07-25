<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3" class="filters-container">
        <v-card class="pa-4" elevation="2">
          <h3 class="text-h6 font-weight-bold mb-2">Categorie</h3>
          <v-btn
            v-for="(cat, index) in data.menu"
            :key="cat.name"
            class="mb-2"
            block
            :color="selectedIndex === index ? data.info.primaryColor : 'grey-lighten-3'"
            @click="selectedIndex = index"
          >
            <v-icon start>{{ cat.icon }}</v-icon>
            {{ cat.name }}
          </v-btn>

          <v-divider class="my-4" />
        </v-card>
      </v-col>

      <v-col cols="12" md="9">
          <div v-if="filteredItems.length" :key="selectedIndex">
            <v-sheet
              class="category-header mb-6"
              height="180"
              elevation="3"
              :style="{ backgroundImage: `url(${currentCategory.image})` }"
            >
              <div class="category-overlay">
                <h2 class="text-h4 font-weight-bold">{{ currentCategory.name }}</h2>
              </div>
            </v-sheet>

            <v-row>
              <v-col v-for="item in filteredItems" :key="item.name" cols="12" md="6">
                <v-card class="mb-4" elevation="2">
                  <v-row no-gutters>
                    <v-col cols="4" class="d-flex align-center justify-center">
                      <v-img :src="item.image" aspect-ratio="1" class="rounded-l" ></v-img>
                    </v-col>
                    <v-col cols="8">
                      <v-card-title class="d-flex justify-space-between">
                        <span class="font-weight-bold">{{ item.name }}</span>
                        <span class="text-primary">{{ item.price }} €</span>
                      </v-card-title>
                      <v-card-text class="text-grey-darken-1">
                        {{ item.description }}
                      </v-card-text>
                      <AllergenChips :allergens="item.allergens" />
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </div>
          <div v-else class="text-center mt-10">
            <v-icon size="64" color="grey">mdi-food-off</v-icon>
            <div class="mt-2 text-grey">Nessun elemento corrisponde ai filtri.</div>
          </div>
      </v-col>
    </v-row>
  </v-container>
  <AllergenFab
    v-model="selectedAllergens"
    :allergens="allAllergens"
  />
</template>

<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';
import AllergenChips from '@/components/menu/AllergenChips.vue';
import AllergenFab from '@/components/menu/AllergenFab.vue'

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);

const selectedIndex = ref(0);
const selectedAllergens = ref([]);

const allAllergens = computed(() => {
  const allergensSet = new Set();
  data.value.menu.forEach(cat => {
    cat.items?.forEach(item => {
      item.allergens?.forEach(a => allergensSet.add(a));
    });
  });
  return [...allergensSet];
});

const currentCategory = computed(() => data.value.menu[selectedIndex.value]);

const filteredItems = computed(() => {
  if (!currentCategory.value) return [];

  return currentCategory.value.items.filter(item => {
    const noAllergenConflict = selectedAllergens.value.every(
      allergen => !item.allergens?.includes(allergen)
    );

    return noAllergenConflict;
  });
});
</script>

<style scoped>
.filters-container {
  padding-right: 1rem;
}

.category-header {
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}

.category-overlay {
  background: rgba(0, 0, 0, 0.5);
  color: white;
  height: 100%;
  padding: 1.5rem;
  display: flex;
  align-items: center;
}
</style>
