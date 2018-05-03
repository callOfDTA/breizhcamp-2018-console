// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];

exports.init = function (callback) {

   var request = require('request');
   request('http://www.breizhcamp.org/json/talks.json', { json: true}, function (error, response, body) {
    talks = body
    callback(talks.length-1);
   });   
};