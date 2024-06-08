<template>
  <v-container>
    <v-card elevation="20" title="Puoi venirci a conoscere qui">
      <v-container>
        <div ref="mapContainer" style="width: 100%; height: 400px;" />
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

  const { content, info } = defineProps(['content', 'info']);

  let mapContainer = ref(null);
  let map;

  onMounted(() => {
    const vectorSource = new VectorSource({
      features: [
        getMarker(content.coordinates1),
        getMarker(content.coordinates2)
      ]
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
        center: fromLonLat(content.coordinates1),
        zoom: content.zoom
      })
    });
  });

  const getMarker = (coordinates) => {
    const iconFeature = new Feature({
      geometry: new Point(fromLonLat(coordinates))
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
    return iconFeature;
  };
</script>
