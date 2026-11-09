// ==========================================
// ÉTOFFE ÉCLAIRÉ — FULL JAVASCRIPT
// ==========================================

// 1. SCROLL REVEAL ANIMATION
const revealElements = document.querySelectorAll('.reveal');

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -30px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// 2. EXPANDING FABRIC CARDS
function toggleCard(card) {
  // Close all other cards
  const allCards = document.querySelectorAll('.fabric-card');
  allCards.forEach(c => {
    if (c !== card) c.classList.remove('open');
  });
  // Toggle this card
  card.classList.toggle('open');
}

// 3. FAQ COLLAPSE SECTIONS
function toggleFAQ(button) {
  const faqItem = button.parentElement;
  // Close others
  const allFAQs = document.querySelectorAll('.faq-item');
  allFAQs.forEach(item => {
    if (item !== faqItem) item.classList.remove('open');
  });
  // Toggle this FAQ
  faqItem.classList.toggle('open');
}

// 4. IMAGE CAROUSEL
let slidePosition = 0;
const totalSlidesCount = 6;

function changeSlide(direction) {
  slidePosition += direction;
  if (slidePosition >= totalSlidesCount) slidePosition = 0;
  if (slidePosition < 0) slidePosition = totalSlidesCount - 1;
  updateAllSlides();
}

function goToSlide(index) {
  slidePosition = index;
  updateAllSlides();
}

function updateAllSlides() {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    dots[i].classList.remove('active');
  });
  
  slides[slidePosition].classList.add('active');
  dots[slidePosition].classList.add('active');
}

// Auto-play carousel
setInterval(() => changeSlide(1), 5000);

// 5. ACTIVE NAVIGATION HIGHLIGHT
const pageSections = document.querySelectorAll('section');
const navLinksList = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let currentId = '';
  
  pageSections.forEach(section => {
    const topPos = section.offsetTop - 120;
    if (window.scrollY >= topPos) {
      currentId = section.getAttribute('id');
    }
  });
  
  navLinksList.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentId}`) {
      link.classList.add('active');
    }
  });
});

console.log('✨ Étoffe Éclairé — All systems ready! ✨');
