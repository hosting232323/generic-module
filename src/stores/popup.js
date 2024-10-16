import { defineStore } from 'pinia';


export const usePopupStore = defineStore('popup', {
  state: () => ({
    message: '',
    type: ''
  }),
  actions: {
    setPopup(message, type) {
      this.message = message;
      this.type = type;     
    }
  }
});
