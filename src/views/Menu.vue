<template>
  <v-container class="py-16">
    <v-row justify="center" class="mb-8">
      <v-col cols="12" class="text-center">
        <h1 class="text-h2 mb-4">Menu</h1>
        <p class="text-h5 text-medium-emphasis">Filtra i piatti per allergeni</p>
      </v-col>
    </v-row>

    <v-row justify="center" class="mb-6">
      <v-col cols="12" md="10" lg="8">
        <v-card elevation="2" class="pa-4">
          <v-card-title class="text-h5 mb-4">Seleziona gli allergeni da escludere</v-card-title>
          <AllergenFilter
            :allergens="allAllergens"
            v-model="selectedAllergens"
          />
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6" v-for="(category, idx) in menuData" :key="idx">
        <v-card elevation="4" class="mb-4">
          <v-img
            v-if="category.image"
            :src="category.image"
            height="200"
            cover
          >
            <div class="d-flex align-center justify-center h-100" style="background: rgba(0,0,0,0.5);">
              <h2 class="text-h4 text-white font-weight-bold">{{ getText(category.name) }}</h2>
            </div>
          </v-img>
          <v-card-text>
            <div v-for="(item, itemIdx) in getFilteredItems(category.items)" :key="itemIdx" class="mb-6">
              <div class="d-flex justify-space-between align-start mb-2">
                <div>
                  <h3 class="text-h6 font-weight-bold">{{ getText(item.name) }}</h3>
                  <p class="text-body-2 text-medium-emphasis">{{ getText(item.description) }}</p>
                </div>
                <div class="text-h6 text-primary font-weight-bold ml-4">€{{ item.price }}</div>
              </div>
              <AllergenChips v-if="item.allergens && item.allergens.length" :allergens="item.allergens" />
              <v-divider v-if="itemIdx < getFilteredItems(category.items).length - 1" class="mt-4"></v-divider>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <AllergenFab
      :allergens="allAllergens"
      v-model="selectedAllergens"
    />
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useDataStore } from '@/stores/data';
import { useLanguageStore } from '@/stores/language';
import AllergenChips from '@/components/menu/AllergenChips.vue';
import AllergenFilter from '@/components/menu/AllergenFilter.vue';
import AllergenFab from '@/components/menu/AllergenFab.vue';

const data = useDataStore();
const { getText } = useLanguageStore();

const selectedAllergens = ref([]);

