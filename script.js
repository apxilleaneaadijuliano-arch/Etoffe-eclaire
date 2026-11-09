// ==================================================
// ÉTOFFE ÉCLAIRÉ — FULL ENHANCED JAVASCRIPT
// More Effects • All Working • GitHub Proof
// ==================================================

// ==========================================
// 1. SCROLL REVEAL ANIMATION
// Fades sections in as you scroll
// ==========================================
const revealSections = document.querySelectorAll('.reveal');

const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

revealSections.forEach(section => {
  revealObserver.observe(section);
});

// ==========================================
// 2. NAVBAR SCROLL EFFECT
// Changes style when you scroll down
// ==========================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ==========================================
// 3. EXPANDING FABRIC CARDS
// Click to open — auto-closes others
// ==========================================
function toggleCard(cardElement) {
  const allCards = document.querySelectorAll('.fabric-card');
  
  allCards.forEach(card => {
    if (card !== cardElement) {
      card.classList.remove('open');
    }
  });
  
  cardElement.classList.toggle('open');
}

// ==========================================
// 4. FAQ COLLAPSE SECTIONS
// Click question to show/hide answer
// ==========================================
function toggleFAQ(button) {
  const faqItem = button.parentElement;
  const allFAQs = document.querySelectorAll('.faq-item');
  
  allFAQs.forEach(item => {
    if (item !== faqItem) {
      item.classList.remove('open');
    }
  });
  
  faqItem.classList.toggle('open');
}

// ==========================================
// 5. ACTIVE NAVIGATION HIGHLIGHT
// Shows which section you're viewing
// ==========================================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let currentId = '';
  const scrollPos = window.scrollY + 150;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollPos >= sectionTop) {
      currentId = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    const linkTarget = link.getAttribute('href').replace('#', '');
    if (linkTarget === currentId) {
      link.classList.add('active');
    }
  });
});

// ==========================================
// 6. PROGRESS STEPS ANIMATION
// Triggers when button clicked
// ==========================================
function startJourney() {
  const steps = document.querySelectorAll('.step');
  
  steps.forEach((step, index) => {
    setTimeout(() => {
      step.classList.add('active');
    }, index * 400);
  });
}

// ==========================================
// 7. STAGGER ANIMATION FOR FEATURE CARDS
// Cards appear one by one
// ==========================================
const featureCards = document.querySelectorAll('.feature-card');

const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const delay = card.classList.contains('stagger-1') ? 0 :
                    card.classList.contains('stagger-2') ? 150 :
                    card.classList.contains('stagger-3') ? 300 : 450;
      
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, delay);
      
      staggerObserver.unobserve(card);
    }
  });
}, { threshold: 0.2 });

featureCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s ease';
  staggerObserver.observe(card);
});

// ==========================================
// CONSOLE CONFIRMATION
// ==========================================
console.log('✨ ======================================');
console.log('✨ Étoffe Éclairé — FULLY LOADED!');
console.log('✨ 7 JavaScript Features Active');
console.log('✨ Thread of Knowledge, Style for Life');
console.log('✨ ======================================');
