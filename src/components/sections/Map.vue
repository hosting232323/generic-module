<template>
  <v-container>
    <v-container>
      <div ref="mapContainer" style="width: 100%; height: 400px;" />
      <div ref="popupContainer" class="ol-popup">
        <v-icon icon="mdi-window-close" class="popup-close-btn" @click="closePopup"/>
        <div ref="popupContent" class="d-flex flex-column align-start" >
          <v-img src="/logo.png" width="80" height="auto" object-fit style="margin-bottom: 10px;"/>
          <p style="font-size: 14px; font-weight: bold;" class="mb-1">{{ info.name }}</p>
          <p style="font-size: 13px;" class="mb-1" v-html="content.address"></p>
          <a :href="link" target="_blank" rel="noopener noreferrer" class="nav" :style="{ color: info.primaryColor }">
            <v-icon icon="mdi-directions" :color="info.primaryColor" style="font-size: 16px;" class="mr-1"/>
            Navigazione
          </a>
        </div>
        <div class="ol-popup-arrow"></div>
      </div>
    </v-container>
  </v-container>
</template>

<script setup>
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat, toLonLat } from 'ol/proj';
import { onMounted, ref, nextTick } from 'vue';
import TileLayer from 'ol/layer/Tile';
import { Icon, Style } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Overlay from 'ol/Overlay';
import { useLanguageStore } from '@/stores/language';

const { getText } = useLanguageStore();
const { content, info } = defineProps(['content', 'info']);

let mapContainer = ref(null);
let popupContainer = ref(null);
let popupContent = ref(null);
let map;
let overlay;

const link = `https://www.google.com/maps/search/?api=1&query=${content.coordinates[1]},${content.coordinates[0]}`

onMounted(async () => {
  await nextTick();

  const iconFeature = new Feature({
    geometry: new Point(fromLonLat(content.coordinates))
  });

  const iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: 'image.png'
    })
  });

  iconFeature.setStyle(iconStyle);

  const vectorSource = new VectorSource({
    features: [iconFeature]
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource
  });

  map = new Map({
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

  overlay = new Overlay({
    element: popupContainer.value,
    autoPan: true,
    autoPanAnimation: {
      duration: 250
    },
    positioning: 'bottom-center',
    offset: [0, -275]
  });

  map.addOverlay(overlay);

  map.on('singleclick', function (evt) {
    const feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
      return feature;
    });

    if (feature === iconFeature) {
      const coordinate = feature.getGeometry().getCoordinates();
      overlay.setPosition(coordinate);
    } else {
      overlay.setPosition(undefined);
    }
  });
});

function closePopup() {
  overlay.setPosition(undefined);
}
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  font-size: 13px;
}
.ol-popup {
  position: absolute;
  background: white;
  border-radius: 8px;
  padding: 8px 12px;
  min-width: 220px;
  box-shadow: 0 3px 14px rgba(0, 0, 0, .2);
  pointer-events: auto;
  transform: translateX(-50%);
  white-space: nowrap;
  font-size: 14px;
  user-select: none;
  z-index: 1000;
}

.ol-popup-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid white;
  left: 50%;
  bottom: -10px;
  transform: translateX(-50%);
  filter: drop-shadow(0 1px 1px rgba(0,0,0,0.1));
  z-index: 1001;
}

.popup-close-btn {
  position: absolute;
  top: 8px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  line-height: 1;
  color: #999;
  transition: color 0.2s;
  z-index: 1002;
}

.popup-close-btn:hover {
  color: #333;
}
</style>
