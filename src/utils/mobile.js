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

  return { isMobile };
}
