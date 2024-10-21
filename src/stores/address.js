import { defineStore } from 'pinia';

export const useAddressStore = defineStore('address', {
  state: () => ({
    firstname: localStorage.getItem('firstname') || '',
    lastname: localStorage.getItem('lastname') || '',
    region: localStorage.getItem('region') || '',
    province: localStorage.getItem('province') || '',
    city: localStorage.getItem('city') || '',
    address: localStorage.getItem('address') || ''
  }),
  actions: {
    updateField(field, value) {
      this[field] = value;
      this.saveToLocalStorage(field, value);
    },
    saveToLocalStorage(field, value) {
      localStorage.setItem(field, value);
    },
    clearAll() {
      this.resetState();
      this.clearLocalStorage();
    },
    resetState() {
      this.firstname = '';
      this.lastname = '';
      this.region = '';
      this.province = '';
      this.city = '';
      this.address = '';
    },
    clearLocalStorage() {
      const fields = ['firstname', 'lastname', 'region', 'province', 'city', 'address'];
      fields.forEach(field => localStorage.removeItem(field));
    },
    getFullAddress() {
      var fullAddress = `${this.firstname} ${this.lastname}, ${this.address}, ${this.city}, ${this.province}, ${this.region}`;
      if (this.firstname && this.lastname && this.address && this.city && this.province && this.region) {
        this.clearAll();
        return fullAddress;
      } else return false;
    }
  }
});
