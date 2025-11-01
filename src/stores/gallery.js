import { defineStore } from 'pinia';

export const useGalleryStore = defineStore('gallery', {
  state: () => ({
    images: [],
    currentIndex: 0,
    lightboxOpen: false
  }),
  actions: {
    loadImages(images) {
      this.images = images;
    },
    openLightbox(index) {
      this.currentIndex = index;
      this.lightboxOpen = true;
    },
    closeLightbox() {
      this.lightboxOpen = false;
    },
    nextImage() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prevImage() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    }
  },
  getters: {
    currentImage: (state) => state.images[state.currentIndex] || null
  }
});
