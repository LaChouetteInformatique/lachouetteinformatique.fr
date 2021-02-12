// eslint-disable-next-line no-unused-vars
import style from '../scss/style.scss';
import {accordion} from './components/accordions';
import {stickyHeader} from './components/stickyHeader';
import {decodeScrambledLinks} from './components/decodeScrambledLinks';
import {scrollTopButton} from './components/scrollTopButton';

document.addEventListener( 'DOMContentLoaded', function( /*event*/ ) {

     decodeScrambledLinks.init();
	accordion.init();
	stickyHeader.init();
     scrollTopButton.init();

	/**-----------------------------------------------
     * iframe initialization -> umap integration
     *
     * Map hidden by default, shown when JS is enable
     * ---------------------------------------------*/
	document.querySelector( '#zone-intervention iframe' ).style.display = 'block';

});
