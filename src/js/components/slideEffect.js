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

let transitioning = false;

const HIDDEN = 0;
const DEFAULT = 1;
const SLIDDINGUP = 2;
const SLIDDINGDOWN = 3;
let state = DEFAULT;


/**
 * Hide an element with a slide up animation. Using CSS transition, animate the height, padding and margin of an Element from their current value to 0. Then hide the element and restore it's original height, padding and margin.
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
      if (typeof(duration) != Number) duration = 300;

      state = SLIDDINGUP;
      // element.setAttribute('data-state', 'sliddingUp');

      if( buttonToToogle ) {
        buttonToToogle.classList.toggle("active");
      }

      let customResolve = () => {
        // element.classList.remove("js-visible");
        element.style.display = 'none';
        transitioning = false;
        state = HIDDEN;
        if( buttonToToogle ) { // Allow to show stuff with css on the button
          buttonToToogle.setAttribute('data-panel-state', 'hidden');
        }
        element.dispatchEvent(new Event('slide-up-end'));
        resolve();
      }

      // If animations are enabled on the system
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && duration != 0) {

        if( buttonToToogle ) { // Allow to show stuff with css on the button
          buttonToToogle.setAttribute('data-panel-state', 'sliddingUp');
        }

        slideUpTransitionEndListener = (/*e*/) => {
          element.style.removeProperty('height');
          element.style.removeProperty('padding-top');
          element.style.removeProperty('padding-bottom');
          element.style.removeProperty('margin-top');
          element.style.removeProperty('margin-bottom');
          element.style.removeProperty('overflow');
          element.style.removeProperty('transition-duration');
          element.style.removeProperty('transition-property');
          element.classList.remove("js-transitioning");
          customResolve();
        }

        if (transitioning) {
          element.removeEventListener(transitionEnd, slideDownTransitionEndListener, { once : true });
        }

        // To enable CSS transition on element with no height specified (height: auto), we must set height.
        transitioning = element.offsetHeight;
        element.style.height = transitioning + 'px';

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
        element.classList.add("js-transitioning");
        
        element.dispatchEvent(new Event('slide-up-start'));
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
      if (typeof(duration) != Number) duration = 300;

      state = SLIDDINGDOWN;

      if( buttonToToogle ) {
        buttonToToogle.classList.toggle("active");
      }

      let customResolve = () => {
        transitioning = false;
        state = DEFAULT;
        if( buttonToToogle ) { // for css
          buttonToToogle.removeAttribute('data-panel-state');
        }
        element.dispatchEvent(new Event('slide-down-end'));
        resolve();
      }

      // If animations are enabled on the system
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && duration != 0) {

        if( buttonToToogle ) { // Allow to show stuff with css on the button
          buttonToToogle.setAttribute('data-panel-state', 'sliddingDown');
        }

        slideDownTransitionEndListener = (/*e*/) => {
          element.style.removeProperty('height');
          element.style.removeProperty('transition-duration');
          element.style.removeProperty('transition-property');
          element.style.removeProperty('overflow');
          element.classList.remove("js-transitioning");
          customResolve();
        }

        // If a slideUp animation is in progress
        if (transitioning) {
          // Remove SlideUp End event listener
          element.removeEventListener(transitionEnd, slideUpTransitionEndListener, { once : true });

          element.style.removeProperty('padding-top');
          element.style.removeProperty('padding-bottom');
          element.style.removeProperty('margin-top');
          element.style.removeProperty('margin-bottom');

          // To enable CSS transition on element with no height specified (height: auto), we must set height.
          element.style.height = transitioning + 'px';
        }
        // No slideUp animation in progress
        else {
          // Show the element
          // element.classList.add("js-visible");
          element.style.removeProperty('display');
          let display = window.getComputedStyle(element).display;
          if (display === 'none') display = 'block';
          element.style.display = display;

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

          transitioning = true;
          element.dispatchEvent(new Event('slide-down-start'));

          // Set value B -> trigger the CSS transition
          element.style.height = height + 'px';
          element.style.removeProperty('padding-top');
          element.style.removeProperty('padding-bottom');
          element.style.removeProperty('margin-top');
          element.style.removeProperty('margin-bottom');
          element.classList.add("js-transitioning");
        }
        element.addEventListener(transitionEnd, slideDownTransitionEndListener, { once : true });
      }
      else { // No animation
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
    if (typeof(duration) != Number) duration = 300;

    if (window.getComputedStyle(element).display === 'none' || state === HIDDEN || state === SLIDDINGUP ){
      slideDown(element, duration, buttonToToogle).catch((error) => {
        throw(error);
      });
    }
    else {
      slideUp(element, duration, buttonToToogle);
    }
  } catch (error) {
    console.error(error);
  }
};

export { slideUp, slideDown, slideToggle };