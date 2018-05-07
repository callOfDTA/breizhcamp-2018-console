import jsdom from 'jsdom';
import rp from 'request-promise-native';
import {Presentateur, Session} from './domains'


// tableau qui contiendra toutes les sessions du BreizhCamp
let options = {
    method: 'GET',
    uri: 'http://www.breizhcamp.org/json/talks.json',
    json: true
};


export default class Service {
    talks:Session[];
    pres:Presentateur[];

    constructor() {
        this.talks = [];
        this.pres = [];
    }

    init() :Promise<number>{
        this.talks = [];
        return Promise.all([
            rp("http://www.breizhcamp.org/json/others.json", { json: true }),
            rp("http://www.breizhcamp.org/json/talks.json", { json: true })]
        )
            .then(body => {
                body.reduce((acc, el) => acc.concat(el), [])
                    .forEach((elem:any) => {this.talks.push(new Session(elem.name, elem.description))});
                return this.talks.length;
            })
            
    }
    listerPresentateurs() :Promise<Presentateur[]>{
        this.pres = [];
        options.uri = 'http://www.breizhcamp.org/conference/speakers/'
        return rp(options)
            .then(body => {
                const dom = new jsdom.JSDOM(body);
                const langs = dom.window.document.querySelectorAll("h3");
                langs.forEach((lg) => {
                    this.pres.push(new Presentateur(lg.innerHTML));
                })
                return this.pres;
            })
    }
    listerSessions():Promise<Session[]> {
        return new Promise((resolve, reject) => {
            if (this.talks)
                resolve(this.talks)
            else
                reject(`Erreur`)
        })
    }
}


