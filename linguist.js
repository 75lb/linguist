#!/usr/bin/env node
"use strict";

var yandex = require("./lib/yandex"),
    Thing = require("nature").Thing,
    path = require("path"),
    fs = require("fs"),
    l = console.log;

var options = new Thing()
    .define({ name: "from", type: "string", alias: "f" })
    .define({ name: "to", type: "string", alias: "t" })
    .define({ name: "text", type: Array, defaultOption: true })
    .set(process.argv);

if (options.valid){
    if (options.from || options.to){
        yandex.translate(options.text, options.from, options.to, function(translation){
            console.log(translation.text.join("\n"));
        });
    } else {
        l("Invalid");
    }
} else {
    l("Invalid");
    l(options.validationMessages);
}

// var input = require(path.join(process.cwd(), process.argv[2])),
//     output = path.join(process.cwd(), process.argv[3]);
// 
// function translateObject(obj){
//     Object.keys(obj).forEach(function(word){
//         var text = obj[word];
//         if(typeof text === "string"){
//             obj[word] = "translating...";
//             yandex.translate(text, "en", "it", function(translation){
//                 obj[word] = translation.text[0];
//                 fs.writeFileSync(output, JSON.stringify(input, null, "    "));
//             });
//         } else {
//             translateObject(obj[word]);
//         }
//     });
// }
// 
// translateObject(input);
