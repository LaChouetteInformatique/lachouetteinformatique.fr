/**
 * scroll-top-button
 * 
 * @since   1.0.0
 * @package Norma Wordpress Theme
 * @subpackage WP scroll top button
 *    require : font-awesome,
 *    content :
 *      footer.php
 *      sass/components/_scroll-top-button.sass,
 */

// Configuration
// Amount of pixels the user has to scroll down on the page for scrollTopButton to appear 
let scrolltopValue = 500;

let scrollTopButton = document.getElementById("scroll-top-button");

// Initialisation :
// By default a scrollTopButton without animation is shown for users who disabled JS
// That's why we need to initialise scrollTopButton visibility and opacity
scrollTopButton.style.visibility = "hidden";
scrollTopButton.style.opacity = 0;

// When the user scrolls down some px from the top of the document, show the button
window.onscroll = function() { 
  if (document.body.scrollTop > scrolltopValue || document.documentElement.scrollTop > scrolltopValue) {
    scrollTopButton.classList.add("visible");
    // visibility: visible !important;
    // opacity: 0.5 !important;
  } else {
    scrollTopButton.classList.remove("visible");
  }
};

    