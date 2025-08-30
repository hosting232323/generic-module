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
  let url = "";

  if (typeof slide === "string") url = slide;
  else if (typeof slide === "object") url = isMobile.value ? slide.mobile : slide.desktop;

  if (url) {
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}v=${Date.now()}`;
  }

  return "";
};

export { setupMobileUtils, resolveImg, setIsMobile };
