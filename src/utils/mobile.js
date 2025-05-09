import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useMobileUtils() {
  const isMobile = ref(false);

  const checkMobile = () => {
    isMobile.value = window.innerWidth < 600;
  };

  onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', checkMobile);
  });

  const resolveImg = (slide) => {
    if (typeof slide === 'string') return slide;
    if (typeof slide === 'object') return isMobile.value ? slide.mobile : slide.desktop;
    return '';
  };

  return { isMobile, resolveImg };
}
