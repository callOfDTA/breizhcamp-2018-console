import { request } from "https";

// tableau qui contiendra toutes les sessions du BreizhCamp
/*var talks = [];

exports.init = function (callback) {

   callback(12);

};*/
var talks = [];

exports.init = function (callback) {

    // TODO effectuer les requêtes HTTP permettant de récupérer les données du BreizhCamp
    const req = new XMLHttpRequest();
    var request = require('request')
    request('http://www.breizhcamp.org/json/talks.json', { json: true }, function(err, res, body) {
        if (err) { return console.log('Erreur', err); } });
    talks = body;

    // TODO     => une fois les données récupérées, alimenter la variable talks

    // TODO         => invoquer la callback avec le nombre de sessions récupérées
    callback(talks.length());
};