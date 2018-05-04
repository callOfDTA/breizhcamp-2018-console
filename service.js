// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];

exports.init = function (callback) {
    talks=[];
    var request = require("request")
    request("http://www.breizhcamp.org/json/talks.json", { json: true }, function(err, res, body){
            if (err) { return console.log('Erreur', err);}
            talks=talks.concat(body);
            request("http://www.breizhcamp.org/json/others.json", { json: true }, function(err, res, body){
                    if (err) { return console.log('Erreur', err); }
                    talks=talks.concat(body);
                    callback(talks.length);
                });
        });
};

exports.listerSessions = function(callback){
        callback(talks);
}
exports.listerSpeakersByFirstnameAndName = function(callback){
        var request = require("request")
        request("http://www.breizhcamp.org/conference/speakers/", { json: true }, function(err, res, body){
                if (err) { return console.log('Erreur', err);}  
                var jsdom = require("jsdom");
                var fs = require("fs");
                var dom = new jsdom.JSDOM(body);
                var langs = dom.window.document.querySelectorAll("h3");
                /*
                langs.forEach(function(lg) {
                        console.log(lg.innerHTML);
                });
                */
               callback(langs);

        });
};