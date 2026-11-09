// ==========================================
// ÉTOFFE ÉCLAIRÉ — JAVASCRIPT
// 5 Interactive Features
// ==========================================

// === 1. SCROLL ANIMATIONS ===
const revealSections = document.querySelectorAll('.reveal-section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

revealSections.forEach(section => {
  observer.observe(section);
});

// === 2. EXPANDING CARDS ===
function toggleCard(card) {
  const allCards = document.querySelectorAll('.expandable-card');
  allCards.forEach(c => {
    if (c !== card) c.classList.remove('expanded');
  });
  card.classList.toggle('expanded');
}

// === 3. FAQ COLLAPSE ===
function toggleFAQ(button) {
  const faqItem = button.parentElement;
  const allFAQs = document.querySelectorAll('.faq-item');
  allFAQs.forEach(item => {
    if (item !== faqItem) item.classList.remove('expanded');
  });
  faqItem.classList.toggle('expanded');
}

// === 4. IMAGE CAROUSEL ===
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  
  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;
  
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  slides[slideIndex - 1].classList.add('active');
  dots[slideIndex - 1].classList.add('active');
}

// Auto-slide every 5 seconds
setInterval(() => plusSlides(1), 5000);

// === 5. ACTIVE NAVIGATION HIGHLIGHT ===
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

console.log('✨ Étoffe Éclairé — Ready!');