<template>
	<component v-for="section in sections" :is="componentMap[section.type]"
		:id="section.menu ? section.menu.toLowerCase() : null" :content="section.content" :info="info" v-slide-in />
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useHead } from '@vueuse/head';
import { useDataStore } from '@/stores/data';

import Map from '@/components/sections/Map';
import Line from '@/components/sections/Line';
import Gallery from '@/components/sections/Gallery';
import Services from '@/components/sections/Services';
import Contacts from '@/components/sections/Contacts';
import Advantages from '@/components/sections/Advantages';
import DualSection from '@/components/sections/DualSection';
import SiteViewer from '@/components/sections/SiteViewer';
import BrandList from '@/components/sections/Brandlist';
import WhoWeAre from '@/components/sections/WhoWeAre.vue';

const dataStore = useDataStore();
const { data } = storeToRefs(dataStore);

const componentMap = {
	map: Map,
	gallery: Gallery,
	services: Services,
	advantages: Advantages,
	contacts: Contacts,
	dualSection: DualSection,
	line: Line,
	siteViewer: SiteViewer,
	brandList: BrandList,
	whoWeAre: WhoWeAre

};

const sections = data.value.components;
const info = data.value.info;

useHead({
	title: 'Di Carne Show Room',
	meta: [
		{ name: 'Fast Site', content: 'This is the home page' }
	]
});
</script>
