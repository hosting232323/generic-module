import http from '@/utils/http';
import { defineStore } from 'pinia';
import productionData from '@/productionData';


export const useDataStore = defineStore('data', {
  state: () => ({
    data: {},
    ready: false
  }),
  actions: {
    async initData(id = undefined) {
      if (id)
        http.getRequest(`get-data/${id}`, {}, this.updateData);
      else
        this.data = productionData;
    },
    updateData(data) {
      this.data = data.data;
      this.ready = true;
    }
  }
});
