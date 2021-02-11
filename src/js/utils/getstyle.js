/**
 * @package     Templates.ceaec
 * @subpackage  getstyle.js
 * @version     1.0
 *
 * @copyright   -
 * @license     -
 *
 * @source      https://stackoverflow.com/a/33499348/9251608
 * 
 * @function getStyle - Get live runtime value of an element's css style
 * http://robertnyman.com/2006/04/24/get-the-rendered-style-of-an-element
 *
 * @param {Element} e - element to get computed style from
 * @param {string} styleName - Name of the CSS style to get,
 *  in CSS form (i.e. 'font-size', not 'fontSize')
**/

let getStyle = ( e, styleName ) => {

  var styleValue = '';
  if ( document.defaultView && document.defaultView.getComputedStyle ) {
    styleValue = document.defaultView.getComputedStyle( e, '' ).getPropertyValue( styleName );
  } else if ( e.currentStyle ) {
    // eslint-disable-next-line no-useless-escape
    styleName = styleName.replace( /\-(\w)/g, function( strMatch, p1 ) {
      return p1.toUpperCase();
    });
    styleValue = e.currentStyle[styleName];
  }
  return styleValue;
};

export { getStyle };