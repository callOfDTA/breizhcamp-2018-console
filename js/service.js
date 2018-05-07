"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsdom_1 = __importDefault(require("jsdom"));
var request_promise_native_1 = __importDefault(require("request-promise-native"));
var Service = /** @class */ (function () {
    function Service() {
        this._talks = [];
        this._presentateurs = [];
    }
    Service.prototype.init = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            request_promise_native_1.default('http://www.breizhcamp.org/json/talks.json', { json: true }, function (error, response, body) {
                if (error) {
                    reject(error);
                }
                else {
                    _this._talks = body;
                    request_promise_native_1.default('http://www.breizhcamp.org/json/others.json', { json: true }, function (error, response, body) {
                        if (error) {
                            reject(error);
                        }
                        else {
                            _this._talks = _this._talks.concat(body);
                            resolve(_this._talks.length);
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
                        _this._presentateurs = _this._presentateurs.concat(lg.innerHTML);
                    });
                }
            });
        });
    };
    Service.prototype.listerSessions = function () {
        return this._talks;
    };
    Service.prototype.listerPresentateurs = function () {
        return this._presentateurs;
    };
    return Service;
}());
exports.default = Service;
