const jsdom = require("jsdom");
const fs = require("fs");
const request = require("request");
// tableau qui contiendra toutes les sessions du BreizhCamp
module.exports = class Service{
constructor(){let talks = [];}


init(){
        this.talks=[];
        return new Promise((resolve, reject) => {
                request("http://www.breizhcamp.org/json/talks.json", { json: true }, (err, res, body)=>{
                        if (err){reject(err);}
                        this.talks=this.talks.concat(body);
                        request("http://www.breizhcamp.org/json/others.json", { json: true }, (err, res, body)=>{
                                if (err){reject(err);}
                                this.talks=this.talks.concat(body);
                                resolve(this.talks.length);
                        });     
                });
        });
};

listerSessions(){
        return new Promise((resolve, reject) => {
                if (this.talks){resolve(this.talks);}
                else{reject(err);}
                
        });
}
listerSpeakersByFirstnameAndName(){ 
        return new Promise((resolve, reject) => {
                request("http://www.breizhcamp.org/conference/speakers/", { json: true }, (err, res, body)=>{
                        if (err){ reject(err);}
                        const dom = new jsdom.JSDOM(body);
                        const langs = dom.window.document.querySelectorAll("h3");
                        resolve(langs);
                });
        });
};
}