/**
 * La Chouette Informatique edit from
 * https://www.npmjs.com/package/email-scramble
 * 
 * ## LICENSE (ISC)
    Copyright (c) 2016, Thibaud Colas

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted, provided that the above
    copyright notice and this permission notice appear in all copies.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
    WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
    MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
    ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
    WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
    ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
    OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

  // Largely taken from https://github.com/mathiasbynens/rot.
  let rot = (charRot, numRot, str) => {
    const numbers = '0123456789';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const regexNumber = /[0-9]/;
    const regexLowercase = /[a-z]/;
    const regexUppercase = /[A-Z]/;

    str = String(str);

    if (charRot < 0) {
      charRot += 26;
    }
    if (numRot < 0) {
      numRot += 10;
    }
    var length = str.length; // note: no need to account for astral symbols
    var index = -1;
    var result = '';
    var character;
    var currentPosition;
    var shiftedPosition;
    while (++index < length) {
      character = str.charAt(index);
      if (regexNumber.test(character)) {
        currentPosition = numbers.indexOf(character);
        shiftedPosition = (currentPosition + numRot) % 10;
        result += numbers.charAt(shiftedPosition);
      } else if (regexLowercase.test(character)) {
        currentPosition = lowercase.indexOf(character);
        shiftedPosition = (currentPosition + charRot) % 26;
        result += lowercase.charAt(shiftedPosition);
      } else if (regexUppercase.test(character)) {
        currentPosition = uppercase.indexOf(character);
        shiftedPosition = (currentPosition + charRot) % 26;
        result += uppercase.charAt(shiftedPosition);
      } else {
        result += character;
      }
    }
    return result;
  };

  let scramble = (str) => {
    return rot(13, 5, str);
  };

export {scramble};