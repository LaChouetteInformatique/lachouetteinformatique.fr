/**
 * @source      https://stackoverflow.com/a/33499348/9251608
 * 
 * @function getStyle - Get live runtime value of an element's css style
 * http://robertnyman.com/2006/04/24/get-the-rendered-style-of-an-element
 *
 * @param {HTMLElement} element
 * @param {string} styleName - Name of the CSS style to get,  in CSS form (i.e. 'font-size', not 'fontSize')
**/
let getStyle = ( element, styleName ) => {

  var styleValue = '';
  if ( document.defaultView && document.defaultView.getComputedStyle ) {
    styleValue = document.defaultView.getComputedStyle( element, '' ).getPropertyValue( styleName );
  } else if ( element.currentStyle ) {
    // eslint-disable-next-line no-useless-escape
    styleName = styleName.replace( /\-(\w)/g, function( strMatch, p1 ) {
      return p1.toUpperCase();
    });
    styleValue = element.currentStyle[styleName];
  }
  return styleValue;
};

export { getStyle };