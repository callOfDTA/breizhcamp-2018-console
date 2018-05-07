//const readline = require("readline");
import readline from "readline";

import Service from "./service";

export default class Ihm {
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  serv = new Service();
  start() {
    this.rafraichirDonnees();
    this.menu();
  }
  menu() {
    this.rl.question(
      `
                  *************************
                  1. Rafraichir les données
                  2. Lister les sessions
                  3. Lister les présentateurs 
                  99. Quitter
                  saisie: `,
      saisie => {
        if (saisie == "1") {
          this.rafraichirDonnees();
        } else if (saisie == "2") {
          this.listerLesSessions();
        } else if (saisie == "3") {
          this.listerLesSpeakers();
        } else if (saisie == "99") {
          this.rl.close(); // attention, une fois l'interface fermée, la saisie n'est plus possible
        } else {
          this.menu();
        }
      }
    );
  }
  rafraichirDonnees() {
    this.serv.init().then(nb => {
      console.log("[init]", nb, `... Données mises à jour`);
      this.menu();
    });
  }
  listerLesSessions() {
    let talks = this.serv.listerSessions();

    talks.forEach(value => {
      console.log("*", value.nom, "(", value.speaker, ")");
    });
    this.menu();
  }
  listerLesSpeakers() {
    let speakers = this.serv.listerLesSpeakers();

    speakers.forEach(value => {
      console.log(value.nom);
    });
    this.menu();
  }
}
//module.exports = Ihm;
