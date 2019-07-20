// module "lachouette-utils.js"

let utils;
export default utils = {
    /***
     * Get live runtime value of an element's css style
     *   http://robertnyman.com/2006/04/24/get-the-rendered-style-of-an-element
     *     note: "styleName" is in CSS form (i.e. 'font-size', not 'fontSize')
     * https://stackoverflow.com/a/33499348/9251608
     ***/
    getStyle: function (e, styleName) {
        var styleValue = "";
        if(document.defaultView && document.defaultView.getComputedStyle) {
            styleValue = document.defaultView.getComputedStyle(e, "").getPropertyValue(styleName);
        }
        else if(e.currentStyle) {
            styleName = styleName.replace(/\-(\w)/g, function (strMatch, p1) {
                return p1.toUpperCase();
            });
            styleValue = e.currentStyle[styleName];
        }
        return styleValue;
    },

    /***
     * Get document absolute coordinates
     *  http://javascript.info/coordinates
     *  Any point on the page has coordinates:
     *    Relative to the window – elem.getBoundingClientRect().
     *    Relative to the document – elem.getBoundingClientRect()
     *      plus the current page scroll.
     */
    getElement_absPos: function (elem) {
        let box = elem.getBoundingClientRect();
        return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
        };
    }

};