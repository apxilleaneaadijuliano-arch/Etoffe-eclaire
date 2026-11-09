const carousel = document.querySelector(".carousel");
const viewport = carousel.querySelector(".carousel__viewport");
const track = carousel.querySelector(".carousel__track");
const slides = [...carousel.querySelectorAll(".carousel__slide")];
const dots = [...carousel.querySelectorAll(".carousel__dot")];
const previousButton = carousel.querySelector(
  ".carousel__button--previous"
);
const nextButton = carousel.querySelector(".carousel__button--next");
const currentSlideText = document.querySelector("#current-slide");

let currentIndex = 0;
let autoplayTimer;
let touchStartX = 0;
let touchEndX = 0;

function showSlide(index) {
  currentIndex = (index + slides.length) % slides.length;

  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  slides.forEach((slide, slideIndex) => {
    const isActive = slideIndex === currentIndex;

    slide.classList.toggle("is-active", isActive);
    slide.setAttribute("aria-hidden", String(!isActive));
  });

  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === currentIndex;

    dot.classList.toggle("is-active", isActive);

    if (isActive) {
      dot.setAttribute("aria-current", "true");
    } else {
      dot.removeAttribute("aria-current");
    }
  });

  currentSlideText.textContent = currentIndex + 1;
}

function showNextSlide() {
  showSlide(currentIndex + 1);
}

function showPreviousSlide() {
  showSlide(currentIndex - 1);
}

function startAutoplay() {
  stopAutoplay();
  autoplayTimer = window.setInterval(showNextSlide, 5000);
}

function stopAutoplay() {
  window.clearInterval(autoplayTimer);
}

previousButton.addEventListener("click", () => {
  showPreviousSlide();
  startAutoplay();
});

nextButton.addEventListener("click", () => {
  showNextSlide();
  startAutoplay();
});

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    startAutoplay();
  });
});

carousel.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    showPreviousSlide();
    startAutoplay();
  }

  if (event.key === "ArrowRight") {
    showNextSlide();
    startAutoplay();
  }
});

viewport.addEventListener(
  "touchstart",
  (event) => {
    touchStartX = event.changedTouches[0].clientX;
    stopAutoplay();
  },
  { passive: true }
);

viewport.addEventListener(
  "touchend",
  (event) => {
    touchEndX = event.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance < 0) {
        showNextSlide();
      } else {
        showPreviousSlide();
      }
    }

    startAutoplay();
  },
  { passive: true }
);

carousel.addEventListener("mouseenter", stopAutoplay);
carousel.addEventListener("mouseleave", startAutoplay);

carousel.addEventListener("focusin", stopAutoplay);
carousel.addEventListener("focusout", startAutoplay);

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopAutoplay();
  } else {
    startAutoplay();
  }
});

showSlide(0);
startAutoplay();
