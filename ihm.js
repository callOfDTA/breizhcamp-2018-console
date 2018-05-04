var service = require('./service');
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


exports.start = function() {
    service.init(function(nb) {
        console.log('[init]', nb, 'sessions trouvées.');
        menu();
    });
};

function menu(){
    rl.question('***************************\n 1. Rafraichir les données\n 2. Lister les sessions\n 3. Lister les présentateurs\n 99. Quitter\n ', function(saisie) {
        switch(saisie){
            case '1' :
                service.init(function(nb) {
                    console.log('[init]', nb, 'sessions trouvées.');
                });
                console.log("Données mises à jour");
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

            case '3':
                service.listerPresentateur(function(tab) {
                    tab.forEach(function(element) {
                        console.log(element.innerHTML);
                    })
                });
                menu();
                break;

            case '99' :
                rl.close();
                break;
            
            default :
                console.log('mauvais choix');
                menu();
                break;
        }
    });
}
