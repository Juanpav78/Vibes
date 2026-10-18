// Muestra con animación los elementos [data-reveal] cuando entran en pantalla.
// Usa `data-reveal-stagger` en un contenedor para escalonar sus hijos.
let observer: IntersectionObserver | undefined;

function initReveal() {
  observer?.disconnect();

  document.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((group) => {
    const step = Number(group.dataset.revealStagger) || 90;
    group.querySelectorAll<HTMLElement>(':scope > [data-reveal]').forEach((el, i) => {
      el.style.setProperty('--delay', `${i * step}ms`);
    });
  });

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );

  document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => observer!.observe(el));
}

document.addEventListener('astro:page-load', initReveal);
