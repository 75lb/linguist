#linguist

##Command line
###Install
```sh
$ npm install -g linguist
$ translate --from en --to it "hello, how are you" "this is a nice cat"
ciao, come stai
questo è un bel gatto
```

###Usage
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
```sh
$ npm install linguist --save
```

```js
var linguist = require("linguist");

linguist.translate("hello, how are you", "en", "it", function(translation){
    console.log(translation);
});
```
