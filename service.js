"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsdom_1 = __importDefault(require("jsdom"));
var request_promise_native_1 = __importDefault(require("request-promise-native"));
var domain_1 = require("./domain");
var domain_2 = require("./domain");
var Service = /** @class */ (function () {
    function Service() {
        this.talks = [];
        this.presentateurs = [];
    }
    Service.prototype.init = function () {
        var _this = this;
        this.talks = [];
        return new Promise(function (resolve, reject) {
            request_promise_native_1.default('http://www.breizhcamp.org/json/talks.json', { json: true }, function (error, response, body) {
                if (error) {
                    reject(error);
                }
                else {
                    body.forEach(function (element) {
                        _this.talks = _this.talks.concat(new domain_1.Session(element.name, element.speakers));
                    });
                    request_promise_native_1.default('http://www.breizhcamp.org/json/others.json', { json: true }, function (error, response, body) {
                        if (error) {
                            reject(error);
                        }
                        else {
                            body.forEach(function (element) {
                                _this.talks = _this.talks.concat(new domain_1.Session(element.name, element.speakers));
                            });
                            resolve(_this.talks.length);
                        }
                    });
                }
            });
            request_promise_native_1.default('http://www.breizhcamp.org/conference/speakers/', {}, function (error, response, body) {
                if (error) {
                    reject(error);
                }
                else {
                    var dom = new jsdom_1.default.JSDOM(body);
                    var speakers = dom.window.document.querySelectorAll('.media-heading');
                    speakers.forEach(function (lg) {
                        _this.presentateurs.push(new domain_2.Presentateur(lg.innerHTML));
                    });
                }
            });
        });
    };
    Service.prototype.listerSessions = function () {
        return this.talks;
    };
    Service.prototype.listerPresentateurs = function () {
        return this.presentateurs;
    };
    return Service;
}());
exports.default = Service;
