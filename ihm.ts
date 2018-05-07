import  readline from "readline";
import Service from "./service";
import {Session, Presentateur} from "./domain"


const service = new Service();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export function start() {
  service
    .init()
    .then((nb: any) => {
      console.log(`[init] ${nb} sessions trouvées.`);
      menu();
    })
    .catch(err => console.log(`Erreur ${err}`));
}

function menu() {
  rl.question(
    `*************************
      1. Rafraichir les données
      2. Lister les sessions
      3. Lister les présentateurs
      4. Rechercher une session
      99. Quitter
      Veuillez choisir une option :`,
    saisie => {
      switch (saisie) {
        case "1":
          service
            .init()
            .then((nb: any) => {
              console.log(`${nb} Données mises à jour`);
              menu();
            })
            .catch(err => console.log(`Erreur ${err}`));
          break;
        case "2":
          service
            .listerSessions()
            .then((talks: Session[]) => {
              talks.forEach((elem: Session) =>
                console.log(`${elem.titre} (${elem.description})`)
              );

              menu();
            })
            .catch((err: any) => console.log(err));
          break;
        case "3":
          service
            .listerPresentateurs()
            .then((presentateurs: Presentateur[]) => {
              presentateurs.forEach(elem => console.log(elem.nom));
              menu();
            })
            .catch(err => console.log(`Erreur ${err}`));
          break;
        case "4":
          detailSession();
          break;
        case "99":
          console.log("Au revoir :)");
          rl.close();
          break;
        default:
          console.log("L'option choisi n'est pas valide.");
          menu();
          break;
      }
    }
  );
}

function detailSession() {
  rl.question(`Quel mot recherchez-vous ? : `, (saisie: string) => {
    service.chercherSessions(saisie).then((elem: any) => console.log(elem));

    rl.question(
      `98. Refaire une nouvelle recherche
    99. Retour au menu principal
    Votre choix : `,
      s => {}
    );
  });
}
