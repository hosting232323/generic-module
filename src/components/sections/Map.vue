<template>
 <v-container>
    <div ref="mapContainer" style="width: 100%; height: 400px;"  />
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
import { onMounted, ref, watch } from 'vue';
import TileLayer from 'ol/layer/Tile';
import { Icon, Style } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

const props = defineProps(['content', 'info']);

const mapContainer = ref(null);
let map;

const initializeMap = () => {
  const iconFeature = new Feature({
    geometry: new Point(fromLonLat(props.content.coordinates))
  });

  const iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: `${import.meta.env.VITE_HOSTNAME_GENERICBACKED}/colorize-image?color=%23${props.info.primaryColor.substring(1)}`
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
      center: fromLonLat(props.content.coordinates),
      zoom: props.content.zoom
    })
  });
};

onMounted(() => {
  if (props.content && props.content.coordinates) {
    initializeMap();
  } else {
    console.error('Content or coordinates are not defined:', props.content);
  }
});

watch(() => props.content, (newContent) => {
  if (newContent && newContent.coordinates) {
    initializeMap();
  }
});
</script>
