import jsdom from 'jsdom';
import request from 'request-promise-native';
import { Session } from './domain';
import { Presentateur } from './domain';

export default class Service {
    talks: Session[];
    presentateurs: Presentateur[];

    constructor() {
        this.talks = [];
        this.presentateurs = [];
    }

    init() {  
        this.talks = [];      
        return new Promise((resolve, reject) => {       
            request('http://www.breizhcamp.org/json/talks.json', { json: true}, (error, response, body) => {               
                if(error) { 
                    reject(error);
                }
                else {
                    body.forEach(element => {
                        this.talks = this.talks.concat(new Session(element.name, element.speakers));
                    });
                    request('http://www.breizhcamp.org/json/others.json', { json: true}, (error, response, body) => {
                        if(error) { 
                            reject(error);
                        }
                        else {
                            body.forEach(element => {
                                this.talks = this.talks.concat(new Session(element.name, element.speakers));
                            });
                            resolve(this.talks.length);
                        }                                 
                    });
                }        
            });
                     
            request('http://www.breizhcamp.org/conference/speakers/', {}, (error, response, body) => {
                if(error) { 
                    reject(error);
                }
                else {
                    let dom = new jsdom.JSDOM(body);
                    let speakers = dom.window.document.querySelectorAll('.media-heading');          
                    speakers.forEach(lg => {
                        this.presentateurs.push(new Presentateur(lg.innerHTML));
                    });
                } 
            });
        });
    }

    listerSessions(): Session[] {
        return this.talks;
    }

    listerPresentateurs(): Presentateur[] {   
        return this.presentateurs;
    }
}
