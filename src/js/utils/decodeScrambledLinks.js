import {scramble} from '../vendor/email-scramble';

let decodeScrambledLinks = (function() {

    return {
        init : () => {
            try {
                let tel = "tel:+33663349772";
                let mail = "contact@truc.fr";
                let encodedTel = scramble(tel);
                let encodedEmail = scramble(mail);
                console.log(encodedEmail, scramble(encodedEmail));
                console.log(encodedTel, scramble(encodedTel));

                let scrambledLinks = document.querySelectorAll('a.scrambled');

                for(let i = 0; i < scrambledLinks.length; i++) {
                    let link = scrambledLinks[i];
                    link.addEventListener("click", function(e){
                        e.preventDefault();
                        window.location = scramble(link.getAttribute("data-href"));
                    });
                }

            } catch (error) {
                console.error(error);
            }
        }
    };
})();

export { decodeScrambledLinks };