// tableau qui contiendra toutes les sessions du BreizhCamp
let talks = [];
let presentateurs = [];
const jsdom = require('jsdom');

exports.init = function(){  
   return new Promise(function (resolve, reject) {
    let request = require('request');
    request('http://www.breizhcamp.org/json/talks.json', { json: true}, function (error, response, body) {               
        if(error) { return console.log('Erreur', error);}
            talks = body;         
            request('http://www.breizhcamp.org/json/others.json', { json: true}, function (error, response, body) {
                if(error) { return console.log('Erreur', error);}
                talks = talks.concat(body);
                resolve(talks.length); // en cas de succès                  
            });
        });
    });   
};

exports.listerSessions = function() {
    return talks;
};

let request = require('request');
    request('http://www.breizhcamp.org/conference/speakers/', {}, function(err, res, body) {
        if (err) { return console.log('Erreur', err); }

        let dom = new jsdom.JSDOM(body);

        speakers = dom.window.document.querySelectorAll('.media-heading');      
  
        speakers.forEach(lg => {
            presentateurs = presentateurs.concat(lg.innerHTML);
        });
    });

exports.listerPresentateurs = function() {   
    return presentateurs;
};