const exampleMenu = [
  {
    name: { it: 'Antipasti', gb: 'Appetizers' },
    icon: 'mdi-food',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
    items: [
      {
        name: { it: 'Bruschette al Pomodoro', gb: 'Tomato Bruschetta' },
        description: { it: 'Pane tostato con pomodorini freschi, aglio e basilico', gb: 'Toasted bread with fresh tomatoes, garlic and basil' },
        price: 6,
        allergens: [
          { it: 'glutine', gb: 'gluten' }
        ]
      },
      {
        name: { it: 'Caprese', gb: 'Caprese Salad' },
        description: { it: 'Mozzarella di bufala, pomodoro e basilico', gb: 'Buffalo mozzarella, tomato and basil' },
        price: 8,
        allergens: [
          { it: 'lattosio', gb: 'lactose' }
        ]
      },
      {
        name: { it: 'Frittura Mista', gb: 'Mixed Fried' },
        description: { it: 'Verdure e pesce pastellati', gb: 'Battered vegetables and fish' },
        price: 12,
        allergens: [
          { it: 'glutine', gb: 'gluten' },
          { it: 'pesce', gb: 'fish' },
          { it: 'uova', gb: 'eggs' }
        ]
      }
    ]
  },
  {
    name: { it: 'Pizze', gb: 'Pizzas' },
    icon: 'mdi-pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
    items: [
      {
        name: { it: 'Margherita', gb: 'Margherita' },
        description: { it: 'Pomodoro, mozzarella e basilico', gb: 'Tomato, mozzarella and basil' },
        price: 7,
        allergens: [
          { it: 'glutine', gb: 'gluten' },
          { it: 'lattosio', gb: 'lactose' }
        ]
      },
      {
        name: { it: 'Quattro Formaggi', gb: 'Four Cheese' },
        description: { it: 'Mozzarella, gorgonzola, parmigiano e fontina', gb: 'Mozzarella, gorgonzola, parmesan and fontina' },
        price: 9,
        allergens: [
          { it: 'glutine', gb: 'gluten' },
          { it: 'lattosio', gb: 'lactose' }
        ]
      },
      {
        name: { it: 'Marinara', gb: 'Marinara' },
        description: { it: 'Pomodoro, aglio e origano', gb: 'Tomato, garlic and oregano' },
        price: 6,
        allergens: [
          { it: 'glutine', gb: 'gluten' }
        ]
      },
      {
        name: { it: 'Frutti di Mare', gb: 'Seafood' },
        description: { it: 'Pomodoro e mix di frutti di mare', gb: 'Tomato and mixed seafood' },
        price: 13,
        allergens: [
          { it: 'glutine', gb: 'gluten' },
          { it: 'pesce', gb: 'fish' },
          { it: 'crostacei', gb: 'shellfish' },
          { it: 'molluschi', gb: 'molluscs' }
        ]
      }
    ]
  },
  {
    name: { it: 'Primi Piatti', gb: 'First Courses' },
    icon: 'mdi-pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
    items: [
      {
        name: { it: 'Carbonara', gb: 'Carbonara' },
        description: { it: 'Pasta con guanciale, uova e pecorino', gb: 'Pasta with guanciale, eggs and pecorino' },
        price: 11,
        allergens: [
          { it: 'glutine', gb: 'gluten' },
          { it: 'uova', gb: 'eggs' },
          { it: 'lattosio', gb: 'lactose' }
        ]
      },
      {
        name: { it: 'Amatriciana', gb: 'Amatriciana' },
        description: { it: 'Pasta con guanciale, pomodoro e pecorino', gb: 'Pasta with guanciale, tomato and pecorino' },
        price: 10,
        allergens: [
          { it: 'glutine', gb: 'gluten' },
          { it: 'lattosio', gb: 'lactose' }
        ]
      },
      {
        name: { it: 'Pasta alle Vongole', gb: 'Clam Pasta' },
        description: { it: 'Spaghetti con vongole veraci', gb: 'Spaghetti with clams' },
        price: 14,
        allergens: [
          { it: 'glutine', gb: 'gluten' },
          { it: 'molluschi', gb: 'molluscs' }
        ]
      }
    ]
  },
  {
    name: { it: 'Dolci', gb: 'Desserts' },
    icon: 'mdi-cake',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
    items: [
      {
        name: { it: 'Tiramisù', gb: 'Tiramisu' },
        description: { it: 'Classico dolce al cucchiaio con caffè', gb: 'Classic spoon dessert with coffee' },
        price: 6,
        allergens: [
          { it: 'glutine', gb: 'gluten' },
          { it: 'uova', gb: 'eggs' },
          { it: 'lattosio', gb: 'lactose' }
        ]
      },
      {
        name: { it: 'Panna Cotta', gb: 'Panna Cotta' },
        description: { it: 'Dolce a base di panna con frutti di bosco', gb: 'Cream-based dessert with berries' },
        price: 5,
        allergens: [
          { it: 'lattosio', gb: 'lactose' }
        ]
      },
      {
        name: { it: 'Crostata alla Frutta', gb: 'Fruit Tart' },
        description: { it: 'Pasta frolla con crema e frutta fresca', gb: 'Shortcrust pastry with cream and fresh fruit' },
        price: 5.5,
        allergens: [
          { it: 'glutine', gb: 'gluten' },
          { it: 'uova', gb: 'eggs' },
          { it: 'lattosio', gb: 'lactose' },
          { it: 'frutta_a_guscio', gb: 'nuts' }
        ]
      }
    ]
  }
];

const menuData = computed(() => {
  const dataMenu = data.data?.menu;
  return (dataMenu && dataMenu.length > 0) ? dataMenu : exampleMenu;
});

const allAllergens = computed(() => {
  const allergensSet = new Set();
  menuData.value.forEach(category => {
    category.items?.forEach(item => {
      item.allergens?.forEach(allergen => {
        if (typeof allergen === 'string') {
          allergensSet.add(allergen);
        } else if (allergen.it) {
          allergensSet.add(allergen.it);
        }
      });
    });
  });
  return Array.from(allergensSet);
});

const getFilteredItems = (items) => {
  if (!items) return [];
  if (selectedAllergens.value.length === 0) return items;

  return items.filter(item => {
    if (!item.allergens || item.allergens.length === 0) return true;

    return !item.allergens.some(allergen => {
      const allergenKey = typeof allergen === 'string' ? allergen : allergen.it;
      return selectedAllergens.value.includes(allergenKey);
    });
  });
};
</script>

<style scoped>
.v-card {
  transition: transform 0.3s ease;
}
.v-card:hover {
  transform: translateY(-4px);
}
</style>
