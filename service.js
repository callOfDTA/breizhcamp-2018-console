const request = require('request');
const jsdom = require('jsdom');
const fs = require('fs');

module.exports = class Service {

    constructor() {
        this.talks = [];
    }
    init() {
        return new Promise((resolve, reject) => {
            this.talks = [];
            request('http://www.breizhcamp.org/json/talks.json', { json: true }, (err, res, body) => {
                if (err) {
                    reject(err);
                }
                this.talks = this.talks.concat(body);

                request('http://www.breizhcamp.org/json/others.json', { json: true }, (err, res, body) => {
                    if (err) {
                        reject(err);
                    }
                    this.talks = this.talks.concat(body);

                    resolve(this.talks.length);
                });
            });
        });
    }

    listerSessions() {
        return new Promise((resolve, reject) => {
            if (this.talks){
                resolve(this.talks);
            } else {
                reject(`talks empty`);
            }
        });
    }

    listerPresentateur() {
        return new Promise((resolve, reject) => {
            request('http://www.breizhcamp.org/conference/speakers/', {}, (err, res, body) => {
                if (err) {
                    reject(err);
                } else {
                    const dom = new jsdom.JSDOM(body);
                    const langs = dom.window.document.querySelectorAll('h3');
                    resolve(langs);
                }
            });
        });
    }
}