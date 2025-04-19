<template>
    <v-container>
      <v-row align="center">
        <v-col v-if="isLeftAligned" cols="12" md="6">
          <v-img :src="resolvedImg" cover />
        </v-col>
        <v-col cols="12" md="6">
            <v-sheet :color="info.secondaryColor">
                <p v-if="content.title" class="text-h3 font-weight-black" :style="{ color: info.primaryColor + ' !important' }" v-html="content.title" />
                <br />
                <p v-if="content.subtitle" class="text-subtitle-1 font-weight-black" v-html="content.subtitle + '<br>'" />
                <p v-if="content.description" v-html="content.description" />
                <br />
                <a :href="content.url" v-if="content.url && content.button">
                <v-btn v-html="content.button" class="text-none" variant="flat" :color="info.primaryColor" :style="{ marginTop: '7px' }" />
                </a>
            </v-sheet>
            </v-col>
            <v-col v-if="!isLeftAligned" cols="12" md="6">
                <v-img :src="resolvedImg" cover />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { computed } from 'vue';
import { useMobileUtils } from '@/utils/mobile';

const { isMobile } = useMobileUtils();
const { content, info } = defineProps(['content', 'info']);

const resolvedImg = computed(() => {
const img = content.image;
    if (typeof img === 'string') return img;
    if (typeof img === 'object') return isMobile.value ? img.mobile : img.desktop;
    return '';
});

const defaultDesktopOrientation = 'right';
const defaultMobileOrientation = 'bottom';

const isLeftDesktopAligned = computed(() => (content.orientationDesktop || defaultDesktopOrientation) === 'left');
const isTopMobileAligned = computed(() => (content.orientationMobile || defaultMobileOrientation) === 'top');

const isLeftAligned = computed(() => {
    if (isMobile.value) return isTopMobileAligned.value;
    else return isLeftDesktopAligned.value;
});
</script>
