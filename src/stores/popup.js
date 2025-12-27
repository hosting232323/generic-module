import { defineStore } from 'pinia';


export const usePopupStore = defineStore('popup:genericFeStore', {
  state: () => ({
    message: '',
    type: ''
  }),
  actions: {
    setPopup(message, type) {
      this.message = '';
      this.type = '';
      
      setTimeout(() => {
        this.message = message;
        this.type = type;
      }, 50);
    }
  }
});
