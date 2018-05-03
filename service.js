var request = require('request')

// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];

exports.init = function (callback) {

    request('http://www.breizhcamp.org/json/talks.json', { json: true }, function(err, res, body) {
        if (err) { return console.log('Erreur', err); }
        talks = talks.concat(body);
        // body contient les données récupérées


        request('http://www.breizhcamp.org/json/others.json', { json: true }, function(err, res, body) {
            if (err) { return console.log('Erreur', err); }
            talks = talks.concat(body);
            // body contient les données récupérées
            callback(talks.length);
        });
    });
};