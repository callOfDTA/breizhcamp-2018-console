var request = require('request');
var speakers=[];
request('http://www.breizhcamp.org/conference/speakers/', {}, function(err, res, body) {
    if (err) { return console.log('Erreur', err); }

    console.log(body);
});