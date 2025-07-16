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
    initDataByDemoLayout(hostname, id){
      http.getRequestDemo(hostname, `get-data/${id}`, {}, (data) => {
        this.updateData(data.data);
      });
    },
    initDataByJson(json) {
      this.updateData(json);
    },
    updateData(data) {
      this.data = data;
      this.ready = true;
    }
  }
});
