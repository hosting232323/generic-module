import http from '@/utils/http';
import { defineStore } from 'pinia';
import productionData from '@/productionData';


export const useDataStore = defineStore('data', {
  state: () => ({
    data: {},
    ready: false
  }),
  actions: {
    initData(id = undefined) {
      console.log('Esecuzione di initData con i seguenti dati:', id);
      if (id)
        this.data = id;
      else
        this.data = productionData;
    },
    updateData(data) {
      this.data = data.data;
      this.ready = true;
    }
  }
});
