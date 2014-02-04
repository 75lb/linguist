var https = require("https"),
    util = require("util"),
    apiKey = "trnsl.1.1.20140204T101704Z.39bc6456ed6dc4d1.d62d26300c4ce6052906183c5e8b47de9a04b47f",
    l = console.log;

var yandex = {
    host: "translate.yandex.net",
    path: "/api/v1.5/tr.json/translate?key=%s&lang=%s-%s&text=%s"
}

exports.translate = function(text, from, to, done){
    var url = util.format(
        "https://%s%s", 
        yandex.host, 
        util.format(yandex.path, apiKey, from, to, text)
    );
    https.get(url, function(response){  
        var json = "";
        response.setEncoding("utf-8");
        response.on("data", function(chunk){
            json += chunk;
        });
        response.on("end", function(){
            done(JSON.parse(json));
        });
    });
};
