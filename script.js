const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const navWrapper = document.querySelector(".nav-wrapper");
const logo = document.querySelector(".logo");
const navHeight = navWrapper.offsetHeight;
const progressBar = document.querySelectorAll(".progress-bar");
const workTriggers = Array.from(document.querySelectorAll(".work-trigger"));
const hideButtons = Array.from(document.querySelectorAll(".hide-popup"));
const lastName = document.querySelector(".header-text-last");
const headerText = document.querySelector(".header");
// const gap = headerText.offsetTop - navWrapper.clientHeight;
const gradientBar = document.querySelector(".grad-bar");
const navLinks = nav.querySelectorAll("a");
const sections = document.querySelectorAll("section");
const overlay = document.querySelector(".overlay");

// Nav Links click handling
function navLinkClickHandler(e) {
  const currentLink = e.target;
  nav.querySelector("a[active]").removeAttribute("active");
  currentLink.setAttribute("active", "");
  nav.classList.remove("mobile-nav");
  menuToggle.classList.remove("is-active");
}

// nav link scroll handling
function navLinkScrollHandler() {}

// Technical Skills log
function scrollAnimation(elementArray) {
  elementArray.forEach((el) => {
    const slideInAt = window.scrollY + window.innerHeight;
    const isHalfShown = slideInAt > el.offsetTop;
    const isNotScrolledPast = window.scrollY < el.offsetTop;
    if (isHalfShown && isNotScrolledPast) {
      el.classList.add("active");
      const skillPercent = el
        .closest(".progress-box")
        .querySelector(".pull-right").textContent;
      el.style.width = `${skillPercent}`;
    } else {
      el.classList.remove("active");
      el.style.width = "0px";
    }
  });
}

// Hide Work detail popup
function hidePopupHandler(el) {
  const workDetail = el.closest(".work-detail");
  // const overlay = el.closest(".work").querySelector(".overlay");
  overlay.classList.remove("show");
  workDetail.classList.remove("show");
}

//Show Work details popup
function showWorkPopup(el) {
  console.log("hello");
  const workDetail = el.querySelector(".work-detail");
  // const overlay = el.querySelector(".overlay");
  overlay.classList.add("show");
  workDetail.classList.add("show");
}

//Top gradient scroll indicator
function scrollIndicator() {
  const winScroll = document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  gradientBar.style.width = `${scrolled}%`;
}

// Actions on scrolling
const scrollEventsHandler = () => {
  if (headerText.offsetTop - window.scrollY + 10 < navWrapper.clientHeight) {
    navWrapper.classList.add("active");
    // if (lastName.classList.contains("activeTranslate")) {
    //   lastName.classList.remove("activeTranslate");
    // }
    const positionY = 160 - this.scrollY;
    if (positionY < 30) {
      logo.classList.add("showLogo");
    }
  } else {
    // lastName.style.transform = `translate(${position * 8}px,${-position}px)`;
    navWrapper.classList.remove("active");
    logo.classList.remove("showLogo");
  }
  // if (window.scrollY === 0) {
  // lastName.classList.remove("activeTranslate");
  // }
  scrollIndicator();
  scrollAnimation(progressBar);
  navLinkScrollHandler();
};

// Event listeners
navLinks.forEach((link) => {
  link.addEventListener("click", navLinkClickHandler);
});
workTriggers.forEach((workTrigger) => {
  workTrigger.addEventListener("click", (e) => showWorkPopup(e.currentTarget));
});
hideButtons.forEach((hideButton) => {
  hideButton.addEventListener("click", (e) => {
    hidePopupHandler(e.currentTarget);
    e.stopPropagation();
  });
});
menuToggle.addEventListener("click", function () {
  nav.classList.toggle("mobile-nav");
  this.classList.toggle("is-active");
});
window.addEventListener("scroll", scrollEventsHandler);
// window.addEventListener("scroll", debounce(showAnimation));
// sections.forEach((section) => {
//   section.addEventListener("scroll", () => {
//     console.log("test")

// });
