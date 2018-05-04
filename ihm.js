var service = require('./service');
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

exports.start = function() {
    rafraichirDonnees();

    function menu() {
        rl.question("\n*************************\n1. Rafraichir les données\n2. Lister les sessions\n3. Lister les présentateurs\n99. Quitter", function(saisie) {     
            if(saisie == 1){
                rafraichirDonnees();
            
            }
            else if(saisie == 2){
                listerLesSessions();
            
            }
            else if(saisie == 3){
                listerLesPresentateurs();
            
            }    
            else if(saisie == 99){
                rl.close();// attention, une fois l'interface fermée, la saisie n'est plus possible
            }   
        });
    }

    function rafraichirDonnees(){
        service.init(function(callback) {
            console.log('[init]', callback, `... Données mises à jour`);
            menu();
        });
    }

    function listerLesSessions(){
        var talks = service.listerSessions();
        
        talks.forEach(function(value){
                console.log("* " + value.name, "(" + value.speakers + ")");
            });
            menu();    
    }

    function listerLesPresentateurs(){
        service.listerLesPresentateurs();      
        menu();    
    }
};