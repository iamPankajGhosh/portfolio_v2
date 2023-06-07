"use strict";

/**
 * add evnet listener on multiple elements
 */

const addEventOnElements = function (elements, evnetType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(evnetType, callback);
  }
};

/**
 * PRELOADER
 */

const preloader = document.querySelector("[data-preloader]");

window.addEventListener("DOMContentLoaded", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

/**
 * NAVBAR
 * navbar toggle for mobile
 */

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navTogglerBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navTogglerBtn.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);

/**
 * HEADER
 * header active when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});

/**
 * SLIDER
 */

const sliders = document.querySelectorAll("[data-slider]");
const initSlider = function (currentSlider) {
  const sliderContainer = currentSlider.querySelector(
    "[data-slider-container]"
  );
  const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
  const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

  let totalSliderVisibleItems = Number(
    getComputedStyle(currentSlider).getPropertyValue("--slider-items")
  );
  let totalSlidebleItems =
    sliderContainer.childElementCount - totalSliderVisibleItems;

  let currentSlidePos = 0;

  const moveSliderItem = function () {
    sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
  };

  /**
   * NEXT SLIDE
   */

  const slideNext = function () {
    const slideEnd = currentSlidePos >= totalSlidebleItems;

    if (slideEnd) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    moveSliderItem();
  };

  sliderNextBtn.addEventListener("click", slideNext);

  /**
   * PREV SLIDE
   */

  const slidePrev = function () {
    const slideEnd = currentSlidePos >= totalSlidebleItems;

    if (currentSlidePos <= 0) {
      currentSlidePos = totalSlidebleItems;
    } else {
      currentSlidePos--;
    }

    moveSliderItem();
  };

  sliderPrevBtn.addEventListener("click", slidePrev);

  const dontHaveExtraItem = totalSlidebleItems <= 0;
  if (dontHaveExtraItem) {
    sliderNextBtn.style.disply = "none";
    sliderPrevBtn.style.disply = "none";
  }

  /**
   * slide with [shift + mouse wheel]
   */

  currentSlider.addEventListener("wheel", function (event) {
    if (event.shiftKey && event.deltaY > 0) slideNext();
    if (event.shiftKey && event.deltaY < 0) slidePrev();
  });

  /**
   * RESPONSIVE
   */

  window.addEventListener("resize", function () {
    totalSliderVisibleItems = Number(
      getComputedStyle(currentSlider).getPropertyValue("--slider-items")
    );

    totalSlidebleItems =
      sliderContainer.childElementCount - totalSliderVisibleItems;

    moveSliderItem();
  });
};

for (let i = 0, len = sliders.length; i < len; i++) {
  initSlider(sliders[i]);
}
