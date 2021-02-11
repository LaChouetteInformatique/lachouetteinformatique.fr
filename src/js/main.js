// eslint-disable-next-line no-unused-vars
import style from '../scss/style.scss';
import {accordion} from './utils/accordions';
import {stickyHeader} from './utils/stickyHeader';
import {decodeScrambledLinks} from './utils/decodeScrambledLinks';

document.addEventListener( 'DOMContentLoaded', function( /*event*/ ) {

     decodeScrambledLinks.init();
	accordion.init();
	stickyHeader.init();

	/**-----------------------------------------------
     * iframe initialization -> umap integration
     *
     * Map hidden by default, shown when JS is enable
     * ---------------------------------------------*/
	document.querySelector( '#zone-intervention iframe' ).style.display = 'block';

});
