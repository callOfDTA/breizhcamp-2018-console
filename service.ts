import jsdom from 'jsdom';
import request from 'request-promise-native';

export default class Service {
    talks: any[];
    presentateurs: any[];

    constructor() {
        this.talks = [];
        this.presentateurs = [];
    }

    init() {        
        return new Promise((resolve, reject) => {
            
            request('http://www.breizhcamp.org/json/talks.json', { json: true}, (error, response, body) => {               
                if(error) { 
                    reject(error);
                }
                else {
                    this.talks = body;
                    request('http://www.breizhcamp.org/json/others.json', { json: true}, (error, response, body) => {
                        if(error) { 
                            reject(error);
                        }
                        else {
                            this.talks = this.talks.concat(body);
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
                        this.presentateurs.push(lg.innerHTML);
                    });
                } 
            });
        });
    }

    listerSessions(): any {
        return this.talks;
    }

    

    listerPresentateurs(): any {   
        return this.presentateurs;
    }
}
