import { storeToRefs } from 'pinia';
import { useDataStore } from '@/stores/data';
import { createMetaManager } from 'vue-meta';

const metaManager = createMetaManager();

export default metaManager;

export function useMetaTags() {
  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);
  

  return {
    title: `${data.value.meta.name}`,
    meta: [
      { property: 'og:title', content: data.value.meta.name},
      { property: 'og:description', content: data.value.meta.description},
      { property: 'og:url', content: data.value.meta.url},
      { property: 'og:image', content: data.value.meta.url+data.value.gallery[0]},
      { name: 'geo.region', content: data.value.meta.region},
      { name: 'geo.placename', content:  data.value.meta.placename}
    ]
  };
};
