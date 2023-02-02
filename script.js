import {hideButtons, menuToggle, nav, navLinks, workTriggers} from './elements.js';
import { navLinkClickHandler, hidePopupHandler,showWorkPopup,scrollEventsHandler } from './handlers.js';

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
