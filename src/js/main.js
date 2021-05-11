// eslint-disable-next-line no-unused-vars
import style from '../scss/style.scss';
import {slidingPanels} from './components/slidingPanels';
import {stickyHeader} from './components/stickyHeader';
import {decodeScrambledLinks} from './components/decodeScrambledLinks';
import {scrollTopButton} from './components/scrollTopButton';


document.addEventListener( 'DOMContentLoaded', function( /*event*/ ) {

     decodeScrambledLinks.init();
	slidingPanels.init();
	stickyHeader.init();
     scrollTopButton.init();

	/**-----------------------------------------------
     * iframe initialization -> umap integration
     *
     * Map hidden by default, shown when JS is enable
     * ---------------------------------------------*/
	document.querySelector( '#zone-intervention iframe' ).style.display = 'block';

});
