"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline_1 = __importDefault(require("readline"));
var service_1 = __importDefault(require("./service"));
var Ihm = /** @class */ (function () {
    function Ihm() {
        this.r1 = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.serv = new service_1.default();
    }
    Ihm.prototype.start = function () {
        this.rafraichirDonnees();
        this.menu();
    };
    Ihm.prototype.menu = function () {
        var _this = this;
        this.r1.question("\n            *************************\n            1. Rafraichir les donn\u00E9es\n            2. Lister les sessions\n            3. Lister les pr\u00E9sentateurs\n            4. Rechercher une session\n            99. Quitter", function (saisie) {
            if (saisie == '1') {
                _this.rafraichirDonnees();
            }
            else if (saisie == '2') {
                _this.listerLesSessions();
            }
            else if (saisie == '3') {
                _this.listerLesPresentateurs();
            }
            else if (saisie == '4') {
                _this.rechercherSession();
            }
            else if (saisie == '99') {
                _this.r1.close(); // attention, une fois l'interface fermée, la saisie n'est plus possible
            }
            else {
                console.log('Votre saisie est incorrecte');
                _this.menu();
            }
        });
    };
    Ihm.prototype.rafraichirDonnees = function () {
        var _this = this;
        this.serv.init().then(function (nb) {
            console.log('[init]', nb, "... Donn\u00E9es mises \u00E0 jour");
            _this.menu();
        });
    };
    Ihm.prototype.listerLesSessions = function () {
        var talks = this.serv.listerSessions();
        talks.forEach(function (value) {
            console.log("* " + value.nom + " (" + value.speaker + ")");
        });
        this.menu();
    };
    Ihm.prototype.listerLesPresentateurs = function () {
        var presentateurs = this.serv.listerPresentateurs();
        presentateurs.forEach(function (value) {
            console.log(value.presentateur);
        });
        this.menu();
    };
    Ihm.prototype.rechercherSession = function () {
        var talks = this.serv.listerSessions();
        var nb = 0;
        this.r1.question("Quel mot recherchez-vous ?", function (saisie) {
            talks.filter(function (value) { return value.nom.includes(saisie); }).forEach(function (element) {
                nb++;
                console.log(nb, element.nom);
            });
        });
        this.menu();
    };
    return Ihm;
}());
exports.default = Ihm;
