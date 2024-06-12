<template>
	<div style="position: relative;">
		<div :style="{
			position: 'absolute',
			top: '20px',
			left: '20px',
			color: 'white',
			zIndex: 1,
		}">
			<h1 :style="{ fontSize: isMobile ? '20px' : '50px' }">DICARNESHOWROOM</h1>
		</div>
		<v-carousel delimiter-icon="mdi-square" hide-delimiters cycle interval="5000" style="height: 100vh">
			<v-carousel-item v-for="slide in content">
				<v-img :src="getImage(slide)" cover style="height: 100vh" />
			</v-carousel-item>
		</v-carousel>
	</div>
</template>

<script setup>
import mobile from '@/utils/mobile';

const isMobile = mobile.setupMobileUtils();
const { content } = defineProps(['content']);

const getImage = (slide) => {
	return `${isMobile.value ? '/galleryCrop/' : '/gallery/'}${slide}`;
};
</script>
