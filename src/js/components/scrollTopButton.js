/**
 * @package    ScrollTopButton
 * @version    1.2
 * @description hide/show the scroll-top-button depending of the window scroll position
 *
 */

let scrollTopButton = (() => {

  return {
    init : () => {
      try {

        let scrolltopbutton = document.querySelector('#scroll-top-button > a');

        let observer = new IntersectionObserver ( (entries/*, observer*/) => {
          // console.log(entries, observer);
          entries.forEach( (entry) => {
            if(entry.target.classList.contains("trigger-top") && entry.isIntersecting){
              // console.log("TOP is visible!");
              scrolltopbutton.classList.remove('js-visible');
            }

            if(entry.target.classList.contains("trigger-bottom") && !entry.isIntersecting) {
              scrolltopbutton.classList.add('js-visible');
              // console.log('bottom is not visible !');
            }
          });
        },{});

        /*let entries = */scrolltopbutton.parentElement.querySelectorAll('div[class^="trigger"]')
          .forEach( (entry) => {
            observer.observe(entry);
            // console.log(entry);
          });
    
      } catch (error) {
        console.error(error);
      }
    }
  };

})();

export {scrollTopButton};

