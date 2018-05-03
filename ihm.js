var service = require('./service');
var readline = require('readline');

exports.start = function() {
    service.init(function(nb) {
        console.log('[init]', nb, 'sessions trouvées.')
    });
    menu();
};

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function menu(){
    rl.question("***************************\n1. Rafraichir les données\n2. Lister les sessions\n99. Quitter", function(saisie) {
        switch(saisie){
            case '1' : 
                service.init(callback);
                console.log("...Données mises à jour\n");
                break;
            case '2' : 
                service.listerSessions(function(tab){
                    tab.forEach(function(element) {
                        console.log(element.name, "(", element.speakers, ")");
                    });
                });
                break;
            case '99' : 
                rl.close();
                break;
            default : 
                console.log("Veuillez saisir 1, 2 ou 99 pou accéder aux services\n");
                menu();
                break;
        }
    });
}