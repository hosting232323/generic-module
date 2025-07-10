<template>
  <v-container>
    <v-card elevation="20">
      <v-container>
        <h3 :style="{ color: info.primaryColor }" v-html="getText(content.title) || 'Puoi venirci a conoscere qui'" />
        <div ref="mapContainer" style="width: 100%; height: 400px; position: relative;" />
        <div id="popup" ref="popup" class="map-popup" v-show="showPopup">
          <a :href="`https://www.google.com/maps/dir/?api=1&destination=${content.coordinates[1]},${content.coordinates[0]}`" target="_blank">
            🧭 Ottieni indicazioni
          </a>
        </div>
      </v-container>
    </v-card>
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
import Overlay from 'ol/Overlay';
import { useLanguageStore } from '@/stores/language';

const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);

const mapContainer = ref(null);
const popup = ref(null);
const showPopup = ref(false);

let map;

onMounted(() => {
  const iconFeature = new Feature({
    geometry: new Point(fromLonLat(content.coordinates))
  });

  const iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: `${import.meta.env.VITE_HOSTNAME_GENERICBACKEND}/colorize-image?color=%23${info.primaryColor.substring(1)}`
    })
  });

  iconFeature.setStyle(iconStyle);

  const vectorSource = new VectorSource({
    features: [iconFeature]
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource
  });

  const popupOverlay = new Overlay({
    element: popup.value,
    positioning: 'bottom-center',
    stopEvent: false,
    offset: [0, -50]
  });

  map = new Map({
    target: mapContainer.value,
    layers: [
      new TileLayer({ source: new OSM() }),
      vectorLayer
    ],
    view: new View({
      center: fromLonLat(content.coordinates),
      zoom: content.zoom
    }),
    overlays: [popupOverlay]
  });

  map.on('pointermove', function (evt) {
    const feature = map.forEachFeatureAtPixel(evt.pixel, f => f);
    if (feature === iconFeature) {
      showPopup.value = true;
      popupOverlay.setPosition(fromLonLat(content.coordinates));
    } else {
      showPopup.value = false;
      popupOverlay.setPosition(undefined);
    }
  });
});
</script>

<style scoped>
.map-popup {
  position: absolute;
  bottom: 420px; /* puoi regolare in base alla posizione del marker */
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 1px solid #ccc;
  padding: 6px 12px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  z-index: 1000;
  white-space: nowrap;
}
</style>
