import http from '@/utils/http';
import { defineStore } from 'pinia';
import productionData from '@/productionData';
import { useRouter } from 'vue-router';

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
    initDataByDemoOrTemplateLayout(hostname, type, id){
      const router = useRouter();
      http.getRequest(`get-data/${type}/${id}`, {}, (data) => {
        if(data.status == 'ok') {
          this.demoId = id;
          this.updateData(data.data);
        } else
          router.push({ name: 'DemoNotFound' }); 
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
