import { ref, onMounted, onBeforeUnmount } from 'vue';

const isMobile = ref(false);

const setIsMobile = (value) => {
  isMobile.value = value;
};

const checkMobile = () => {
  isMobile.value = window.innerWidth < 600;
};

const setupMobileUtils = () => {
  onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('resize', checkMobile);
  });
  return isMobile;
};

const resolveImg = (slide) => {
  if (typeof slide === 'string') return slide;
  if (typeof slide === 'object') return isMobile.value ? slide.mobile : slide.desktop;
  return '';
};

export { setupMobileUtils, resolveImg, setIsMobile };
