/**
 * SlidingPanel and SlidingPanelButton Class
 */

import {getTransitionEndEventName} from "./getEventPropertyName";
const transitionEnd = getTransitionEndEventName();
import {utils} from "./utils";

const OPENNED       = 1,
      SLIDINGUP     = 2,
      CLOSED        = 3,
      SLIDINGDOWN   = 4;

let SlidingPanelCounter = 0;

/**
 * A panel that can be slided up (and become hidden) or down (visible) with an open, close and toggle
 * @param {HTMLElement} panel
 * @param {number} [state] current state of the panel - number between 1 and 4 : OPENNED = 1, SLIDINGUP = 2, CLOSED = 3, SLIDINGDOWN = 4;
 * @param {boolean} [debug] if true, the console will output the panel state change
 */
export function SlidingPanel(panelElement, state = 2, debug = false) {

  let panelFullHeight;
  let uid = SlidingPanelCounter;
  SlidingPanelCounter++;
  let slideDownTransitionEndListener,
      slideUpTransitionEndListener;


  const isValidState = (state) => !(!state || isNaN(state) || state < 1 || state > 4);

  Object.defineProperty(this, 'uid', {
    get: function () {
      return uid;
    }
  });

  Object.defineProperty(this, 'panelElement', {
    get: function () {
      return panelElement;
    }
  });

  Object.defineProperty(this, 'state', {
    get: function () {
      return state;
    }
  });

  Object.defineProperty(this, 'debug', {
    get: function () {
      return debug;
    },
    set: function (value) {
      debug = value;
      const debugListener = () => {
        console.log(panelElement, 'state changed, new state :', this.getState());
      }
      if (debug) {
        panelElement.addEventListener('stateChange', debugListener);
      }
      else {
        panelElement.removeEventListener('stateChange', debugListener);
      }
    }
  });

  this.getState = () => {
    switch (state) {
      case 2:
        return 'slidingUp';
      case 3:
        return 'closed';
      case 4:
        return 'slidingDown';
      case 1:
      default:
        return 'openned';
    }
  }

  const setState = (newState) => {
    if(!isValidState(newState)) {
      throw new Error('State must be a number and 1 ≤ state ≤ 4');
    }
    state = newState;
    panelElement.setAttribute(utils.formatAttribute('state'), this.getState());
    panelElement.dispatchEvent(new Event('stateChange'));
  }

  /**
   * Hide the panel with a slide up animation. Using CSS transition, animate the height, padding and margin of the panel from their current value to 0. Then hide the panel and restore it's original height, padding and margin.
   * @async
   * @param {number} duration - duration of the transition in ms
   * @return {Promise} return a promise that will resolve when the transition is complete, or null if the panel is closed
   */
  this.slideUp = async (duration = 300) => {
    if (this.getState() === "closed" ) {
      return null;
    }
    return new Promise(function (resolve, reject) {
      try {
        if (duration == null || isNaN(duration)) {
          duration = 300;
        }

        let customResolve = () => {
          panelElement.style.display = 'none';
          setState(CLOSED);
          resolve();
        }

        // If animations are enabled on the system
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && duration != 0) {

          slideUpTransitionEndListener = ( /*e*/ ) => {
            panelElement.style.removeProperty('height');
            panelElement.style.removeProperty('padding-top');
            panelElement.style.removeProperty('padding-bottom');
            panelElement.style.removeProperty('margin-top');
            panelElement.style.removeProperty('margin-bottom');
            panelElement.style.removeProperty('overflow');
            panelElement.style.removeProperty('transition-duration');
            panelElement.style.removeProperty('transition-property');
            customResolve();
          }

          // If a slideDown animation is in progress
          if (state === SLIDINGDOWN) {
            panelElement.removeEventListener(transitionEnd, slideDownTransitionEndListener, {
              once: true
            });
          }

          // To enable CSS transition on element with no height specified (height: auto), we must set height.
          let height = panelElement.offsetHeight;
          if (state != SLIDINGDOWN) {
            panelFullHeight = height;
          }
            
          panelElement.style.height = height + 'px';

          panelElement.style.transitionProperty = 'height, margin, padding';
          panelElement.style.transitionDuration = duration + 'ms';

          // To activate a CSS transition -> set value A
          panelElement.offsetHeight; // hack to force browser redraw / reflow

          // Set value B -> trigger CSS transition
          panelElement.style.overflow = 'hidden';
          panelElement.style.height = 0;
          panelElement.style.paddingTop = 0;
          panelElement.style.paddingBottom = 0;
          panelElement.style.marginTop = 0;
          panelElement.style.marginBottom = 0;

          setState(SLIDINGUP);
          panelElement.addEventListener(transitionEnd, slideUpTransitionEndListener, {
            once: true
          });

        } else { // No animation
          customResolve();
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Show the hidden panel with a slide up animation. Using CSS transition, animate the height, padding and margin of the panel from 0 to their current value. In order to do so, set the panel height, padding and margin to 0, display the panel, then animate it back to it's original height, padding and margin.
   * 
   * @async
   * @param {number} duration - duration of the transition in ms
   * @return {Promise} return a promise that will resolve when the transition is complete, or null if the panel is openned
   */
  this.slideDown = async (duration = 300) => {
    if (this.getState() === "openned" ) {
      return null;
    }
    return new Promise(function (resolve, reject) {
      try {
        if (duration == null || isNaN(duration))
          duration = 300;

        let customResolve = () => {
          setState(OPENNED);
          resolve();
        }

        // If animations are enabled on the system
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && duration != 0) {

          // let transitionTimeOut;

          // const startTimeout = (timeOutDuration) => {
          //   transitionTimeOut = window.setTimeout(() => {
          //     reject("timeout");
          //     panelElement.removeEventListener(transitionEnd, slideDownTransitionEndListener, {
          //       once: true
          //     });
          //   }, timeOutDuration);
          // }

          // const stopTimeOut = () => {
          //   window.clearTimeout(transitionTimeOut);
          // }

          slideDownTransitionEndListener = ( /*e*/ ) => {
            // stopTimeOut();
            panelElement.style.removeProperty('height');
            panelElement.style.removeProperty('transition-duration');
            panelElement.style.removeProperty('transition-property');
            panelElement.style.removeProperty('overflow');
            customResolve();
          }

          // If a slideUp animation is in progress
          if (state === SLIDINGUP) {
            // Cancel it
            panelElement.removeEventListener(transitionEnd, slideUpTransitionEndListener, {
              once: true
            });

            panelElement.style.removeProperty('padding-top');
            panelElement.style.removeProperty('padding-bottom');
            panelElement.style.removeProperty('margin-top');
            panelElement.style.removeProperty('margin-bottom');

            // To enable CSS transition on an element with no height specified (height: auto), we must set it's height.
            // Set value B -> trigger the CSS transition
            panelElement.style.height = panelFullHeight + 'px';
          }
          // No slideUp animation in progress
          else {
            panelElement.style.removeProperty('display');
            if (window.getComputedStyle(panelElement).display === 'none') {
              panelElement.style.display = 'block';
            }

            let height = panelElement.offsetHeight; // redraw

            // To activate a CSS transition -> set value from A to B.
            panelElement.style.overflow = 'hidden';
            panelElement.style.height = 0;
            panelElement.style.paddingTop = 0;
            panelElement.style.paddingBottom = 0;
            panelElement.style.marginTop = 0;
            panelElement.style.marginBottom = 0;

            // Ensure the browser took value A into account.
            panelElement.offsetHeight; // force redraw

            panelElement.style.transitionProperty = "height, margin, padding";
            panelElement.style.transitionDuration = duration + 'ms';

            // Set value B -> trigger the CSS transition
            panelElement.style.height = height + 'px';
            panelElement.style.removeProperty('padding-top');
            panelElement.style.removeProperty('padding-bottom');
            panelElement.style.removeProperty('margin-top');
            panelElement.style.removeProperty('margin-bottom');
          }

          setState(SLIDINGDOWN);
          panelElement.addEventListener(transitionEnd, slideDownTransitionEndListener, {
            once: true
          });
          // startTimeout();
         

        } else { // No animation
          panelElement.style.removeProperty('display');
          if (window.getComputedStyle(panelElement).display === 'none') {
            panelElement.style.display = 'block';
          }
            
          customResolve();
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Toggle the panel state with slideUp() or slideDown() depending of it's current state.
   * 
   * @param {number} duration - duration of the transition in ms
   * @returns {Promise} return a promise that will resolve when the transition is complete
   * 
   */
  this.slideToggle = (duration = 300) => {
    if (state === CLOSED || state === SLIDINGUP) {
      this.slideDown(duration);
    }
    else {
      this.slideUp(duration);
    }
  };

  const init = () => {

    // DEBUG
    if (debug) {
      this.debug = true;
    }
    
    if (!utils.isDomElement(panelElement)) {
      utils.validDOMElementError("panelElement");
    }

    panelElement.setAttribute(utils.formatAttribute("panel-uid"), uid);

    if (!isValidState(state)) {
      // Guess current state of the panelElement
      if (window.getComputedStyle(panelElement).display === 'none') {
        setState(CLOSED);
      }
      else {
        setState(OPENNED);
      }
    }
  }

  init();
}

let SlidingPanelButtonCounter = 0;

/**
 * A button that can trigger a SlidingPanel. The button will actively track it's panel state changes
 * @param {HTMLElement} button
 * @param {HTMLElement} panel
 * @param {string} [type] must be "toggle", "open" or "close"
 */
export function SlidingPanelButton(button, panelObject, type = "toggle"){

  let uid = SlidingPanelButtonCounter;
  SlidingPanelButtonCounter++;

  Object.defineProperty(this, 'uid', {
    get: function () {
      return uid;
    }
  });

  Object.defineProperty(this, 'panelObject', {
    get: function () {
      return panelObject;
    }
  });

  Object.defineProperty(this, 'button', {
    get: function () {
      return button;
    }
  });

  Object.defineProperty(this, 'panelElement', {
    get: function () {
      return panelObject.panelElement;
    }
  });

  Object.defineProperty(this, 'type', {
    get: function () {
      return type;
    }
  });

  const toggleListener = () => {
    panelObject.slideToggle();
  }
  const openListener = () => {
    panelObject.slideDown();
  }
  const closeListener = () => {
    panelObject.slideUp();
  }

  const panelStateListener = () => {
    button.setAttribute(utils.formatAttribute('panel-state'), panelObject.getState());
  }

  this.removeListener = () => {
    panelObject.panelElement.removeEventListener('stateChange', panelStateListener);
  }

  const init = () => {
    if (!utils.isDomElement(button)) {
        utils.validDOMElementError('button');
    }

    if(!(panelObject instanceof SlidingPanel)) {
      throw new Error(`panelObject must be an instanceof SlidingPanel`);
    }

    if( type !== "toggle" && type !== "open" & type !=="close") {
      throw new Error('Type must be one of the following : "toggle", "open" or "close".');
    }

    switch (type) {
      case "open":
        button.addEventListener('click', openListener);
        break;
      case "close":
        button.addEventListener('click', closeListener);
        break;
      case "toggle":
      default:
        button.addEventListener('click', toggleListener);
        break;
    }

    panelObject.panelElement.addEventListener('stateChange', panelStateListener);
  }

  init();
}


