<template>
    <v-container>
        <v-row align="center">
            <v-col v-if="isLeftAligned" cols="12" md="6">
                <v-img :src="content.image" cover>
                </v-img>
            </v-col>
            <v-col cols="12" md="6">
                <v-sheet :color = "info.secondaryColor">
                    <v-typography  v-if="content.title" class="text-h3 font-weight-black" :style="{ color: info.primaryColor + ' !important' }" v-html="content.title" /><br>
                    <v-typography v-if="content.subtitle" class="text-subtitle-1 font-weight-black" v-html="content.subtitle + '<br>'" />
                    <v-typography v-if="content.description" v-html="content.description" />
                    <br>
                    <a :href="content.url" v-if="content.url && content.button">
                        <v-btn
                            v-html="content.button" 
                            class="text-none"
                            variant="flat"
                            :color="info.primaryColor"
                            :style="{ marginTop: '7px' }">
                        </v-btn>
                    </a>
                </v-sheet>
            </v-col>
            <v-col v-if="!isLeftAligned" cols="12" md="6">
                <v-img :src="content.image" cover></v-img>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { computed } from 'vue';

const { content, info } = defineProps(['content', 'info']);

const defaultOrientation = 'right';
const isLeftAligned = computed(() => (content.orientation || defaultOrientation) === 'left');
</script>
