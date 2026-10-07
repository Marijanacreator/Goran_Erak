// Reuse the original native navigation and dialog interaction patterns.
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navbar');
function closeMenu(returnFocus = false) {
  const wasOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', 'false');
  if (returnFocus && wasOpen) menuToggle.focus();
}
menuToggle.addEventListener('click', () => menuToggle.setAttribute('aria-expanded', String(menuToggle.getAttribute('aria-expanded') !== 'true')));
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(true); });
document.addEventListener('click', event => { if (!event.target.closest('.masthead')) closeMenu(); });
matchMedia('(min-width: 801px)').addEventListener('change', () => closeMenu());

const services = [
  ['Međunarodni transport', 'Organizacija drumskog prevoza robe između tržišta. Polazište, odredište, vrsta tereta i termin definišu se prema konkretnom zahtevu.'],
  ['Distribucija', 'Planiranje toka robe od distributivnog centra do krajnjeg odredišta. Obuhvat isporuka i dinamika prevoza usklađuju se sa potrebama vašeg poslovanja.'],
  ['Skladištenje', 'Prijem, smeštaj i priprema robe za dalju isporuku. Dostupne lokacije, kapaciteti i uslovi skladištenja biće navedeni nakon potvrde kompanije.'],
  ['Špedicija', 'Koordinacija transporta i prateće dokumentacije. Obim špediterskih usluga određuje se prema ruti, vrsti robe i zahtevima pošiljke.']
];
const serviceDialog = document.querySelector('#service-details');
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => {
  const [title, copy] = services[Number(button.dataset.service)];
  serviceDialog.querySelector('h2').textContent = title;
  serviceDialog.querySelector('.detail-copy').textContent = copy;
  serviceDialog.showModal();
}));
document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', () => {
  if (serviceDialog.open) serviceDialog.close();
  document.querySelector('#contact-details').showModal();
}));
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
});
const grid = document.querySelector('.services-grid');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
function browse(direction) {
  const tiles = [...grid.children];
  const current = tiles.reduce((best, tile, index) => Math.abs(tile.offsetLeft - grid.offsetLeft - grid.scrollLeft) < Math.abs(tiles[best].offsetLeft - grid.offsetLeft - grid.scrollLeft) ? index : best, 0);
  const target = tiles[Math.max(0, Math.min(tiles.length - 1, current + direction))];
  grid.scrollTo({ left: target.offsetLeft - grid.offsetLeft, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
}
document.querySelector('.browse-prev').addEventListener('click', () => browse(-1));
document.querySelector('.browse-next').addEventListener('click', () => browse(1));
grid.addEventListener('keydown', event => {
  if (event.target !== grid || !matchMedia('(max-width: 800px)').matches) return;
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); browse(event.key === 'ArrowRight' ? 1 : -1); }
});
