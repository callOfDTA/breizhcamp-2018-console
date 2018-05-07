let request = require('request');
let jsdom = require('jsdom');

class Service {

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
                        this.presentateurs = this.presentateurs.concat(lg.innerHTML);
                    });
                } 
            });
        });
    }

    listerSessions() {
        return this.talks;
    }

    

    listerPresentateurs() {   
        return this.presentateurs;
    }

}

module.exports = Service;
