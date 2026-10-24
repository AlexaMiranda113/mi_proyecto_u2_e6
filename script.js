const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

navbarToggle.addEventListener('click', () => {
  navbarToggle.classList.toggle('active');
  navbarMenu.classList.toggle('active');
});


/* Galería dinámica: visor, navegación por fotos y cierre con Escape */
document.addEventListener('DOMContentLoaded', () => {
  const buttons = Array.from(document.querySelectorAll('.gallery-photo'));
  const lightbox = document.getElementById('photoLightbox');
  if (!buttons.length || !lightbox) return;

  const image = lightbox.querySelector('.lightbox-image');
  const closeButton = lightbox.querySelector('.lightbox-close');
  const prevButton = lightbox.querySelector('.lightbox-prev');
  const nextButton = lightbox.querySelector('.lightbox-next');
  const counter = lightbox.querySelector('.lightbox-counter');
  let current = 0;

  function showPhoto(index) {
    current = (index + buttons.length) % buttons.length;
    const thumb = buttons[current].querySelector('img');
    image.src = buttons[current].dataset.photo;
    image.alt = thumb ? thumb.alt : 'Fotografía de la galería';
    counter.textContent = `${current + 1} / ${buttons.length}`;
  }
  function openLightbox(index) {
    showPhoto(index);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    closeButton.focus();
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
  }

  buttons.forEach((button, index) => button.addEventListener('click', () => openLightbox(index)));
  closeButton.addEventListener('click', closeLightbox);
  prevButton.addEventListener('click', () => showPhoto(current - 1));
  nextButton.addEventListener('click', () => showPhoto(current + 1));
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', event => {
    if (!lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showPhoto(current - 1);
    if (event.key === 'ArrowRight') showPhoto(current + 1);
  });
});
