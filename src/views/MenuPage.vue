<template>
  <v-container>
    <v-row v-if="!selectedCategory">
      <v-col
        v-for="cat in data.menu.products"
        :key="cat.name"
        cols="12"
        md="4"
      >
        <v-card
          class="category-card"
          height="200"
          elevation="3"
          :style="{ backgroundImage: `url(${cat.image})` }"
          @click="openCategory(cat)"
        >
          <v-sheet
            class="d-flex align-center justify-center category-overlay"
            :color="data.info.primaryColor"
          >
            <p class="category-title">
              {{ getText(cat.name) }}
            </p>
          </v-sheet>
        </v-card>
      </v-col>
    </v-row>

    <div v-else>
      <v-btn
        class="mb-4"
        :style="{ color: data.info.primaryColor }"
        @click="selectedCategory = null"
      >
        ← {{ getText(data.menu.content?.backCategories) || 'Torna Indietro' }}
      </v-btn>
      <v-card
        class="category-card mb-6"
        height="200"
        elevation="3"
        :style="{ backgroundImage: `url(${selectedCategory.image})`, cursor: 'default' }"
      >
        <v-sheet
          class="d-flex align-center justify-center category-overlay"
          :color="data.info.primaryColor"
        >
          <p class="category-title">
            {{ getText(selectedCategory.name) }}
          </p>
        </v-sheet>
      </v-card>
      <v-row>
        <v-col
          v-for="item in filteredItems"
          :key="item.name"
          cols="12"
          md="6"
        >
          <v-card
            class="mb-4"
            elevation="2"
          >
            <v-row no-gutters>
              <v-col
                cols="4"
                class="d-flex align-center justify-center"
              >
                <v-img
                  :src="item.image"
                  aspect-ratio="1"
                  class="rounded-l"
                />
              </v-col>
              <v-col cols="8">
                <v-card-title
                  class="d-flex justify-space-between"
                  style="font-size: 16px;"
                >
                  <span class="font-weight-bold">{{ getText(item.name) }}</span>
                  <span class="text-primary">{{ item.price }} €</span>
                </v-card-title>
                <v-card-text class="text-grey-darken-1">
                  {{ getText(item.description) }}
                </v-card-text>
                <AllergenChips :allergens="item.allergens" />
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';
import { useLanguageStore } from '@/stores/language';
import AllergenChips from '@/components/menu/AllergenChips.vue';

const { getText } = useLanguageStore();

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);

const selectedCategory = ref(null);
const selectedAllergens = ref([]);

const filteredItems = computed(() => {
  if (!selectedCategory.value) return [];

  return selectedCategory.value.items.filter(item => {
    const noAllergenConflict = selectedAllergens.value.every(
      allergen => !item.allergens?.includes(allergen)
    );
    return noAllergenConflict;
  });
});

const openCategory = async (cat) => {
  selectedCategory.value = cat;
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
</script>

<style scoped>
.category-card {
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
}

.category-header {
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
}

.category-overlay {
  height: 16%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
}

.category-title {
  text-transform: uppercase;
  font-size: 17px;
  letter-spacing: 1px;
  font-weight: bold;
}
</style>
