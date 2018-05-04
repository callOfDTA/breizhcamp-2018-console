// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];

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