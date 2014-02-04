#!/usr/bin/env node
"use strict";

var yandex = require("./lib/yandex"),
    Thing = require("nature").Thing,
    path = require("path"),
    fs = require("fs"),
    l = console.log;

var options = new Thing()
    .define({ name: "from", type: "string", alias: "f", value: "en" })
    .define({ name: "to", type: "string", alias: "t", value: "en" })
    .define({ name: "text", type: Array, defaultOption: true })
    .define({ name: "input", type: "string", alias: "i" })
    .define({ name: "output", type: "string", alias: "o" })
    .set(process.argv);

function translateObject(obj){
    Object.keys(obj).forEach(function(word){
        var text = obj[word];
        if(typeof text === "string"){
            l("translating: " + text);
            yandex.translate(text, options.from, options.to, function(translation){
                obj[word] = translation.text[0];
                fs.writeFileSync(output, JSON.stringify(input, null, "    "));
            });
        } else {
            translateObject(obj[word]);
        }
    });
}

if (options.valid){
    if (options.input){
        var input = require(path.join(process.cwd(), options.input)),
            output = path.join(process.cwd(), options.output);
        
        translateObject(input);
    } else if (options.from || options.to){
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

