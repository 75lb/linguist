#!/usr/bin/env node
"use strict";

var yandex = require("./lib/yandex"),
    Thing = require("nature").Thing,
    path = require("path"),
    fs = require("fs"),
    l = console.log;


yandex.translate(process.argv[2], process.argv[3], process.argv[4], function(translation){
    console.log(translation.text[0]);
});

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
