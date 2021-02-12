/**
 * @package     Templates.ceaec
 * @subpackage  getEventPropertyName.js
 * @version     1.0
 *
 * @copyright   Copyright (C) 2019 - 2020 La Chouette Informatique All rights reserved.
 * @license     CC0 1.0 Universal - Public Domain Dedication; see https://creativecommons.org/publicdomain/zero/1.0/deed.en
 * 
 * @description Get the supported event property name
 *
 * @note : thanks to https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/
 */

const transitions = {
  "transition"      : "transitionend",
  "OTransition"     : "oTransitionEnd",
  "MozTransition"   : "transitionend",
  "WebkitTransition": "webkitTransitionEnd"
};

const animations = {
  "animation"      : "animationend",
  "OAnimation"     : "oAnimationEnd",
  "MozAnimation"   : "animationend",
  "WebkitAnimation": "webkitAnimationEnd"
};

function getTransitionEndEventName(){
  return detectEventPropertyName(transitions);
}

function getAnimationEndEventName(){
  return detectEventPropertyName(animations);
}

function detectEventPropertyName(eventList) {
  let t;
  const el = document.createElement("fakeelement");

  for (t in eventList){
    if (el.style[t] !== undefined){
      return eventList[t];
    }
  }
}

export {getTransitionEndEventName, getAnimationEndEventName};