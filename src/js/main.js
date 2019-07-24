import style from '../scss/style.scss';
import utils from './modules/lachouette-utils';


document.addEventListener("DOMContentLoaded", function(event) {

    let header = document.querySelector('body>header'/*+'>.nav-menu'*/);
    let stickyOffset = header.offsetTop;
    let main = document.querySelector("body>main");

    // Clone the Header to be able to calculate sticky Height
    // (may vary with screen dimensions and pageYOffset)
    // TODO: find some less ugly hack ? :D
    let headerClone = header.cloneNode(true);
    headerClone.removeAttribute( 'id' );
    headerClone.setAttribute( 'aria-hidden', 'true' );
    headerClone.style.visibility = "hidden";
    headerClone.classList.add("sticky");
    document.body.appendChild(headerClone);
  

    /**-----------------------------------------------
     * Sticky Header
     * ---------------------------------------------*/

    function isHeaderSticky () {
        //If windows (height) is big enough, render the header sticky
        if (window.innerHeight > 600) return true;
        else return false;
        //return true;
    }
    
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
     * CUSTOM SMOOTH SCROLL
     * 
     * adaptation from https://css-tricks.com/snippets/jquery/smooth-scrolling/#article-header-id-1 without jquery
     * ---------------------------------------------*/

    // console.log(
    // "Jquery :",
    // // Select all links with hashes
    // $('a[href*="#"]')
    // // Remove links that don't actually link to anything
    // .not('[href="#"]')
    // .not('[href="#0"]')
    // );

    const fullList = document.querySelectorAll('a[href*="#"]');

    let filtered = [...fullList].filter((value /*, index, arr*/) => {
        // console.log(value.href);
        if(value.href.endsWith("#") || value.href.endsWith("#0") ) return false;
        else return true;
    });

    filtered.forEach( (item, index) => {
        item.addEventListener( 'click', function(event){
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == 
                    this.pathname.replace(/^\//, '') 
                    && location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                //let target = $(this.hash);
                let target = document.querySelectorAll(this.hash);
                //console.log("target :", target);          

                //target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if(!target.length) {
                    //target = $('[name=' + this.hash.slice(1) + ']');
                    target = document.querySelectorAll('[name=' + this.hash.slice(1) + ']');
                    //console.log("target :", target);
                }               

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
        })
    });


    /**-----------------------------------------------
     * TOGGLE BUTTONS
     *   Section Services - Prise de contrôle à distance
     * 
     * Hide/Show some content on buttons clicks
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

    toogleButton.addEventListener("click", () => {
        toggleContentFunction();
    })
    closeButton.addEventListener("click", () => {
        toggleContentFunction();
    })

    let updateContentHeight = function() {
        if ( toogleContent.style.maxHeight ){
        toogleContent.style.maxHeight = toogleContent.scrollHeight + "px";
        }
    }

    /**-----------------------------------------------
     * EVENTS BIDING
     * ---------------------------------------------*/
    // When the user scrolls or resize the page
    window.onscroll = function() {stickyHeader()};
    window.onresize = function() {
        stickyHeader();
        updateContentHeight();
    };

    /**-----------------------------------------------
     * iframe initialization -> umap integration
     * 
     * Map hidden by default, shown when JS is enable
     * ---------------------------------------------*/
    document.querySelector('#zone-intervention iframe').style.display = "block";


});
