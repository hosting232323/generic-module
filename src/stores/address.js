import { defineStore } from 'pinia';

export const useAddressStore = defineStore('address', {
  state: () => ({
    firstname: '',
    lastname: '',
    region: '',
    province: '',
    city: '',
    address: ''
  }),
  actions: {
    updateField(field, value) {
      this[field] = value;
    },
    clearAll() {
      this.firstname = '';
      this.lastname = '';
      this.region = '';
      this.province = '';
      this.city = '';
      this.address = '';
    },
    getFullAddress() {
      var fullAddress = `${this.firstname} ${this.lastname}, ${this.address}, ${this.city}, ${this.province}, ${this.region}`;
      if (this.firstname && this.lastname && this.address && this.city && this.province && this.region) {
        this.clearAll();
        return fullAddress;
      } else return false;
    }
  },
  persist: {
    enabled: true,
    storage: localStorage
  }
});
