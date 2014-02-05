#linguist

##Command line
###Install
```sh
$ npm install -g linguist
```

###Usage
```
$ translate [--from <string>] [--to <string>] <text> <text> ...\n\
$ translate [--from <string>] [--to <string>] --input <filename> --output <filename>\n\
\n\
-f, --from        The language to translate from\n\
-t, --to          The language to translate to\n\
-i, --input       A valid JSON file to translate\n\
-o, --output      The output JSON file with input JSON values (but not keys) translated\n\
-h, --help        Print usage instructions\n\
```

####translate text at the command line
```sh
$ translate --from en --to it "hello, how are you" "this is a nice cat"
ciao, come stai
questo è un bel gatto
```

####translate the values in a json file
with an input file like this:
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

this command 
```sh
$ translate --input input.json --output output.json --from en --to it
```

will produce this output file: 
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

##Library
###Install
```sh
$ npm install linguist --save
```

###Usage
```js
var linguist = require("linguist");

linguist.translate("hello, how are you", "en", "it", function(translation){
    console.log(translation);
});
```

##Languages
<table>
    <tr>
        <th>Language</th><th>Directions</th>
    </tr>
    <tr>
        <td>
            "ar":"Arabic"
            "az":"Azerbaijani"
            "be":"Belarusian"
            "bg":"Bulgarian"
            "ca":"Catalan"
            "cs":"Czech"
            "da":"Danish"
            "de":"German"
            "el":"Greek"
            "en":"English"
            "es":"Spanish"
            "et":"Estonian"
            "fi":"Finnish"
            "fr":"French"
            "he":"Hebrew"
            "hr":"Croatian"
            "hu":"Hungarian"
            "hy":"Armenian"
            "it":"Italian"
            "ka":"Georgian"
            "lt":"Lithuanian"
            "lv":"Latvian"
            "mk":"Macedonian"
            "nl":"Dutch"
            "no":"Norwegian"
            "pl":"Polish"
            "pt":"Portuguese"
            "ro":"Romanian"
            "ru":"Russian"
            "sk":"Slovak"
            "sl":"Slovenian"
            "sq":"Albanian"
            "sr":"Serbian"
            "sv":"Swedish"
            "tr":"Turkish"
            "uk":"Ukrainian"
        </td>
        <td>Dirs</td>
    </tr>
</table>

