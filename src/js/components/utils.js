import {config} from "./config";

let utils = (function() {

    return {
        isDomElement : function(element) {
            return !!(element && element.nodeType === 1);
        },

        validDOMElementError : (elementName) => {
            throw new Error(`${elementName} must be a valid DOM element`);
        },

        /**
         * Format a data attribute string as : "data-" + config.DATA_ATTRIBUTE_PREFIX constant if it exist + "-" + given argument, that can be used to set and get data attributes on DOM HTMLElements
         * @param {string} attribute
         * @returns the complete data attribute string
         */
        formatAttribute : function(attribute) {
            return `data-${(config.DATA_ATTRIBUTE_PREFIX!="")? config.DATA_ATTRIBUTE_PREFIX+'-': ''}${attribute}`;
        }
    };
})()

export {utils};