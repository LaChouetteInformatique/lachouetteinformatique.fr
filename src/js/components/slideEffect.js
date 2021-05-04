/**
 * Vanilla JS equivalent to JQUERY slideUp / slideDown / slideToggle
 * Inspired by https://w3bits.com/javascript-slidetoggle/ and https://grafikart.fr/tutoriels/slide-javascript-1016
 * 
 * @notes Because the element is given the overflow:hidden css property during the slide animation, if it contains other elements with margin-top and margin-bottom, a glitch might happen. It tipicaly happens with ul panels if their first li elements has margin-top, and/or their last li element has margin-bottom. To correct it, you can remove those margins or apply overflow:hidden to them.
 */

import {getTransitionEndEventName} from "./getEventPropertyName";

let transitionEnd = getTransitionEndEventName();
let slideUpTransitionEndListener = null;
let slideDownTransitionEndListener = null;

/**
 * Hide an element with a slide up animation. Using CSS transition, animate the height, padding and margin of an Element from their current value to 0. Then hide the element and restore it's original height, padding and margin. If a button is given, it will trigger it's data-command and data-panel-state attributes.
 *
 * @async
 * @param {HTMLElement} element - element to animate
 * @param {number} duration - duration of the transition in ms
 * @param {HTMLElement} [buttonToToogle] - button that will be toogled via the .active class
 * @return {Promise} return a promise that will resolve when the transition is complete
 */
const slideUp = async (element, duration = 300, buttonToToogle = null) => {
  return new Promise(function (resolve/*, reject*/) {
    try {
      if (duration == null) duration = 300;
      if( buttonToToogle ) buttonToToogle.setAttribute('data-command', 'open');

      let customResolve = () => {
        element.style.display = 'none';
        if( buttonToToogle ) buttonToToogle.setAttribute('data-panel-state', 'closed');
        element.setAttribute('data-state', 'closed');
        // element.dispatchEvent(new Event('slide-up-end'));
        resolve();
      }

      // If animations are enabled on the system
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && duration != 0) {

        slideUpTransitionEndListener = (/*e*/) => {
          element.style.removeProperty('height');
          element.style.removeProperty('padding-top');
          element.style.removeProperty('padding-bottom');
          element.style.removeProperty('margin-top');
          element.style.removeProperty('margin-bottom');
          element.style.removeProperty('overflow');
          element.style.removeProperty('transition-duration');
          element.style.removeProperty('transition-property');
          customResolve();
        }

        // If a slideDown animation is in progress
        if (element.getAttribute('data-state') === "sliddingDown") {
          element.removeEventListener(transitionEnd, slideDownTransitionEndListener, { once : true });
        }

        // To enable CSS transition on element with no height specified (height: auto), we must set height.
        let height = element.offsetHeight;
        if (element.getAttribute('data-state') != "sliddingDown") element.setAttribute('data-full-height', height);
        element.style.height = height + 'px';

        element.style.transitionProperty = 'height, margin, padding';
        element.style.transitionDuration = duration + 'ms';

        // To activate a CSS transition -> set value A
        element.offsetHeight; // hack to force browser redraw / reflow

        // Set value B -> trigger CSS transition
        element.style.overflow = 'hidden';
        element.style.height = 0;
        element.style.paddingTop = 0;
        element.style.paddingBottom = 0;
        element.style.marginTop = 0;
        element.style.marginBottom = 0;

        if( buttonToToogle ) buttonToToogle.setAttribute('data-panel-state', 'sliddingUp');
        element.setAttribute('data-state', 'sliddingUp');
        // element.dispatchEvent(new Event('slide-up-start'));
        element.addEventListener(transitionEnd, slideUpTransitionEndListener, { once : true });

      } else { // No animation
        customResolve();
      }
    } catch (error) {
      console.error(error);
    }

  });
};

