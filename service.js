// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];
var speakers = [];

exports.init = function (callback) {

   // Envoie de la requête http
   var request = require('request')
request('http://www.breizhcamp.org/json/talks.json', { json: true }, function(err, res, body) {
    if (err) { return console.log('Erreur', err); }
    talks = body;

        request('http://www.breizhcamp.org/json/others.json', { json: true }, function(err, res, body) {
        if (err) { return console.log('Erreur', err); }
        talks = talks.concat(body);
        callback(talks.length)
    });
});

var request = require('request')
    request('http://www.breizhcamp.org/conference/speakers/', {}, function(err, res, body) {
        if (err) { return console.log('Erreur', err); }

        var jsdom = require('jsdom');

        // récupération de la page HTML exemple
        var pageHTML = body;

        var dom = new jsdom.JSDOM(pageHTML);
        var langs = dom.window.document.querySelectorAll(".media-heading");
        langs.forEach(function(lg) {
            speakers = speakers.concat(lg.innerHTML);
        });
            });

};
exports.listerSessions= function(){
    return talks;
};


exports.listerLesSpeakers= function(){
    return speakers;
};