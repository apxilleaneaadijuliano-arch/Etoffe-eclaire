// ==========================================
// 5 JAVASCRIPT INTERACTIVE FEATURES
// ==========================================

// === 1. SCROLL ANIMATIONS — Sections fade in elegantly as you scroll ===
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

// === 2. EXPANDING CARDS — Click fabric cards to open/close details ===
function toggleCard(card) {
  // Close all other cards
  const allCards = document.querySelectorAll('.expandable-card');
  allCards.forEach(c => {
    if (c !== card) c.classList.remove('expanded');
  });
  // Toggle current card
  card.classList.toggle('expanded');
}

// === 3. FAQ COLLAPSE SECTIONS — Click questions to reveal answers ===
function toggleFAQ(button) {
  const faqItem = button.parentElement;
  // Close all other FAQs
  const allFAQs = document.querySelectorAll('.faq-item');
  allFAQs.forEach(item => {
    if (item !== faqItem) item.classList.remove('expanded');
  });
  // Toggle current FAQ
  faqItem.classList.toggle('expanded');
}

// === 4. IMAGE CAROUSEL — Navigate through fabric photos ===
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  
  if (n > slides.length) { slideIndex = 1; }
  if (n < 1) { slideIndex = slides.length; }
  
  // Hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active');
  }
  
  // Remove active class from all dots
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active');
  }
  
  // Show current slide and activate dot
  slides[slideIndex - 1].classList.add('active');
  dots[slideIndex - 1].classList.add('active');
}

// Auto-advance carousel every 5 seconds
setInterval(() => {
  plusSlides(1);
}, 5000);

// === 5. ACTIVE NAVIGATION & SCROLL EFFECTS ===
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
const navbar = document.getElementById('navbar');
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  // Navbar style change on scroll
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Update scroll progress bar
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  if (scrollProgress) {
    scrollProgress.style.width = scrolled + '%';
  }

  // Highlight current section in navigation
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
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

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

console.log('✨ Étoffe Éclairé — Thread of Knowledge, Style for Life ✨');