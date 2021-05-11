let config = (function() {

    // DEBUG MODE
    const _DEBUG = false;

    // The prefix that will be used to set and get data attributes on DOM HTMLElements
    const _DATA_ATTRIBUTE_PREFIX = "lci";

    // The selector used to find the sliding panels in the DOM
    const _PANELS_SELECTOR = ".js-sliding-panel";

    return {
        get DEBUG() {
            return _DEBUG;
        },
        get DATA_ATTRIBUTE_PREFIX() {
            return _DATA_ATTRIBUTE_PREFIX;
        },
        get PANELS_SELECTOR() {
            return _PANELS_SELECTOR;
        }
    };
})()

export {config};