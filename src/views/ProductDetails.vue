<template>
    <v-container>
        <v-row v-if="product">
            <v-col cols="12" md="6">
                <v-card>
                    <v-carousel v-if="product.images && product.images.length > 0" hide-delimiter-background>
                        <v-carousel-item v-for="(image, index) in product.images" :key="index">
                            <v-img :src="image" height="400" cover></v-img>
                        </v-carousel-item>
                    </v-carousel>
                    <v-img v-else :src="getImageForProduct(product)" height="400" cover />
                </v-card>
            </v-col>

            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title class="text-h5">{{ product.name }}</v-card-title>
                    <v-card-subtitle>Prezzo: <strong>{{ formatPrice(product.price) }}</strong></v-card-subtitle>
                    <v-divider></v-divider>

                    <v-card-text>
                        <div class="mb-3">
                            <strong>Descrizione:</strong>
                            <p>{{ product.description }}</p>
                        </div>

                        <div class="mb-3">
                            <strong>Categoria:</strong>
                            <p>{{ product.product_type || 'Non specificata' }}</p>
                        </div>

                        <div class="mb-3">
                            <strong>Disponibilità:</strong>
                            <p>{{ product.inventory?.quantity >= 0 ? product.inventory.quantity : 'Non disponibile' }}
                            </p>
                        </div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn color="purple" large class="ma-2">Aggiungi al carrello</v-btn>
                        <v-btn color="grey" large text class="ma-2" @click="goBack">Torna indietro</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

        <v-row v-else>
            <v-col cols="12">
                <v-alert type="info">Caricamento del prodotto...</v-alert>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import http from '@/utils/http';

const businessActivityBrooking = import.meta.env.VITE_BUSINESS_ACTIVITY_BROOKING;

const formatPrice = (price) => {
    return parseFloat(price).toFixed(2) + ' €';
};

const getImageForProduct = (product) => {
    return product?.image ? product.image : 'https://4kwallpapers.com/images/walls/thumbs_3t/11056.jpg';
};

// Stato del prodotto
const product = ref(null);
const route = useRoute();
const router = useRouter();


const fetchProductDetails = () => {
    const productId = route.params.id;
    http.getRequestBrooking(
        `api/shop/product/${businessActivityBrooking}/${productId}/`,
        {},
        function (data) {
            if (data) {
                product.value = data;
            } else {
                console.error("Nessun prodotto trovato con l'ID specificato.");
            }
        },
        true
    );
};


const goBack = () => {
    router.back();
};

onMounted(() => {
    fetchProductDetails();
});
</script>

<style scoped>
.mb-3 {
    margin-bottom: 16px;
}
</style>