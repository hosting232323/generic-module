<template>
    <v-container>
        <v-row align="center">
            <v-col v-if="isLeftAligned" cols="12" md="6">
                <v-img :src="data.dualSection.image" cover>
                </v-img>
            </v-col>
            <v-col cols="12" md="6">
                <v-sheet :color = "data.secondaryColor">
                    <v-typography  v-if="data.dualSection.title" class="text-h3 font-weight-black" :style="{ color: data.primaryColor + ' !important' }" v-html="data.dualSection.title" /><br>
                    <v-typography v-if="data.dualSection.subtitle" class="text-subtitle-1 font-weight-black" v-html="data.dualSection.subtitle + '<br>'" />
                    <v-typography v-if="data.dualSection.description" v-html="data.dualSection.description" />
                    <br>
                    <a :href="data.dualSection.url" v-if="data.dualSection.url && data.dualSection.button">
                        <v-btn
                            v-html="data.dualSection.button" 
                            class="text-none"
                            variant="flat"
                            :color="data.primaryColor"
                            :style="{ marginTop: '7px' }">
                        </v-btn>
                    </a>
                </v-sheet>
            </v-col>
            <v-col v-if="!isLeftAligned" cols="12" md="6">
                <v-img :src="data.dualSection.image" cover></v-img>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);

const defaultOrientation = 'right';
const isLeftAligned = computed(() => (data.value.dualSection.orientation || defaultOrientation) === 'left');
</script>
