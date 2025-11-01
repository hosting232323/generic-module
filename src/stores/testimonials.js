import { defineStore } from 'pinia';

export const useTestimonialsStore = defineStore('testimonials', {
  state: () => ({
    testimonials: [],
    currentIndex: 0
  }),
  actions: {
    loadTestimonials(testimonials) {
      this.testimonials = testimonials;
    },
    setIndex(index) {
      this.currentIndex = index;
    },
    nextTestimonial() {
      this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    },
    prevTestimonial() {
      this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
    }
  },
  getters: {
    current: (state) => state.testimonials[state.currentIndex] || null
  }
});
