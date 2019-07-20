# lachouetteinformatique.fr website

This is the source code of my web site.

## License

* **Logo —**  Copyright (c) 2019 La Chouette Informatique

* **Icons —** Embedded icons (html inline SVG) are modified version of [Fontawesome free icons](https://fontawesome.com/license/free) and are under [CC BY 4.0 Licence](https://creativecommons.org/licenses/by/4.0/)

* **Fonts —** This project use third party fonts :
    - **Courgette Font —** SIL Open Font License, Version 1.1 (https://scripts.sil.org/OFL)

* **Other —** All the other stuff, such as code, images, CSS inline SVG and text are under [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/deed.en) Public Domain Dedication


## Prerequisites

- [node.js](https://nodejs.org/en/)
- [ngrok](https://ngrok.com/) [*OPTIONAL*]

## Installation

```sh
git clone https://github.com/LaChouetteInformatique/lachouetteinformatique.fr
cd lachouetteinformatique.fr
npm install
```

## Configuration

[*OPTIONAL*] If you want to use ngrok, you need to edit the last script named "ngrok" in package.json, and replace current directory with your ngrok installation path

Run
---

* developpement:
```sh
npm run dev
```
* production:
```sh
npm run dev
```
* using ngrok: *(with prior configuration step)*
```sh
npm run ngrok
```