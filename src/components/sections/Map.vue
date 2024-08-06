<template>
  <v-container fluid class="pa-0">
    <div class="map-container">
      <v-card-title class="dove-siamo-title">
      </v-card-title>
      <div ref="mapContainer" class="map"></div>
    </div>
  </v-container>
</template>


<script setup>
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { onMounted, ref } from 'vue';
import TileLayer from 'ol/layer/Tile';
import { Icon, Style } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import TypeWriter from '@/components/AnimatedTitle.vue'

const { content, info } = defineProps(['content', 'info']);
const mapContainer = ref(null);

onMounted(() => {
  const iconFeature = new Feature({
    geometry: new Point(fromLonLat(content.coordinates))
  });

  const iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: `${import.meta.env.VITE_HOSTNAME_GENERICBACKED}/colorize-image?color=%23${info.primaryColor.substring(1)}`
    })
  });

  iconFeature.setStyle(iconStyle);

  const vectorSource = new VectorSource({
    features: [iconFeature]
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource
  });

  const map = new Map({
    target: mapContainer.value,
    layers: [
      new TileLayer({
        source: new OSM()
      }),
      vectorLayer
    ],
    view: new View({
      center: fromLonLat(content.coordinates),
      zoom: content.zoom
    })
  });
});
</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;
}

.map {
  width: 100%;
  height: 100%;
}

.dove-siamo-title {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1.5em;
  z-index: 1;
}
</style>
