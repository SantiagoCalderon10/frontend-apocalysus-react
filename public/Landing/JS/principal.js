const slides = document.querySelectorAll('.hero-slide');
let index = 0;

function changeSlide() {
  slides[index].classList.remove('active');
  index = (index + 1) % slides.length;
  slides[index].classList.add('active');
}

// Mostrar la primera slide
slides[0].classList.add('active');

// Cambiar cada 5 segundos
setInterval(changeSlide,5000);
