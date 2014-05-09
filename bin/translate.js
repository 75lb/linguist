#!/usr/bin/env node
"use strict";

var yandex = require("./lib/yandex"),
    Model = require("nature").Model,
    w = require("wodge"),
    path = require("path"),
    fs = require("fs"),
    l = console.log;

function logError(msg){
    l(w.red(msg));
}

var options = new Model()
    .on("error", function(err){
        logError("Error: " + err.message);
        process.exit(1);
    })
    .define({ name: "from", type: "string", alias: "f", value: "en" })
    .define({ name: "to", type: "string", alias: "t", value: "en" })
    .define({ name: "text", type: Array, defaultOption: true })
    .define({ name: "input", type: "string", alias: "i" })
    .define({ name: "output", type: "string", alias: "o" })
    .define({ name: "help", type: "boolean", alias: "h" })
    .set(process.argv);

var usage = "Usage: \n\
$ translate [--from <string>] [--to <string>] <text> <text> ...\n\
$ translate [--from <string>] [--to <string>] --input <filename> --output <filename>\n\
\n\
-f, --from        The language to translate from (default: 'en')\n\
-t, --to          The language to translate to (default: 'en')\n\
-i, --input       A valid JSON file to translate\n\
-o, --output      The output JSON file with input JSON values (but not keys) translated\n\
-h, --help        Print usage instructions\n\
\n\
for more information, visit https://github.com/75lb/linguist\n";

function translateObject(obj){
    Object.keys(obj).forEach(function(word){
        var text = obj[word];
        if(typeof text === "string"){
            l("translating: " + text);
            yandex.translate(text, options.from, options.to, function(translation){
                if  (translation.code === 200){
                    obj[word] = translation.text[0];
                    fs.writeFileSync(output, JSON.stringify(input, null, "    "));
                } else {
                    logError(translation.message);
                    process.exit(1);
                }
            });
        } else {
            translateObject(obj[word]);
        }
    });
}

if (options.valid){
    if (options.help){
        l(usage);
    } else if (options.input && options.output && options.from && options.to){
        var input = require(path.join(process.cwd(), options.input)),
            output = path.join(process.cwd(), options.output);

        translateObject(input);
    } else if (options.from && options.to && options.text){
        yandex.translate(options.text, options.from, options.to, function(translation){
            if  (translation.code === 200){
                console.log(translation.text.join("\n"));
            } else {
                logError(translation.message);
            }
        });
    } else {
        logError("Invalid usage.. ");
        l(usage);
    }
} else {
    logError("Some values were invalid");
    logError(optionSet.validationMessages.toString());
    l(usage);
}
