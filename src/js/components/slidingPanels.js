/**-----------------------------------------------
 * SLIDING PANELS
 *  Create SlidingPanels with open, close and toggle buttons from HTML markup
 *
 * How To use :
 * -----------
 * import {slidingPanels} from "path to slidingPanels.js";
 * 
 * document.addEventListener( 'DOMContentLoaded', function() {
 *      slidingPanels.init();
 * });
 * 
 * HTML to make sliding panels :
 * ----------------------------
 * In config.js, if :
 * _PANELS_SELECTOR = ".js-sliding-panel";
 * _DATA_ATTRIBUTE_PREFIX = "lci";
 * Then :
 * - Element with the class .js-sliding-panel will be detected as sliding panel
 * - Elements with data-lci-button-type = "open", "close" or "toggle" will become trigger buttons for the panels
 * AND for each button :
 *       - the panel id must be given as data-lci-panel-id attritube
 *   OR  - the panel selector must be given as data-lci-panel-selector attribute
 *   OR  - the panel location respective to the button must be given as data-lci-panel-location with value :
 *              "child" if the panel is a child of panelButton
 *              "parent" if the panel is an ancestor of panelButton
 *              "sibling" if the panel is button's next sibling element or one of it's descendants
 * ---------------------------------------------*/

import {SlidingPanel, SlidingPanelButton} from './SlidingPanel.js';
import {utils} from "./utils";
import {config} from "./config";

// Local debug (this file)
let DEBUG = false;

const isDebug = (() => {
    return (DEBUG || config.DEBUG);
})();

/**
 * Look in the DOM for the correct sliding panel element to associate with a given panelbutton element and return it, or null if the panel could not be found.
 * @param {HTMLElement} panelButton 
 * @returns {HTMLElement} a sliding panel Element or null if none was found
 */
 let getPanelElement = (panelButton) => {
    let panel = null;     
    // panel id is given as data-attribute
    let selector = panelButton.getAttribute(utils.formatAttribute("panel-id"));
    
    if(selector) {
        selector = '#'+ selector;
    }
    // OR panel selector is given as data-attribute
    else {
        selector = panelButton.getAttribute(utils.formatAttribute("panel-selector"));
    }

    if(selector) {
        panel = document.querySelector(selector);
    }
    // OR panel location is given as data-attribute AND
    else {
        let location = panelButton.getAttribute(utils.formatAttribute("panel-location"));
        switch (location) {
            // panel is a child of panelButton
            case "child":
                panel = panelButton.querySelector(config.PANELS_SELECTOR);
                break;
            // OR panel is an ancestor of panelButton
            case "parent":
                panel = panelButton.closest(config.PANELS_SELECTOR);
                break;
            // OR panel is panelButton's next sibling element
            // or one of it's descendants
            case "sibling":
                panel = panelButton.nextElementSibling;
                if (!panel){
                    panel = panelButton.nextElementSibling.querySelector(config.PANELS_SELECTOR);
                }
                break;
            default:
                break;
        }
    }
    return panel;
}

/**
 * Instanciate an object with an init() method that will :
 * - find all sliding panel elements in the DOM and create a SlindingPanel object for each one
 * - find all sliding panel button elements in the DOM
 * - find the correct SlidingPanel object to associate with each sliding panel button element
 * - create a SlidingPanelButton object for each sliding panel button element
 */
let slidingPanels = (function() {
    return {
        init : () => {
            try {
                let panelElements = document.querySelectorAll(config.PANELS_SELECTOR);
                let panelObjects = [];
                if(isDebug){
                    console.log("panelElemens", panelElements);
                }

                for (let i = 0; i < panelElements.length; i++) {
                    let state = panelElements[i].getAttribute(utils.formatAttribute("data-state"));
                    panelObjects[i] = new SlidingPanel(panelElements[i], state);
                }
                if(isDebug){
                    console.log("panelObjects", panelObjects);
                }

                let panelButtonElements = document.querySelectorAll(`[${utils.formatAttribute("button-type")}]`);
                if(isDebug){
                    console.log("panelButtonElements", panelButtonElements);
                }

                let panelButtonObjects = [];

                for (let i = 0; i < panelButtonElements.length; i++) {
                    try {
                        let panelElement = getPanelElement(panelButtonElements[i]);
                        if(panelElement) {
                            let panelObjectUid = panelElement.getAttribute(utils.formatAttribute("panel-uid"));
                            let panelObject = panelObjects[panelObjectUid];
                            let type = panelButtonElements[i].getAttribute(utils.formatAttribute("button-type"));
                            panelButtonObjects[i] = new SlidingPanelButton(panelButtonElements[i], panelObject, type? type : null);
                        }
                        else {
                            throw new Error(`No panel could be found for panelButtonElements[${i}].`);
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }
                if(isDebug){
                    console.log("panelButtonObjects", panelButtonObjects);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };
})();

export { slidingPanels };