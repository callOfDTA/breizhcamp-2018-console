import jsdom from 'jsdom';
import request from 'request-promise-native';
import { Session, Presentateur } from './domains';

export default class Service {
    private talks:Session[];
    private speakers:Presentateur[];

    constructor() {
        this.talks = [];
        this.speakers = [];
    }

    init():Promise<number> {
        this.talks = [];

        const req1$ = request('http://www.breizhcamp.org/json/talks.json', { json: true });
        const req2$ = request('http://www.breizhcamp.org/json/others.json', { json: true });

        return Promise.all([req1$, req2$])
        .then((body:any[]) => {
            this.talks = body.reduce((acc, curr) => acc.concat(curr) , []);
            return this.talks.length;
        });
    }


    listerSessions() {
        return this.talks;
    }

    listerPresentateur():Promise<Presentateur[]> {
        return new Promise((resolve, reject) => {
            request('http://www.breizhcamp.org/conference/speakers/', {}, (err:any, res:any, body:any) => {
                if (err) {
                    reject(err);
                } else {
                    const dom = new jsdom.JSDOM(body);
                    const langs = dom.window.document.querySelectorAll('h3');
                    langs.forEach(element => {
                        console.log("EL", element)
                        this.speakers.push(new Presentateur(element.innerHTML)); 
                    });
                    resolve(this.speakers);
                }
            });
        });
    }
}