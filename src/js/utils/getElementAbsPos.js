/**
 * @package     Templates.ceaec
 * @subpackage  getstyle.js
 * @version     1.0
 *
 * @copyright   Copyright (C) 2019 - 2020 La Chouette Informatique All rights reserved.
 * @license     CC0 1.0 Universal - Public Domain Dedication; see https://creativecommons.org/publicdomain/zero/1.0/deed.en
 *
 * @function getElementAbsPos
 * @description Get element's absolute coordinates relative to the document
 *  http://javascript.info/coordinates
 *  Any point on the page has coordinates:
 *    Relative to the window – elem.getBoundingClientRect().
 *    Relative to the document – elem.getBoundingClientRect()
 *      plus the current page scroll.
 *
 * @param {Element} elem - Element to get coordinates from
 * 
**/
let getElementAbsPos = ( elem ) => {
  let box = elem.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
};

export {getElementAbsPos};