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

  import { storeToRefs } from 'pinia';
  import { useDataStore } from '@/stores/data';

  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);

  let mapContainer = ref(null);
  let map;

  onMounted(() => {
    const iconFeature = new Feature({
      geometry: new Point(fromLonLat(data.value.map.coordinates))
    });

    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: `${import.meta.env.VITE_HOSTNAME_GENERICBACKED}/colorize-image?color=%23${data.value.primaryColor.substring(1)}`
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
        center: fromLonLat(data.value.map.coordinates),
        zoom: data.value.map.zoom
      })
    });
  });
</script>