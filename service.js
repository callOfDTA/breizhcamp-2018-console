// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];

exports.init = function (callback) {

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