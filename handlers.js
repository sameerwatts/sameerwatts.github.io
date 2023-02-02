import { headerText, logo, menuToggle, nav, navWrapper, overlay, progressBar } from "./elements.js";
import { scrollAnimation, scrollIndicator } from "./utils.js";

// Nav Links click handling
export function navLinkClickHandler(e) {
    const currentLink = e.target;
    nav.querySelector("a[active]").removeAttribute("active");
    currentLink.setAttribute("active", "");
    nav.classList.remove("mobile-nav");
    menuToggle.classList.remove("is-active");
  }
  
  // Hide Work detail popup
export function hidePopupHandler(el) {
    const workDetail = el.closest(".work-detail");
    // const overlay = el.closest(".work").querySelector(".overlay");
    overlay.classList.remove("show");
    workDetail.classList.remove("show");
  }
  
  //Show Work details popup
  export function showWorkPopup(el) {
    const workDetail = el.querySelector(".work-detail");
    overlay.classList.add("show");
    workDetail.classList.add("show");
  }

  // Actions on scrolling
export const scrollEventsHandler = () => {
    if (headerText.offsetTop - window.scrollY + 10 < navWrapper.clientHeight) {
      navWrapper.classList.add("active");
      const positionY = 160 - window.scrollY;
      if (positionY < 30) {
        logo.classList.add("showLogo");
      }
    } else {
      navWrapper.classList.remove("active");
      logo.classList.remove("showLogo");
    }
    scrollIndicator();
    scrollAnimation(progressBar);
  };