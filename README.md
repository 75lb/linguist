[![view on npm](https://badgen.net/npm/v/linguist)](https://www.npmjs.org/package/linguist)
[![npm module downloads](https://badgen.net/npm/dt/linguist)](https://www.npmjs.org/package/linguist)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# linguist

Translate strings or JSON (e.g. internationalisation resource files) from Node.js or the command line. 

## Command line
### Install

```sh
$ npm install -g linguist
```

### Usage

```
$ translate [--from <string>] [--to <string>] <text> <text> ...
$ translate [--from <string>] [--to <string>] --input <filename> --output <filename>

-f, --from        The language to translate from (default: 'en')
-t, --to          The language to translate to (default: 'en')
-i, --input       A valid JSON file to translate
-o, --output      The output JSON file with input JSON values (but not keys) translated
-h, --help        Print usage instructions
```

#### translate text at the command line

```sh
$ translate --from en --to it "hello, how are you" "this is a nice cat"
ciao, come stai
questo è un bel gatto
```

```sh
$ translate "I would like the rabbit please" -t cs
Já bych králíka prosím
```

#### translate the values in a json file

An input file like this:

```json
{
    "content": {
        "Terms": "Terms and Conditions",
        "More": {
            "Account": "Some Account",
            "Products": {
                "One": "Some Product"
            }
        }
    }
}
```

...and this command:

```sh
$ translate --input input.json --output output.json --from en --to it
```

...would produce this output file: 

```json
{
    "content": {
        "Terms": "Termini e Condizioni",
        "More": {
            "Account": "Alcuni Account",
            "Products": {
                "One": "Alcune Prodotto"
            }
        }
    }
}
```

## Library
### Install

```sh
$ npm install linguist --save
```

### Usage

```js
var linguist = require("linguist");

linguist.translate("hello, how are you", "en", "it", function(translation){
    console.log(translation);
});
```

## Supported Languages

<table>
    <tr>
        <th>Language</th><th colspan=4>Directions</th>
    </tr>
    <tr>
        <td>
            ar (Arabic)<br>
            az (Azerbaijani)<br>
            be (Belarusian)<br>
            bg (Bulgarian)<br>
            ca (Catalan)<br>
            cs (Czech)<br>
            da (Danish)<br>
            de (German)<br>
            el (Greek)<br>
            en (English)<br>
            es (Spanish)<br>
            et (Estonian)<br>
            fi (Finnish)<br>
            fr (French)<br>
            he (Hebrew)<br>
            hr (Croatian)<br>
            hu (Hungarian)<br>
            hy (Armenian)<br>
            it (Italian)<br>
            ka (Georgian)<br>
            lt (Lithuanian)<br>
            lv (Latvian)<br>
            mk (Macedonian)<br>
            nl (Dutch)<br>
            no (Norwegian)<br>
            pl (Polish)<br>
            pt (Portuguese)<br>
            ro (Romanian)<br>
            ru (Russian)<br>
            sk (Slovak)<br>
            sl (Slovenian)<br>
            sq (Albanian)<br>
            sr (Serbian)<br>
            sv (Swedish)<br>
            tr (Turkish)<br>
            uk (Ukrainian)<br>
        </td>
        <td>
            az-ru<br>
            be-bg<br>
            be-cs<br>
            be-de<br>
            be-en<br>
            be-es<br>
            be-fr<br>
            be-it<br>
            be-pl<br>
            be-ro<br>
            be-ru<br>
            be-sr<br>
            be-tr<br>
            bg-be<br>
            bg-ru<br>
            bg-uk<br>
            ca-en<br>
            ca-ru<br>
            cs-be<br>
            cs-en<br>
            cs-ru<br>
            cs-uk<br>
            da-en<br>
            da-ru<br>
            de-be<br>
            de-en<br>
            de-es<br>
            de-fr<br>
            de-it<br>
            de-ru<br>
            de-tr<br>
            de-uk<br>
            el-en<br>
            el-ru<br>
            en-be<br>
            en-ca<br>
            en-cs<br>
            en-da<br>
            en-de<br>
            en-el<br>
            en-es<br>
        </td>
        <td>
            en-et<br>
            en-fi<br>
            en-fr<br>
            en-hu<br>
            en-it<br>
            en-lt<br>
            en-lv<br>
            en-mk<br>
            en-nl<br>
            en-no<br>
            en-pt<br>
            en-ru<br>
            en-sk<br>
            en-sl<br>
            en-sq<br>
            en-sv<br>
            en-tr<br>
            en-uk<br>
            es-be<br>
            es-de<br>
            es-en<br>
            es-ru<br>
            es-uk<br>
            et-en<br>
            et-ru<br>
            fi-en<br>
            fi-ru<br>
            fr-be<br>
            fr-de<br>
            fr-en<br>
            fr-ru<br>
            fr-uk<br>
            hr-ru<br>
            hu-en<br>
            hu-ru<br>
            hy-ru<br>
            it-be<br>
            it-de<br>
            it-en<br>
            it-ru<br>
            it-uk<br>
        </td>
        <td>
            lt-en<br>
            lt-ru<br>
            lv-en<br>
            lv-ru<br>
            mk-en<br>
            mk-ru<br>
            nl-en<br>
            nl-ru<br>
            no-en<br>
            no-ru<br>
            pl-be<br>
            pl-ru<br>
            pl-uk<br>
            pt-en<br>
            pt-ru<br>
            ro-be<br>
            ro-ru<br>
            ro-uk<br>
            ru-az<br>
            ru-be<br>
            ru-bg<br>
            ru-ca<br>
            ru-cs<br>
            ru-da<br>
            ru-de<br>
            ru-el<br>
            ru-en<br>
            ru-es<br>
            ru-et<br>
            ru-fi<br>
            ru-fr<br>
            ru-hr<br>
            ru-hu<br>
            ru-hy<br>
            ru-it<br>
            ru-lt<br>
            ru-lv<br>
            ru-mk<br>
            ru-nl<br>
            ru-no<br>
            ru-pl<br>
        </td>
        <td>
            ru-pt<br>
            ru-ro<br>
            ru-sk<br>
            ru-sl<br>
            ru-sq<br>
            ru-sr<br>
            ru-sv<br>
            ru-tr<br>
            ru-uk<br>
            sk-en<br>
            sk-ru<br>
            sl-en<br>
            sl-ru<br>
            sq-en<br>
            sq-ru<br>
            sr-be<br>
            sr-ru<br>
            sr-uk<br>
            sv-en<br>
            sv-ru<br>
            tr-be<br>
            tr-de<br>
            tr-en<br>
            tr-ru<br>
            tr-uk<br>
            uk-bg<br>
            uk-cs<br>
            uk-de<br>
            uk-en<br>
            uk-es<br>
            uk-fr<br>
            uk-it<br>
            uk-pl<br>
            uk-ro<br>
            uk-ru<br>
            uk-sr<br>
            uk-tr<br>
        </td>
    </tr>
</table>

[Yandex terms of use](http://legal.yandex.com/translate_api/)

* * *

&copy; 2014-21 Lloyd Brookes \<75pound@gmail.com\>.

Tested by [test-runner](https://github.com/test-runner-js/test-runner).
