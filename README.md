# [lachouetteinformatique.fr website](https://lachouetteinformatique.fr)

This is the source code of my [web site](https://lachouetteinformatique.fr).

## License

* Code is under [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/deed.en) Public Domain Dedication

* Font [Courgette](https://fonts.google.com/specimen/Courgette) is under [SIL Open Font License, Version 1.1](https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL)

* Embedded icons (inline SVG) are modified version of [fontawesome](https://fontawesome.com/license/free) icons  and are under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) Licence

* Content (text, images, videos, etc.) are under [CC BY SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/deed.en)

## Prerequisites

* [node.js](https://nodejs.org/en/)
* [*OPTIONAL*] [ngrok](https://ngrok.com/)

## Installation

```sh
git clone https://github.com/LaChouetteInformatique/lachouetteinformatique.fr.git
cd lachouetteinformatique.fr
npm install
```

## [*OPTIONAL*] ngrok configuration

If you want to use ngrok, you need to edit the last script named `ngrok` in package.json, and replace the current directory with your ngrok installation path

### Run

* developpement:

```sh
npm run dev
```

* production:

```sh
npm run build
```

* using ngrok: *(with prior configuration step)*

```sh
npm run ngrok
```
