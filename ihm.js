const Service = require("./service");
const readline = require("readline");

const service = new Service.class()


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

exports.start = () => {
  service.init().then(nb => {
    console.log(`[init] ${nb} sessions trouvées.`);
    menu();
  });
};

function menu() {
  rl.question(
    `*************************
      1. Rafraichir les données
      2. Lister les sessions
      3. Lister les présentateurs
      99. Quitter
      Veuillez choisir une option :`,
    saisie => {
      switch (saisie) {
        case "1":
          service.init().then(nb => {
            console.log(`${nb} Données mises à jour`);
            menu();
          });
          break;
        case "2":
          service.listerSessions().then(talks => {
            talks.forEach(elem =>
              console.log(`${elem.name} (${elem.speakers})`)
            )
            
            menu();
          }).catch(err=> console.log(err));
          break;
          case "3":
          service.listerPresentateurs().then(presentateurs => {
            presentateurs.forEach(elem =>
              console.log(elem)
            );
            menu();
          });
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
