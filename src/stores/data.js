import http from '@/utils/http';
import { defineStore } from 'pinia';
import productionData from '@/productionData';


export const useDataStore = defineStore('data', {
  state: () => ({
    data: {},
    ready: false,
    demoId: undefined
  }),
  actions: {
    initData() {
      this.updateData(productionData);
    },
    initDataByDemoLayout(hostname, id){
      http.getRequest(`get-data/${id}`, {}, (data) => {
        this.demoId = id;
        this.updateData(data.data);
      }, 'GET', undefined, hostname);
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
