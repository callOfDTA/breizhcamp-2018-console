import jsdom from "jsdom";
import  request from "request-promise-native";
import {Session, Presentateur} from "./domain"
// tableau qui contiendra toutes les sessions du BreizhCamp

export default class Service {
  private talks: Session[];
  private presentateurs: Presentateur[];

  constructor() {
    this.talks = [];
    this.presentateurs = [];
  }

  init():Promise<number> {
    this.talks = [];
    return Promise.all([
      request("http://www.breizhcamp.org/json/others.json", { json: true }),
      request("http://www.breizhcamp.org/json/talks.json", { json: true })
    ]).then(body => {
      body.reduce((acc, el) => acc.concat(el), []).forEach((elem:any) => {
        this.talks.push(new Session(elem.name, elem.description))
      })      
      return this.talks.length;
    });
  }

  listerSessions():Promise<Session[]> {
    return new Promise<Session[]>((resolve, reject) => {
      if (this.talks) resolve(this.talks);
      else reject(`La liste des sessions n'est pas chargé`);
    });
  }

  listerPresentateurs() : Promise<Presentateur[]>{
    this.presentateurs = [];
    return request("http://www.breizhcamp.org/conference/speakers/", {
      json: true
    }).then(body => {
      const dom = new jsdom.JSDOM(body);
      const langs = dom.window.document.querySelectorAll("h3");
      langs.forEach((lg:any) =>{
        this.presentateurs.push(new Presentateur(lg.innerHTML));
      });
      return this.presentateurs;
    });
  }

  chercherSessions(motCle:any) {
    let talksTrouver:any = [];

    return new Promise<any>((resolve, reject) => {
      this.talks.forEach((elem:any) => {
        if (elem.name.includes(motCle)) talksTrouver.push(elem);
      });
      if (talksTrouver) resolve(talksTrouver);
      else reject(`(aucune session)`);
    });
  }
}
