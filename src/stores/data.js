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
      if (id)
        http.getRequest(`get-data/${id}`, {}, (data) => {
          this.updateData(data.data);
        });
      else 
        this.updateData(productionData);
    },
    initDataByJson(json) {
      this.updateData(json)
      console.log(this.data);
    },
    updateData(data) {
      this.data = data;
      this.ready = true;
    }
  }
});