/**
 * Show a hidden element with a slide up animation. Using CSS transition, animate the height, padding and margin of an Element from 0 to their current value. In order to do so, set the element height, padding and margin to 0, display the element, then animate it back to it's original height, padding and margin.
 * 
 * @async
 * @param {HTMLElement} element - element to animate
 * @param {number} duration - duration of the transition in ms
 * @param {HTMLElement} [buttonToToogle] - button that will be toogled via the .active class
 * @return {Promise} return a promise that will resolve when the transition is complete
 */
const slideDown = async (element, duration = 300, buttonToToogle = null) => {
  return new Promise(function (resolve, reject) {
    try {
      if (duration == null) duration = 300;
      if( buttonToToogle ) buttonToToogle.setAttribute('data-command', 'close');

      let customResolve = () => {
        if( buttonToToogle ) buttonToToogle.setAttribute('data-panel-state', 'open');
        element.setAttribute('data-state', 'open');
        // element.dispatchEvent(new Event('slide-down-end'));
        resolve();
      }

      // If animations are enabled on the system
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && duration != 0) {

        slideDownTransitionEndListener = (/*e*/) => {
          element.style.removeProperty('height');
          element.style.removeProperty('transition-duration');
          element.style.removeProperty('transition-property');
          element.style.removeProperty('overflow');
          customResolve();
        }

        // If a slideUp animation is in progress
        if (element.getAttribute('data-state') === "sliddingUp") {
          // Cancel it
          element.removeEventListener(transitionEnd, slideUpTransitionEndListener, { once : true });

          element.style.removeProperty('padding-top');
          element.style.removeProperty('padding-bottom');
          element.style.removeProperty('margin-top');
          element.style.removeProperty('margin-bottom');

          // To enable CSS transition on element with no height specified (height: auto), we must set height.
          // Set value B -> trigger the CSS transition
          element.style.height = element.getAttribute('data-full-height', element.offsetHeight) + 'px';
        }
        // No slideUp animation in progress
        else {
          element.style.removeProperty('display');
          if (window.getComputedStyle(element).display === 'none') element.style.display = 'block';

          let height = element.offsetHeight; // redraw

          // To activate a CSS transition -> set value from A to B.
          element.style.overflow = 'hidden';
          element.style.height = 0;
          element.style.paddingTop = 0;
          element.style.paddingBottom = 0;
          element.style.marginTop = 0;
          element.style.marginBottom = 0;
          
          // Ensure the browser took value A into account.
          element.offsetHeight; // force redraw

          element.style.transitionProperty = "height, margin, padding";
          element.style.transitionDuration = duration + 'ms';

          // Set value B -> trigger the CSS transition
          element.style.height = height + 'px';
          element.style.removeProperty('padding-top');
          element.style.removeProperty('padding-bottom');
          element.style.removeProperty('margin-top');
          element.style.removeProperty('margin-bottom');
        }
        // element.dispatchEvent(new Event('slide-down-start'));
        if( buttonToToogle ) buttonToToogle.setAttribute('data-panel-state', 'sliddingDown');
        element.setAttribute('data-state', 'sliddingDown');
        element.addEventListener(transitionEnd, slideDownTransitionEndListener, { once : true });
      }
      else { // No animation
        element.style.removeProperty('display');
        if (window.getComputedStyle(element).display === 'none') element.style.display = 'block';
        customResolve();
      }
    }
    catch (error) {
      reject(error);
    }
  
  });
};

/**
 * If the element is not already animating (presence of the .animating class), call slideUp() or slideDown() transition on it, depending of it's display property
 * 
 * @async
 * @param {HTMLElement} element
 * @param {number} [duration]
 * @param {HTMLElement} [buttonToToogle] - button that will be toogled via the .active class
 * @returns {Promise}
 * 
 */
const slideToggle = async (element, duration = 300, buttonToToogle = null) => {

  try {
    if (typeof(duration) != typeof(10)) duration = 300;

    let state = element.getAttribute('data-state');

    if (window.getComputedStyle(element).display === 'none' || state === 'closed' || state === 'sliddingUp' ){
      slideDown(element, duration, buttonToToogle);
    }
    else {
      slideUp(element, duration, buttonToToogle);
    }
  } catch (error) {
    console.error(error);
  }
};

export { slideUp, slideDown, slideToggle };