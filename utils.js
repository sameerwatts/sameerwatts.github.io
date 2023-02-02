import { gradientBar } from "./elements.js";


// Technical Skills log
export function scrollAnimation(elementArray) {
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
  
  
  //Top gradient scroll indicator
  export function scrollIndicator() {
    const winScroll = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    gradientBar.style.width = `${scrolled}%`;
  }
  