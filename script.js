// ==========================================
// ÉTOFFE ÉCLAIRÉ — INTERACTIVE SCRIPTS
// ==========================================

// === 1. CAROUSEL ENGINE ===
const track = document.getElementById('carouselTrack');
const slides = Array.from(track.children);
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');

let currentIndex = 0;

// Initialize Dot Navigation dynamically based on slides count
slides.forEach((_, index) => {
  const dot = document.createElement('div');
  dot.classList.add('carousel-dot');
  if (index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => moveToSlide(index));
  dotsContainer.appendChild(dot);
});

const dots = Array.from(dotsContainer.children);

function updateDots(index) {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

function moveToSlide(index) {
  if (index < 0) {
    currentIndex = slides.length - 1;
  } else if (index >= slides.length) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateDots(currentIndex);
}

prevBtn.addEventListener('click', () => moveToSlide(currentIndex - 1));
nextBtn.addEventListener('click', () => moveToSlide(currentIndex + 1));

// Auto-advance carousel every 5 seconds
let autoSlide = setInterval(() => moveToSlide(currentIndex + 1), 5000);

// Pause auto-sliding on hover
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer.addEventListener('mouseenter', () => clearInterval(autoSlide));
carouselContainer.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => moveToSlide(currentIndex + 1), 5000);
});


// === 2. SCROLL ANIMATIONS — Sections fade in on scroll ===
const revealSections = document.querySelectorAll('.reveal-section');

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

revealSections.forEach(section => {
  scrollObserver.observe(section);
});


// === 3. EXPANDING FABRIC CARDS ===
function toggleCard(card) {
  const allCards = document.querySelectorAll('.expandable-card');
  allCards.forEach(c => {
    if (c !== card) c.classList.remove('expanded');
  });
  card.classList.toggle('expanded');
}


// === 4. FAQ COLLAPSE SECTIONS ===
function toggleFAQ(button) {
  const faqItem = button.parentElement;
  const allFAQs = document.querySelectorAll('.faq-item');
  allFAQs.forEach(item => {
    if (item !== faqItem) item.classList.remove('expanded');
  });
  faqItem.classList.toggle('expanded');
}


// === 5. ACTIVE NAVIGATION & NAVBAR SCROLL ===
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});

console.log('✨ Étoffe Éclairé — Luxury Carousel Initialized ✨');
