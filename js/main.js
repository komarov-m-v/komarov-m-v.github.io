document.addEventListener("DOMContentLoaded", () => {
  burger();
  setMenuItemOnScroll();
  progressBar();
  fixCheckoutItem();
  new Slider();

  window.addEventListener("resize", () => {
    fixCheckoutItem();
  });
});

const burger = () => {
  const burgerEl = document.querySelector(".burger");
  const menuEl = document.querySelector(".header__menu");
  const menuItems = Array.from(document.querySelectorAll(".nav__item"));
  let isOpenMenu = false;

  const open = () => {
    menuEl.classList.add("header__menu--active");
    burgerEl.classList.add("burger--active");
    document.documentElement.style.overflow = "hidden";
    isOpenMenu = true;
  };
  const close = () => {
    menuEl.classList.remove("header__menu--active");
    burgerEl.classList.remove("burger--active");
    document.documentElement.style.overflow = "";
    isOpenMenu = false;
  };

  burgerEl.addEventListener("click", () => {
    if (isOpenMenu) close();
    else open();
  });

  menuItems.forEach((item) => {
    item.addEventListener("click", close);
  });
};

const setMenuItemOnScroll = () => {
  const els = [...document.querySelectorAll(".nav__item a")].reduce(
    (arr, el) => {
      const targetId = el.getAttribute("href").slice(1);
      const targetEl = targetId ? document.querySelector(`#${targetId}`) : null;
      if (targetEl) {
        arr.push({
          section: targetEl,
          navLink: el,
        });
      }

      return arr;
    },
    []
  );

  const setActive = () => {
    els.forEach(({ section, navLink }) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (window.scrollY >= top && window.scrollY < top + height) {
        navLink.classList.add("nav__link--active");
      } else {
        navLink.classList.remove("nav__link--active");
      }
    });
  };

  window.addEventListener("scroll", setActive);
  window.addEventListener("load", setActive);
};

const fixCheckoutItem = () => {
  const listEl = document.querySelector(".checkout-list");
  const items = listEl.querySelectorAll(".checkout-list__item");
  const gridColumns = window
    .getComputedStyle(listEl)
    .getPropertyValue("grid-template-columns")
    .split(" ").length;
  let lastInRowIndex = gridColumns - 1;

  items.forEach((item) => {
    item.classList.remove("checkout-list__item--last");
  });

  items.forEach((item, index) => {
    if (index === lastInRowIndex) {
      item.classList.add("checkout-list__item--last");
      lastInRowIndex += gridColumns;
    }
  });
};

const progressBar = () => {
  const inp = document.querySelector(".checkout-form-range__slide");
  const progressEl = document.querySelector(".checkout-form-range__progress");
  const setProgress = (value) => {
    progressEl.textContent = `${value}%`;
  };
  const defaultValue = 75;

  inp.value = defaultValue;
  setProgress(defaultValue);

  inp.addEventListener("input", (e) => {
    setProgress(e.target.value);
  });
};

class Slider {
  constructor() {
    this.activeIndex = 0;
    this.slides = [...document.querySelectorAll(".reviews-slide")];
    this.btnPrev = document.querySelector(".reviews-nav--prev");
    this.btnNext = document.querySelector(".reviews-nav--next");

    this.setSlide(this.activeIndex);
    this.btnPrev.addEventListener("click", () => {
      this.setSlide(this.activeIndex - 1, "reviews-slide--prev");
    });
    this.btnNext.addEventListener("click", () => {
      this.setSlide(this.activeIndex + 1, "reviews-slide--next");
    });
  }

  setSlide(n, classActive = "reviews-slide--next") {
    if (n >= this.slides.length) {
      this.activeIndex = 0;
    } else if (n < 0) {
      this.activeIndex = this.slides.length - 1;
    } else {
      this.activeIndex = n;
    }

    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].classList.remove(
        "reviews-slide--prev",
        "reviews-slide--next"
      );
    }
    this.slides[this.activeIndex].classList.add(classActive);
  }
}
