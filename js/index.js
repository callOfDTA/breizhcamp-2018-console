"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ihm_1 = __importDefault(require("./ihm"));
var index = /** @class */ (function () {
    function index() {
        this.interface = new ihm_1.default();
    }
    index.prototype.start = function () {
        this.interface.start();
    };
    return index;
}());
console.log("** Application BreizhCamp 2018 **");
var index1 = new index();
