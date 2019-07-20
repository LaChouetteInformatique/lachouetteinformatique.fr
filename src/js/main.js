import style from '../scss/style.scss';
import utils from './modules/lachouette-utils';


document.addEventListener("DOMContentLoaded", function(event) {
    // https://developer.mozilla.org/fr/docs/Web/Events/DOMContentLoaded
    
    // (function(){})();   

    // Get current URL : https://stackoverflow.com/a/20746566/9251608
    // console.log(window.location);
    // console.log(window.location.protocol + '//' + window.location.hostname);

    let header = document.querySelector('body>header'/*+'>.nav-menu'*/);
    let stickyOffset = header.offsetTop;
    let main = document.querySelector("body>main");

    // Clone the Header to be able to calculate sticky Height
    // (may vary with screen dimensions and pageYOffset)
    let headerClone = header.cloneNode(true);
    headerClone.removeAttribute( 'id' );
    headerClone.setAttribute( 'aria-hidden', 'true' );
    headerClone.style.visibility = "hidden";
    headerClone.classList.add("sticky");
    document.body.appendChild(headerClone);

    /**-----------------------------------------------
     * Sticky Header Condition Checker
     * ---------------------------------------------*/
    function isHeaderSticky () {
        //If windows (height) is big enough, render the header sticky
        if (window.innerHeight > 600) return true;
        else return false;
        //return true;
    }

    /**-----------------------------------------------
     * Sticky Header with onscroll animation
     * ---------------------------------------------*/
    
    function stickyHeader() {
        
        // Add the sticky class to the header when we reach its scroll position.
        if ( isHeaderSticky() && window.pageYOffset > stickyOffset ) {
            header.classList.add("sticky");
            //main.style.paddingTop = headerClone.offsetHeight + "px";
            main.style.paddingTop = header.offsetHeight + "px";
        }
        // Remove "sticky" when we leave the scroll position
        else { 
            header.classList.remove("sticky");
            main.style.paddingTop = "0";
        }
    }

    /**-----------------------------------------------
     * Smooth Scroll
     * ---------------------------------------------*/
    if (window.jQuery) {  
        jQuery(function($) {
            // Select all links with hashes
            $('a[href*="#"]')
            // Remove links that don't actually link to anything
            .not('[href="#"]')
            .not('[href="#0"]')
            .click(function(event) {
                // On-page links
                if (
                    location.pathname.replace(/^\//, '') == 
                        this.pathname.replace(/^\//, '') 
                        && location.hostname == this.hostname
                ) {
                    // Figure out element to scroll to
                    let target = $(this.hash);
                    // console.log(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

                    // Does a scroll target exist?
                    if (target.length) {
                        // Only prevent default if animation is actually gonna happen
                        event.preventDefault();

                        //let headerHeight = header.offsetHeight;
                        let targetElem = document.querySelector( this.hash);
                        
                        // Calculate where the link should scroll us without taking care of the sticky header offset
                        let destination = utils.getElement_absPos(targetElem).top+2;

                        //console.log("destination", destination, "\npageYOffset", pageYOffset);

                        // If the header is sticky, update the destination
                        if (isHeaderSticky()) {
                            //destination = destination - header.offsetHeight;
                            
                            if (pageYOffset < stickyOffset ){
                                destination = destination - header.offsetHeight;
                            }
                            else { 
                                destination = destination - headerClone.offsetHeight;
                                //console.log("destination - headerClone.offsetHeight", destination);
                                if (destination <= stickyOffset + 10) {
                                    destination = 0;
                                }
                            }
    
                            // console.log(
                            //     targetElem,
                            //     "\nheader.offsetHeight", header.offsetHeight,
                            //     "\nheaderClone.offsetHeight",headerClone.offsetHeight,
                            //     "\nabsPos(targetElem).top", utils.getElement_absPos(targetElem).top,
                            //     "\ndestination", destination);
                        }

                        window.scrollTo( pageXOffset, destination );
                    }
                }
            });
        });
    } else {
        // jQuery is not loaded
        console.log("Jquery is not loaded, skipping smooth-scroll code");
    }


    /**-----------------------------------------------
     * Toggle Button
     *   Services - Prise de contrôle à distance
     * ---------------------------------------------*/

    let toogleButton = document.getElementById("toggle-button");
    let toogleContent = document.querySelector("#toogle-1");
    let closeButton = document.getElementById("close-button");

    let toggleContentFunction = function() {
        toogleButton.classList.toggle("toggle-active");
        if (toogleContent.style.maxHeight ){
            toogleContent.style.maxHeight = null;
            // toogleContent.style.margin = "0"
        }
        else {
            toogleContent.style.maxHeight = toogleContent.scrollHeight + "px";
            // toogleContent.style.margin = "1.4em 0"
        }
    }

    toogleButton.addEventListener("click", function() {
        toggleContentFunction();
    })
    closeButton.addEventListener("click", function() {
        toggleContentFunction();
    })

    let updateContentHeight = function() {
        if ( toogleContent.style.maxHeight ){
        toogleContent.style.maxHeight = toogleContent.scrollHeight + "px";
        }
    }

    /**-----------------------------------------------
     * EVENT BIDING
     * ---------------------------------------------*/
    // When the user scrolls or resize the page
    window.onscroll = function() {stickyHeader()};
    window.onresize = function() {
        stickyHeader();
        updateContentHeight();
    };

    /**-----------------------------------------------
     * iframe initialization
     * ---------------------------------------------*/
    
    document.querySelector('#zone-intervention iframe').style.display = "block";
});
