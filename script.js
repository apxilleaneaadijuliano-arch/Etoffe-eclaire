// ==================================================
// ÉTOFFE ÉCLAIRÉ — FULL JAVASCRIPT
// 5 Interactive Features | GitHub Ready
// ==================================================

// ==========================================
// 1. SCROLL REVEAL ANIMATION
// Fades sections in as you scroll down
// ==========================================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
  revealObserver.observe(element);
});

// ==========================================
// 2. EXPANDING FABRIC CARDS
// Click to open, auto-closes others
// ==========================================
function toggleCard(cardElement) {
  const allFabricCards = document.querySelectorAll('.fabric-card');
  
  allFabricCards.forEach(eachCard => {
    if (eachCard !== cardElement) {
      eachCard.classList.remove('open');
    }
  });
  
  cardElement.classList.toggle('open');
}

// ==========================================
// 3. FAQ COLLAPSE SECTIONS
// Click question to show/hide answer
// ==========================================
function toggleFAQ(questionButton) {
  const faqItem = questionButton.parentElement;
  const allFAQItems = document.querySelectorAll('.faq-item');
  
  allFAQItems.forEach(eachFAQ => {
    if (eachFAQ !== faqItem) {
      eachFAQ.classList.remove('open');
    }
  });
  
  faqItem.classList.toggle('open');
}

// ==========================================
// 4. IMAGE CAROUSEL
// Next/Prev buttons + dots + auto-play
// ==========================================
let activeSlideIndex = 0;
const numberOfSlides = 6;

function changeSlide(direction) {
  activeSlideIndex += direction;
  
  if (activeSlideIndex >= numberOfSlides) {
    activeSlideIndex = 0;
  }
  if (activeSlideIndex < 0) {
    activeSlideIndex = numberOfSlides - 1;
  }
  
  updateAllCarouselSlides();
}

function goToSpecificSlide(slideNumber) {
  activeSlideIndex = slideNumber;
  updateAllCarouselSlides();
}

function updateAllCarouselSlides() {
  const allSlides = document.querySelectorAll('.slide');
  const allDots = document.querySelectorAll('.dot');
  
  allSlides.forEach((slide, index) => {
    slide.classList.remove('active');
    allDots[index].classList.remove('active');
  });
  
  allSlides[activeSlideIndex].classList.add('active');
  allDots[activeSlideIndex].classList.add('active');
}

// Auto-advance every 5 seconds
setInterval(() => {
  changeSlide(1);
}, 5000);

// ==========================================
// 5. ACTIVE NAVIGATION HIGHLIGHT
// Shows which section you're currently viewing
// ==========================================
const allPageSections = document.querySelectorAll('section');
const allNavigationLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let currentSectionID = '';
  const scrollPosition = window.scrollY + 150;
  
  allPageSections.forEach(section => {
    const sectionTopPosition = section.offsetTop;
    const sectionID = section.getAttribute('id');
    
    if (scrollPosition >= sectionTopPosition) {
      currentSectionID = sectionID;
    }
  });
  
  allNavigationLinks.forEach(link => {
    link.classList.remove('active');
    const linkTarget = link.getAttribute('href').replace('#', '');
    
    if (linkTarget === currentSectionID) {
      link.classList.add('active');
    }
  });
});

// ==========================================
// CONSOLE CONFIRMATION
// ==========================================
console.log('✨ ======================================');
console.log('✨ Étoffe Éclairé — Fully Loaded!');
console.log('✨ 5 Features Active');
console.log('✨ Thread of Knowledge, Style for Life');
console.log('✨ ======================================');
