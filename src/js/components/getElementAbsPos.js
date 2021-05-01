/**
 * Get element's absolute coordinates relative to the document
 *  http://javascript.info/coordinates
 *  Any point on the page has coordinates:
 *    Relative to the window – elem.getBoundingClientRect().
 *    Relative to the document – elem.getBoundingClientRect() + the current page scroll.
 *
 * @param {HTMLElement} element - Element to get coordinates from
 * 
**/
let getElementAbsPos = ( element ) => {
  let box = element.getBoundingClientRect();
  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
};

export {getElementAbsPos};