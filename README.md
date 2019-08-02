# [lachouetteinformatique.fr website](https://lachouetteinformatique.fr)

This is the source code of my [web site](https://lachouetteinformatique.fr).

## License

* Embedded icons (inline SVG) are modified version of fontawesome icons (https://fontawesome.com/license/free) and are under CC BY 4.0 Licence (https://creativecommons.org/licenses/by/4.0/)

* All the rest is under [CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/deed.en) Public Domain Dedication


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

[*OPTIONAL*] If you want to use ngrok, you need to edit the last script named "[ngrok](https://github.com/LaChouetteInformatique/lachouetteinformatique.fr/blob/a7ced51e2f30c84383d8e4f3d87556991f6e057d/package.json#L54)" in package.json, and replace the current directory with your ngrok installation path

Run
---

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