/**-----------------------------------------------
 * Sticky Header with vanilla JS custom smooth scroll adapted from
 * https://css-tricks.com/snippets/jquery/smooth-scrolling/#article-header-id-1
 * ---------------------------------------------*/

import {getElementAbsPos} from './getElementAbsPos';

const screenHeightBreakPoint = 549; // minimum screen height for the header to be sticky

let stickyHeader = (function() {

    let header, headerClone, stickyOffset, main, headerIsSticky;

    let stickyHeader = () => {
        headerIsSticky = (screenHeightBreakPoint < window.innerHeight);
        // Add the sticky class to the header when we reach its scroll position
        if ( headerIsSticky && window.pageYOffset > stickyOffset ) {
            header.classList.add( 'sticky' );
            main.style.paddingTop = header.offsetHeight + 'px';
        } else { // Remove "sticky" when we leave the scroll position
            header.classList.remove( 'sticky' );
            main.style.paddingTop = '0';
        }
    }

    /**-----------------------------------------------
     * CUSTOM SMOOTH SCROLL
     * ---------------------------------------------*/
    let customSmoothScroll = () => {

        // Clone the Header to be able to calculate sticky Height
        // (may vary with screen dimensions and pageYOffset)
        // TODO: find some less ugly hack ? :D
        headerClone = header.cloneNode( true );
        headerClone.removeAttribute( 'id' );
        headerClone.setAttribute( 'aria-hidden', 'true' );
        headerClone.style.visibility = 'hidden';
        headerClone.classList.add( 'sticky' );
        document.body.appendChild( headerClone );

        // Select all links containing hashes
        // const fullList = document.querySelectorAll( 'a[href*="#"]' );
        // Select all links starting with hashes -> internal links only
        const fullList = document.querySelectorAll( 'a[href^="#"]' );

        // Filter links that don't actually link to anything
        [ ...fullList ].filter( ( value ) => {

            if ( value.href.endsWith( '#' ) || value.href.endsWith( '#0' ) ) {
                return false;
            }
            else {
                return true;
            }
        })
        // And set the destination for each link by overriding their clic event default behavior
        .forEach( ( item ) => {
            // Attach event to internal links only
            // if ( location.pathname.replace( /^\//, '' ) == item.pathname.replace( /^\//, '' )
            // 	&& location.hostname == item.hostname ) {
                item.addEventListener( 'click', function( event ) {
                    // Figure out element to scroll to
                    let target = document.querySelectorAll( this.hash );

                    if ( ! target.length ) {
                        target = document.querySelectorAll( '[name=' + this.hash.slice( 1 ) + ']' );
                        //console.log("target :", target);
                    }

                    // Does a scroll target exist?
                    if ( target.length ) {

                        // Only prevent default if animation is actually gonna happen
                        event.preventDefault();

                        let targetElem = document.querySelector( this.hash );

                        // Calculate where the link should scroll us without taking care of the sticky header offset
                        let destination = getElementAbsPos( targetElem ).top + 2;

                        //console.log("destination", destination, "\npageYOffset", pageYOffset);

                        // If the header is sticky, update the destination
                        if ( headerIsSticky ) {

                            if ( pageYOffset < stickyOffset ) {
                                destination = destination - header.offsetHeight;
                            } else {
                                destination = destination - headerClone.offsetHeight;

                                //console.log("destination - headerClone.offsetHeight", destination);
                                if ( destination <= stickyOffset + 10 ) {
                                    destination = 0;
                                }
                            }

                            // console.log(
                            //     targetElem,
                            //     "\nheader.offsetHeight", header.offsetHeight,
                            //     "\nheaderClone.offsetHeight",headerClone.offsetHeight,
                            //     "\nabsPos(targetElem).top", getElementAbsPos(targetElem).top,
                            //     "\ndestination", destination);
                        }

                        window.scrollTo( pageXOffset, destination );
                    }
                });
            // }
        });
    };
  
    return {
      init : function () {
        try {
            header = document.querySelector( 'body>header'/*+'>.nav-menu'*/ );
            stickyOffset = header.offsetTop;
            main = document.querySelector( 'body>main' );
            stickyHeader();

            window.onscroll = function() {
                stickyHeader();
            };

            window.onresize = function() {
                stickyHeader();
            };

            customSmoothScroll();

        } catch (error) {
          console.error(error);
        }
      }
    };
  })();
  
  export { stickyHeader };