const rp = require('request-promise-native');
const jsdom = require('jsdom');



// tableau qui contiendra toutes les sessions du BreizhCamp
let talks = [];
let pres = [];
let options = {
    method: 'GET',
    uri: 'http://www.breizhcamp.org/json/talks.json',
    json: true
};

exports.service = class Service {
    init () {
        talks = [];
        options.uri = 'http://www.breizhcamp.org/json/talks.json';
        return rp(options)
            .then(body => {
                talks = talks.concat(body);
                options.uri = 'http://www.breizhcamp.org/json/others.json';
                return rp(options)
                    .then(b => {
                        talks = talks.concat(b);
                        return talks.length
                    })
                    .catch(err => console.log('Erreur', err))
            }).catch(err => console.log('Erreur', err))
    }

    listerPresentateurs () {
        pres = [];
        options.uri = 'http://www.breizhcamp.org/conference/speakers/'
        return rp(options).then(body => {
            const dom = new jsdom.JSDOM(body);
            const langs = dom.window.document.querySelectorAll("h3");
            langs.forEach((lg) => {
                pres.push(lg.innerHTML);
            })
            return pres;
        }).catch(err => console.log('Erreur', err))
    }

    listerSessions () {
        return new Promise((resolve, reject) => {
            if (talks)
                resolve(talks)
            else
                reject(`Erreur`)
        })
    }

}


