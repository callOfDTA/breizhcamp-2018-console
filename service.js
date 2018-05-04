// tableau qui contiendra toutes les sessions du BreizhCamp
let talks = [];
let speakers = [];

/*exports.init = function (callback) {

   // Envoie de la requête http
   let request = require('request')
request('http://www.breizhcamp.org/json/talks.json', { json: true }, function(err, res, body) {
    if (err) { return console.log('Erreur', err); }
    talks = body;

        request('http://www.breizhcamp.org/json/others.json', { json: true }, function(err, res, body) {
        if (err) { return console.log('Erreur', err); }
        talks = talks.concat(body);
        callback(talks.length)
    });
});*/
exports.init = function(){
    return new Promise(function (resolve, reject) {

        // Envoie de la requête http
        let request = require('request')
     request('http://www.breizhcamp.org/json/talks.json', { json: true }, function(err, res, body) {
         if (err) { return console.log('Erreur', err); }
         talks = body;
     
             request('http://www.breizhcamp.org/json/others.json', { json: true }, function(err, res, body) {
             if (err) { return console.log('Erreur', err); }
             talks = talks.concat(body);
             //callback(talks.length)
             resolve(talks.length);
         });
     });
   


let request1 = require('request')
    request1('http://www.breizhcamp.org/conference/speakers/', {}, function(err, res, body) {
        if (err) { return console.log('Erreur', err); }

        let jsdom = require('jsdom');

        // récupération de la page HTML exemple
        let pageHTML = body;

        let dom = new jsdom.JSDOM(pageHTML);
        let langs = dom.window.document.querySelectorAll(".media-heading");
        langs.forEach(function(lg) {
            speakers = speakers.concat(lg.innerHTML);
        });
            });

});

}
exports.listerSessions= function(){
    return talks;
};


exports.listerLesSpeakers= function(){
    return speakers;
};