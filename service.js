const request = require("request");
const jsdom = require("jsdom");

class Service {
  // tableau qui contiendra toutes les sessions du BreizhCamp
  /*let talks = [];
let speakers = [];*/

  constructor() {
    this.talks = [];
    this.speakers = [];
  }

  init() {
    return new Promise((resolve, reject) => {
      // Envoie de la requête http

      request("http://www.breizhcamp.org/json/talks.json", { json: true }, (err, res, body) => {
        if (err) {
          reject(err); // en cas d'erreur
        } else {
          this.talks = body;
          request("http://www.breizhcamp.org/json/others.json", { json: true }, (err, res, body) => {
            if (err) {
              reject(err); // en cas d'erreur
            } else {
              this.talks = this.talks.concat(body);
              resolve(this.talks.length);
            }
          });
        }
      });

      request("http://www.breizhcamp.org/conference/speakers/", {}, (err, res, body) => {
        if (err) {
          console.log(err);
          reject(err); // en cas d'erreur
        } else {
          // récupération de la page HTML exemple
          let pageHTML = body;

          let dom = new jsdom.JSDOM(pageHTML);
          let langs = dom.window.document.querySelectorAll(".media-heading");
          langs.forEach(lg => {
            this.speakers = this.speakers.concat(lg.innerHTML);
          });
        }
      });
    });
  }

  listerSessions() {
    return this.talks;
  }

  listerLesSpeakers() {
    return this.speakers;
  }
}

module.exports = Service;
