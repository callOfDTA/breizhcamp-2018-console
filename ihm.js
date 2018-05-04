var service = require("./service");
var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

exports.start = function() {
  service.init(function(nb) {
    console.log("[init]", nb, "sessions trouvées.");
    menu();
  });
};

function menu() {
  rl.question(
    "*************************\n  1. Rafraichir les données\n  2. Lister les sessions\n 99. Quitter\n Veuillez choisir une option :",
    function(saisie) {
      switch (saisie) {
        case "1":
          service.init(function(nb) {
            console.log(nb, "Données mises à jour");
            menu();
          });
          break;
        case "2":
          service.listerSessions(function(talks) {
            talks.forEach(elem =>
              console.log(elem.name, "(", elem.speakers, ")")
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
