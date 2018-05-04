// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];
var jsdom = require('jsdom');

exports.init = function (callback) {

   var request = require('request');
   request('http://www.breizhcamp.org/json/talks.json', { json: true}, function (error, response, body) {
        talks = body;
        request('http://www.breizhcamp.org/json/others.json', { json: true}, function (error, response, body) {
            talks = talks.concat(body);
            callback(talks.length);
        
        });
   });    
};

exports.listerSessions = function() {
    return talks;
};

exports.listerLesPresentateurs = function() {
    var request = require('request');
    request('http://www.breizhcamp.org/conference/speakers/', {}, function(err, res, body) {
        if (err) { return console.log('Erreur', err); }

        var dom = new jsdom.JSDOM(body);

        var presentateurs = dom.window.document.querySelectorAll('.media-heading');
        presentateurs.forEach(function(lg) {
            console.log(lg.innerHTML);
        });
    });
};