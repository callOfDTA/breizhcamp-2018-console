import request from "request-promise-native";
import jsdom from "jsdom";
import Session from "./domain";
import { Presentateur } from "./domain";
export default class Service {
  // tableau qui contiendra toutes les sessions du BreizhCamp
  /*let talks = [];
let speakers = [];*/

  talks: Session[];
  speakers: Presentateur[];

  constructor() {
    this.talks = [];
    this.speakers = [];
  }

  init() {
    return new Promise((resolve, reject) => {
      // Envoie de la requête http
      this.talks = [];
      request("http://www.breizhcamp.org/json/talks.json", { json: true }, (err, res, body: any[]) => {
        if (err) {
          reject(err); // en cas d'erreur
        } else {
          body.forEach(element => {
            this.talks = this.talks.concat(new Session(element.name, element.speakers));
          });
          request("http://www.breizhcamp.org/json/others.json", { json: true }, (err, res, body: any[]) => {
            if (err) {
              reject(err); // en cas d'erreur
            } else {
              body.forEach(element => {
                this.talks = this.talks.concat(new Session(element.name, element.speakers));
              });
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
            this.speakers.push(new Presentateur(lg.innerHTML));
          });
        }
      });
    });
  }

  listerSessions(): Session[] {
    return this.talks;
  }

  listerLesSpeakers(): Presentateur[] {
    return this.speakers;
  }
}

//module.exports = Service;
