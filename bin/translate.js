#!/usr/bin/env node
"use strict";

var yandex = require("../lib/linguist"),
    cliArgs = require("command-line-args"),
    dope = require("console-dope"),
    path = require("path"),
    fs = require("fs");

function logError(msg){
    dope.red.log(msg);
}

try {
    var options = cliArgs([
        { name: "from", alias: "f", value: "en" },
        { name: "to", alias: "t", value: "en" },
        { name: "text", type: Array, defaultOption: true },
        { name: "input", alias: "i" },
        { name: "output", alias: "o" },
        { name: "help", type: Boolean, alias: "h" }
    ]).parse();
} catch(err){
    logError("Error: " + err.message);
    process.exit(1);
}

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
            dope.log("translating: " + text);
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

if (options.help){
    dope.log(usage);
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
    dope.log(usage);
}
