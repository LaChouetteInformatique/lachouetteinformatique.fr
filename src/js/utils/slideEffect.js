/**
 * @package     Templates.ceaec
 * @subpackage  slideEffect.js
 * @version     1.6
 *
 * @copyright   Copyright (C) 2019 - 2020 La Chouette Informatique All rights reserved.
 * @license     CC0 1.0 Universal - Public Domain Dedication; see https://creativecommons.org/publicdomain/zero/1.0/deed.en
 *
 * @description Vanilla JS equivalent to JQUERY slideUp / slideDown / slideToggle
 * Except for the transition that can't be stopped once launched
 * Inspired from https://w3bits.com/javascript-slidetoggle/
 * 
 * CSS needed for the target :
 * display: none;
 * .js-visible {
      display: block;
    }
 */

import {getTransitionEndEventName} from "./getEventPropertyName";

let transitionEnd = getTransitionEndEventName();

/**
 * @function slideUp - Using CSS transition, animate the height, padding and margin of an Element from their current value to 0. Then hide the element and restore it's original height, padding and margin.
 *
 * @async
 * @param {Element} target - element to animate
 * @param {number} duration - duration of the transition
 * @return {Promise} return a promise that will resolve when the transition is complete
 * @todo  alternative to the target.offsetHeight hack to force a browser redraw / reflow ?
 */
const slideUp = (target, duration = 300) => {

  try {
    // If animation are enabled on the system
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && duration != 0) {
      target.style.transitionProperty = 'height, margin, padding';
      target.style.transitionDuration = duration + 'ms';

      // Enable CSS transition on element with no height specified (height: auto)
      target.style.height = target.offsetHeight + 'px';

      // To activate a CSS transition -> set value A
      target.offsetHeight; // hack to force browser redraw / reflow.

      // Set value B -> trigger CSS transition
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.classList.add("js-transitioning");
      target.dispatchEvent(new Event('slide-up-animation-start'));
    }

    return new Promise(function (resolve/*, reject*/) {
      let customResolve = () => {
        target.dispatchEvent(new Event('slide-up-end'));
        resolve();
      }

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && duration != 0) {
        target.addEventListener(transitionEnd, (/*e*/) => {
          // console.log(e);
          target.classList.remove("js-visible");
          target.style.removeProperty('height');
          target.style.removeProperty('padding-top');
          target.style.removeProperty('padding-bottom');
          target.style.removeProperty('margin-top');
          target.style.removeProperty('margin-bottom');
          target.style.removeProperty('overflow');
          target.style.removeProperty('transition-duration');
          target.style.removeProperty('transition-property');
          target.classList.remove("js-transitioning");
          customResolve();
        }, { once : true });
      } else {
        target.classList.remove("js-visible");
        customResolve();
      }
    });

  } catch (error) {
    console.error(error);
  }
};

/**
 * @function slideDown - Using CSS transition, animate the height, padding and margin of an Element from 0 to their current value. In order to do so, set the element height, padding and margin to 0, display the element, then animate it back to it's original height, padding and margin.
 * 
 * @async
 * @param {Element} target - element to animate
 * @param {number} duration - duration of the transition
 * @return {Promise} return a promise that will resolve when the transition is complete
 * @todo alternative to the target.offsetHeight hack to force a browser redraw / reflow ?
 */
const slideDown = (target, duration=300) => {

  try {
    target.classList.add("js-visible");

    // If animations are enabled on the system
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && duration != 0) {
      // console.log("prefers-reduced-motion disabled");
      let height = target.offsetHeight; // this will trigger a browser redraw

      target.dispatchEvent(new Event('slide-down-animation-start'));

      // To activate a CSS transition -> set value from A to B.
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.style.overflow = 'hidden';

      // Ensure the browser took value A into account.
      target.offsetHeight; // force browser redraw / reflow

      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = duration + 'ms';

      // Set value B -> trigger the CSS transition
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.height = height + 'px';
      target.classList.add("js-transitioning");
    }

    return new Promise(function (resolve) {

      let customResolve = () => {
        target.dispatchEvent(new Event('slide-down-end'));
        resolve();
      }

      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && duration != 0) {
        target.addEventListener(transitionEnd, (/*e*/) => {
          // console.log(e);
          target.style.removeProperty('height');
          target.style.removeProperty('overflow');
          target.style.removeProperty('transition-duration');
          target.style.removeProperty('transition-property');
          target.classList.remove("js-transitioning");
          customResolve();
        }, { once : true });
      } else {
        customResolve();
      }
    });

  } catch (error) {
    console.error(error);
  }
};

/**
 * @function slideToogle - If the dropdownTarget is not already animating (presence of the .animating class), call slideUp() or slideDown() transition on it, depending of it's display property (presence of the .js-visible class)
 * 
 * @async
 * @param {Element} dropdownTarget - element to animate
 * @param {Element} [buttonToToogle] - button that will be toogled via the .active class
 * @param {number} [duration] - duration of the transition
 */
const slideToggle = async (dropdownTarget, buttonToToogle = null, duration = 300) => {

  try {
    if (!dropdownTarget.classList.contains("js-transitioning")){

      if( buttonToToogle ) {
        buttonToToogle.classList.toggle("active");
      }

      if (dropdownTarget.classList.contains("js-visible")) {
        await slideUp(dropdownTarget, duration);
      } else {
        await slideDown(dropdownTarget, duration);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

export { slideUp, slideDown, slideToggle };