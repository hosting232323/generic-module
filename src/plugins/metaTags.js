import { useDataStore } from '@/stores/data';
import { storeToRefs } from 'pinia';
import { createMetaManager } from 'vue-meta';

const metaManager = createMetaManager();

export default metaManager;

export function useMetaTags() {
  const dataStore = useDataStore();
  const { data } = storeToRefs(dataStore);

  const description = `Discover ${data.value.meta.name}. We offer a range of professional services tailored to meet your needs. Located at ${data.value.contacts.Address}.`;
  const branchName = data.value.meta.name.toLowerCase().replace(/\s+/g, '-');
  const url = `https://${data.value.meta.url}/${branchName}`;
  const image = data.value.gallery.length > 0 ? data.value.gallery[0] : '/images/default.jpg';
  const region = data.value.meta.region;
  const placename = data.value.meta.placename;

  return {
    title: `${data.value.meta.name}`,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: `${data.value.meta.name}` },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { name: 'geo.region', content: region },
      { name: 'geo.placename', content: placename }
    ]
  };
};
