document.addEventListener('DOMContentLoaded', () => {

  // === 1. NAVIGATION HIGHLIGHT & NAVBAR SCROLL ===
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

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


  // === 2. SCROLL ANIMATIONS ===
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


  // === 3. PROGRESS STEPS ENGINE ===
  const stepsData = [
    { title: "Step 1: Read the Care Label", desc: "Check fabric percentages before buying. Look out for natural vs. synthetic fibers to know how the garment will feel and stretch." },
    { title: "Step 2: Understand Fiber Properties", desc: "Identify key traits: Cotton breathes, Silk drapes smoothly, Polyester resists wrinkles, and Linen keeps you cool in heat." },
    { title: "Step 3: Smart Online Shopping", desc: "Always check zoom images for weave patterns and read customer reviews about shrinkage and fabric thickness." },
    { title: "Step 4: Care & Longevity", desc: "Wash natural fibers on delicate cycles with cold water to prevent shrinking and prolong the life of your wardrobe." }
  ];

  let currentStep = 1;
  const progressFill = document.getElementById('progressFill');
  const stepNodes = document.querySelectorAll('.progress-step');
  const stepTitle = document.getElementById('stepTitle');
  const stepDescription = document.getElementById('stepDescription');
  const prevStepBtn = document.getElementById('prevStepBtn');
  const nextStepBtn = document.getElementById('nextStepBtn');

  function updateProgress() {
    stepNodes.forEach((node, idx) => {
      if (idx < currentStep) {
        node.classList.add('active');
      } else {
        node.classList.remove('active');
      }
    });

    const fillPercent = ((currentStep - 1) / (stepNodes.length - 1)) * 100;
    progressFill.style.width = `${fillPercent}%`;

    const stepCard = document.getElementById('stepContent');
    stepCard.style.opacity = '0';
    
    setTimeout(() => {
      stepTitle.textContent = stepsData[currentStep - 1].title;
      stepDescription.textContent = stepsData[currentStep - 1].desc;
      stepCard.style.opacity = '1';
    }, 200);

    prevStepBtn.disabled = currentStep === 1;
    if (currentStep === stepsData.length) {
      nextStepBtn.textContent = 'Restart';
    } else {
      nextStepBtn.textContent = 'Next Step';
    }
  }

  nextStepBtn.addEventListener('click', () => {
    if (currentStep < stepsData.length) {
      currentStep++;
    } else {
      currentStep = 1;
    }
    updateProgress();
  });

  prevStepBtn.addEventListener('click', () => {
    if (currentStep > 1) {
      currentStep--;
      updateProgress();
    }
  });


  // === 4. IMAGE CAROUSEL ENGINE ===
  const track = document.getElementById('carouselTrack');
  const slides = Array.from(track.children);
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');

  let carouselIndex = 0;

  dotsContainer.innerHTML = '';

  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => moveCarousel(index));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  function updateDots(index) {
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) dots[index].classList.add('active');
  }

  function moveCarousel(index) {
    if (index < 0) {
      carouselIndex = slides.length - 1;
    } else if (index >= slides.length) {
      carouselIndex = 0;
    } else {
      carouselIndex = index;
    }
    track.style.transform = `translateX(-${carouselIndex * 100}%)`;
    updateDots(carouselIndex);
  }

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      moveCarousel(carouselIndex - 1);
    });

    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      moveCarousel(carouselIndex + 1);
    });
  }

  let carouselAutoPlay = setInterval(() => moveCarousel(carouselIndex + 1), 5000);

  const carouselBox = document.querySelector('.carousel-container');
  if (carouselBox) {
    carouselBox.addEventListener('mouseenter', () => clearInterval(carouselAutoPlay));
    carouselBox.addEventListener('mouseleave', () => {
      carouselAutoPlay = setInterval(() => moveCarousel(carouselIndex + 1), 5000);
    });
  }


  // === 5. EXPANDING CARDS ===
  const expandableCards = document.querySelectorAll('.expandable-card');
  expandableCards.forEach(card => {
    card.addEventListener('click', () => {
      expandableCards.forEach(c => {
        if (c !== card) c.classList.remove('expanded');
      });
      card.classList.toggle('expanded');
    });
  });


  // === 6. FAQ ACCORDION ===
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(button => {
    button.addEventListener('click', () => {
      const parentItem = button.parentElement;
      const allItems = document.querySelectorAll('.faq-item');
      
      allItems.forEach(item => {
        if (item !== parentItem) item.classList.remove('expanded');
      });
      
      parentItem.classList.toggle('expanded');
    });
  });

});
