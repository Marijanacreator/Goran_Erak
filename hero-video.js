// Directional aperture and caption choreography from the supplied example.
(() => {
  const wrapper = document.querySelector('.hero [data-clip-reveal]');
  if (!wrapper || !window.gsap) return;
  const image = wrapper.querySelector('video');
  const rule = document.querySelector('.hero [data-reveal-rule]');
  const copies = document.querySelectorAll('.hero [data-reveal-copy]');
  const message = document.querySelectorAll('.hero [data-hero-message]');
  const ctas = document.querySelector('[data-hero-ctas]');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let timeline, observer;
  const closed = 'polygon(0% 0%, 0% 42%, 6% 50%, 0% 58%, 0% 100%, 0% 0%)';
  const open = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%, 0% 0%)';
  function staticView() {
    observer?.disconnect(); timeline?.kill();
    gsap.set([wrapper, image, rule, ...copies].filter(Boolean), { clearProps: 'clipPath,transform,opacity,willChange' });
    gsap.set(message, { clearProps: 'transform,opacity,filter' });
    gsap.set(ctas, { clearProps: 'transform,opacity' });
  }
  function play() {
    if (motion.matches) return staticView();
    timeline?.kill();
    gsap.set(message, { opacity: 0, y: 12, filter: 'blur(5px)' });
    gsap.set(ctas, { opacity: 0, y: 8 });
    timeline = gsap.timeline({ onComplete: staticView });
    timeline.fromTo(wrapper, { clipPath: closed }, { clipPath: open, duration: 1.45, ease: 'expo.inOut' }, 0)
      .fromTo(image, { scale: 1.14 }, { scale: 1, duration: 1.63, ease: 'power3.out' }, 0);
    // Add text at 70% of the approved 1.45s image reveal. Image tweens stay unchanged.
    timeline.to(message[0], { opacity: 1, y: 0, filter: 'blur(0px)', duration: .8, ease: t => 1 - Math.pow(1 - t, 4) }, 1.015)
      .to(message[1], { opacity: 1, y: 0, filter: 'blur(0px)', duration: .72, ease: t => 1 - Math.pow(1 - t, 4) }, 1.165);
    timeline.to(ctas, { opacity: 1, y: 0, duration: .65, ease: t => 1 - Math.pow(1 - t, 4) }, 1.295);
  }
  document.querySelector('[data-clip-replay]')?.addEventListener('click', play);
  motion.addEventListener('change', staticView);
  if (!motion.matches) {
    gsap.set(wrapper, { clipPath: closed });
    gsap.set(image, { scale: 1.14 });
    if (rule) gsap.set(rule, { scaleX: 0, transformOrigin: 'left center' });
    gsap.set(copies, { yPercent: 115, opacity: 0 });
    gsap.set(message, { opacity: 0, y: 12, filter: 'blur(5px)' });
    gsap.set(ctas, { opacity: 0, y: 8 });
    Promise.resolve().then(() => {
      if (motion.matches) return staticView();
      if (!('IntersectionObserver' in window)) return play();
      observer = new IntersectionObserver(entries => {
        if (entries.some(e => e.isIntersecting)) { observer.disconnect(); play(); }
      }, { threshold: .12 });
      observer.observe(wrapper.closest('figure'));
    }).catch(staticView);
  }
  window.addEventListener('pagehide', staticView, { once: true });
})();


(() => {
 const video=document.querySelector('.hero-video');
 const button=document.querySelector('.video-toggle');
 if(!video || !button) return;
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 function update(){button.dataset.state=video.paused?'play':'pause';button.setAttribute('aria-label',video.paused?'Pokreni video':'Pauziraj video')}
 button.addEventListener('click',()=>{if(video.paused) video.play().catch(update);else video.pause()});
 video.addEventListener('play',update);video.addEventListener('pause',update);

 document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause()});
 motion.addEventListener('change',()=>{if(motion.matches)video.pause()});
 if(!motion.matches)video.play().catch(update);
 update();
})();


