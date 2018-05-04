// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];

exports.init = function (callback) {
    talks = [];
    // TODO effectuer les requêtes HTTP permettant de récupérer les données du BreizhCamp
    var request = require('request');

    request('http://www.breizhcamp.org/json/talks.json', { json: true }, function(err, res, body) {
    if (err) { return console.log('Erreur', err); }

    // body contient les données récupérées
    talks = talks.concat(body);
    request('http://www.breizhcamp.org/json/others.json', { json: true }, function(err, res, body) {
            if (err) { return console.log('Erreur', err); }

            // body contient les données récupérées
            talks = talks.concat(body);
            callback(talks.length);
        });
    });
};

exports.listerSessions = function(callback) {
    callback(talks);
}

exports.listerPresentateur = function(callback) {
    var request = require('request');

    request('http://www.breizhcamp.org/conference/speakers/', {}, function(err, res, body) {
        if (err) { return console.log('Erreur', err); }

        var jsdom = require('jsdom');
        // récupération de la page HTML exemple
        var fs = require('fs');

        var dom = new jsdom.JSDOM(body);
        var langs = dom.window.document.querySelectorAll('h3');
        callback(langs);
    });
}