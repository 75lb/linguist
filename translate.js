#!/usr/bin/env node
"use strict";

var yandex = require("./lib/yandex");

yandex.translate(process.argv[2], process.argv[3], process.argv[4], function(translation){
    console.log(translation.text[0]);
});
