const jsdom = require("jsdom");
const request = require("request-promise-native");

// tableau qui contiendra toutes les sessions du BreizhCamp
let talks = [];
let presentateurs = [];
let options = {
  method: "GET",
  uri: "",
  json: true
};

exports.class =   class Service {
  
  init(){
    talks = [];
    options.uri = "http://www.breizhcamp.org/json/others.json";
    return request(options)
      .then(body => {
        talks = talks.concat(body);
        options.uri = "http://www.breizhcamp.org/json/talks.json";
        return request(options)
          .then(bdy => {
            talks = talks.concat(bdy);
            return talks.length;
          })
          .catch(err => console.log(`Erreur ${err}`));
      })
      .catch(err => console.log(`Erreur ${err}`));
  }

  listerSessions() {
    return new Promise((resolve, reject) => {
      if (talks)
      resolve(talks)
      else
      reject(`La liste des sessions n'est pas chargé`)
    })
  }

  listerPresentateurs  ()  {
    options.uri = "http://www.breizhcamp.org/conference/speakers/";
    presentateurs = [];
    return request(options)
      .then(body => {
        const dom = new jsdom.JSDOM(body);
        const langs = dom.window.document.querySelectorAll("h3");
        langs.forEach(function(lg) {
          presentateurs.push(lg.innerHTML);
        });
        return presentateurs;
      })
      .catch(err => console.log(`Erreur ${err}`));
  }
}

