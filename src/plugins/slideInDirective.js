export const vSlideIn = {
  mounted: (el) => {
    el.style.opacity = "0";
    el.style.transform = "translateX(-50px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateX(0)";
          }, 100);
          observer.unobserve(el);
        }
      });
    }, {
      threshold: 0.1
    });

    observer.observe(el);
  }
};
