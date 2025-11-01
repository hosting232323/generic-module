import { defineStore } from 'pinia';

export const useNewsletterStore = defineStore('newsletter', {
  state: () => ({
    email: '',
    subscribed: false,
    subscribers: []
  }),
  actions: {
    setEmail(email) {
      this.email = email;
    },
    subscribe(email) {
      if (!this.subscribers.includes(email)) {
        this.subscribers.push(email);
        this.subscribed = true;
        this.email = '';
      }
    },
    reset() {
      this.email = '';
      this.subscribed = false;
    }
  },
  persist: true
});
