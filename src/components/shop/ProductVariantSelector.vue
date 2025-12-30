<template>
  <v-container style="padding-top: 0 !important;">
    <div v-if="variants && variants.length > 0">
      <v-divider class="mb-3" />

      <strong style="font-size: 14px;">{{ getText(store.content?.size) || 'Taglie' }}</strong>

      <div class="d-flex flex-wrap mt-3">
        <v-chip v-for="variant in variants" :key="variant.name" class="ma-1" pill :disabled="!variant.quantity"
          :color="selectedVariant === variant ? info.primaryColor : 'grey-lighten-2'"
          :text-color="selectedVariant === variant ? 'white' : 'black'" @click="selectVariant(variant)">
          {{ variant.name }}
        </v-chip>
      </div>

      <v-divider class="my-4" />

      <v-row align="center">
        <v-col cols="12" md="6">
          <v-btn block variant="flat" :color="info.primaryColor" :disabled="!selectedVariant"
            @click="addToCart(Number(route.params.id), selectedVariant)">
            <v-icon start icon="mdi-cart-outline" />
            {{ getText(store.content?.addToCart) || 'Aggiungi al carrello' }}
          </v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <v-btn block variant="outlined" :color="info.primaryColor" :disabled="!selectedVariant"
            @click="fastCheckout">
            <v-icon start icon="mdi-credit-card-outline" />
            {{ getText(store.content?.fastCheckout) || 'Compra ora' }}
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { addToCart } from '@/utils/shop';
import { useDataStore } from '@/stores/data';
import { useShopStore } from '@/stores/shop';
import { useLanguageStore } from '@/stores/language';

const route = useRoute();
const dataStore = useDataStore();
const shopStore = useShopStore();
const { data } = storeToRefs(dataStore);
const { getText } = useLanguageStore();

const info = data.value.info;
const store = data.value.store;

const props = defineProps({
  variants: { type: Array, required: true }
});

const selectedVariant = ref(null);
const quantity = ref(1);

const selectVariant = (variant) => {
  selectedVariant.value = variant;
  quantity.value = 1;
};

const fastCheckout = async () => {
  if (!store.addressMode)
    await placeOrder();
  else
    isCheckout.value = true;
};

const placeOrder = async () => {
  shopStore.placeOrder(store.projectName, [{
    product: Number(route.params.id),
    quantity: 1,
    variant: selectedVariant.value
  }]);
}
</script>
