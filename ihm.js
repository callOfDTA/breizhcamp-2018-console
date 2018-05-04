var service = require('./service');
var readline = require('readline');

exports.start = function() {
    service.init(function(nb) {
        console.log("\n[init]', nb, 'sessions trouvées.");
        menu();
    });
   
};

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function menu(){
    rl.question("***************************\n1. Rafraichir les données\n2. Lister les sessions\n3. Lister les présentateurs\n99. Quitter", function(saisie) {
        switch(saisie){
            case '1' : 
                service.init(function(nb){
                    console.log('[init]', nb, 'sessions trouvées.');
                });
                console.log("...Données mises à jour\n");
                menu();
                break;
            case '2' : 
                service.listerSessions(function(tab){
                    tab.forEach(function(element) {
                        console.log(element.name, "(", element.speakers, ")");
                    });
                });
                menu();
                break;
            case '3' :
                service.listerSpeakersByFirstnameAndName(function(tab){
                    tab.forEach(function(lg) {
                        console.log(lg.innerHTML);
                    });
                    menu();
                });
                break;
            case '99' : 
                rl.close();
                break;
            default : 
                console.log("Veuillez saisir 1, 2, 3 ou 99 pou accéder aux services\n");
                menu();
                break;
        }
    });
}