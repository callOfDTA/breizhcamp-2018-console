const service = require('./service');
const readline = require('readline');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

exports.start = function() {
    rafraichirDonnees();

    function menu() {
        rl.question(
            `
            *************************
            1. Rafraichir les données
            2. Lister les sessions
            3. Lister les présentateurs
            99. Quitter`, saisie => {     
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
        service.init().then(nb => {
            console.log('[init]', nb, `... Données mises à jour`);
            menu();
        })
    }

    function listerLesSessions(){
        let talks = service.listerSessions();
        
        talks.forEach(value => {
                console.log(`* ${value.name} (${value.speakers})`);
        });
        menu();    
    }

    function listerLesPresentateurs(){
        let presentateurs = service.listerPresentateurs(); 
        
        presentateurs.forEach(value => {
            console.log(value);
        });

        menu();    
    }
};