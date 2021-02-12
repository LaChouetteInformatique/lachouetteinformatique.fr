/**-----------------------------------------------
 * ACCORDIONS
 *  Set mouse click events on accordions to toggle
 *  visibility of their respective panel
 * 
 * HTML to make accordions :
 * -------------------------
 * Option 1: Panel ID is given in accordion's data-attribute
    <button|a class="accordion" data-panel-id="panel-1">Open / Close Accordion</button|a>
    <any id="panel-1" class="panel">
        <button class="close-button">Optional Button</button>
        panel content
    </any>
 * 
 * Option 2: panel is a child of accordion
    <any class="accordion">
        Open / Close Accordion
        <any>
            <any class="panel">
                <button class="close-button">Optional Button</button>
                panel content
            </any>
        </any>
    </any>
 *
 * Option 3: panel is accordion's next sibling element
    <button|a class="accordion">Open / Close Accordion</button|a>
    <any class="panel">
        <button class="close-button">Optional Button</button>
        panel content
    </any>
 *
 * Option 4: panel is the next sibling of accordion's parent element
    <any>
        <button|a class="accordion">Open / Close Accordion</button|a>
    </any>
    <any class="panel">
        <button class="close-button">Optional Button</button>
        panel content
    </any>
 * ---------------------------------------------*/

import {slideUp, slideDown} from './slideEffect';

let accordion = (function() {

    // Find accordion's panel in the DOM and return it, or null if the panel could not be found
    let getPanel = (accordion) => {
        // Option 1: panel is given as accordion's data-attribute
        // let panelId = accordion.dataset.panelId;
        let panelId = accordion.getAttribute("data-panel-id");
        let panel;
        
        if (panelId) {
            panel = document.getElementById(panelId);
        }
        // Option 2: panel is a child of accordion
        if (!panel) {
            panel = accordion.querySelector(".panel");
        }
        // Option 3: panel is accordion's next sibling element
        if (!panel) {
            panel = accordion.nextElementSibling;
        }
        // Option 4: panel is the next sibling of accordion's parent element
        if (!panel || !panel.classList.contains("panel")) {
            panel = accordion.parentElement.nextElementSibling;
        }
        // Warnings
        if (!panel.classList.contains("panel")) {
            console.warn("Panel of", accordion, "doesn't have the \"panel\" class");
        }
        // Errors
        if (!panel) {
            console.error("Could not  found Panel of", accordion);
            return null;
        }
        return panel;
    }

    // Toogle panel on clic event
    let tooglePanel = (e, panel, accordion) => {
        if(accordion.classList.contains("active")){
            closePanel(e, panel, accordion);
        }
        else {
            openPanel(e, panel, accordion);
        }
    };

    // Open panel on clic event
    let openPanel = function(e, panel, accordion) {
        accordion.classList.add("active");
        slideDown(panel);
    };

    // Close panel on clic event
    let closePanel = (e, panel, accordion) => {
        slideUp(panel);
        panel.addEventListener("slide-up-end", function(e){
            accordion.classList.remove("active");
        }, { once : true });
    }
    
    return {
        init : () => {
            try {

                let accordions = document.getElementsByClassName("accordion");

                for (let i = 0; i < accordions.length; i++) {

                    let panel = getPanel(accordions[i]);
        
                    accordions[i].addEventListener("click", function(e){
                        tooglePanel(e, panel, accordions[i]);
                    });
        
                    let closeButton = panel.querySelector(".close-button");
                    if (closeButton) {
                        closeButton.addEventListener("click", function(e){
                            closePanel(e, panel, accordions[i]);
                        });
                    }
                }
        
            } catch (error) {
                console.error(error);
            }
        }
    };
})();

export { accordion };