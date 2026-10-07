(() => {
  const section = document.querySelector('.proof');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  if (!section || motion.matches || !('IntersectionObserver' in window)) return;
  const show = () => {
    section.classList.remove('proof-pending');
    section.classList.add('proof-visible');
    observer.disconnect();
  };
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) show();
  }, { threshold: .12 });
  section.classList.add('proof-pending');
  observer.observe(section);
  motion.addEventListener('change', show, { once: true });
})();
