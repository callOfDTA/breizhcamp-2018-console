const Service = require('./service');
const readline = require('readline');
const service = new Service();
exports.start = () =>{
    service.init().then(nb =>{
        console.log(`\n[init] ${nb} sessions trouvées.`);
        menu();
    });
   
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function menu(){
    rl.question(`****************************************
    1. Rafraichir les données
    2. Lister les sessions
    3. Lister les présentateurs
    99. Quitter`, saisie =>{
        switch(saisie){
            case '1' : 
                service.init().then(nb =>{
                    console.log(`\n[init] ${nb} sessions trouvées.`);
                });
                console.log(`...Données mises à jour\n`);
                menu();
                break;
            case '2' : 
                service.listerSessions().then(tab=>{
                    tab.forEach(element =>{
                        console.log(`${element.name} (${element.speakers})`);
                    });
                    menu();
                });
                break;
            case '3' :
                service.listerSpeakersByFirstnameAndName().then(tab=>{
                    tab.forEach(lg =>{
                        console.log(`${lg.innerHTML}`);
                    });
                    menu();
                });
                break;
            case '99' : 
                rl.close();
                break;
            default : 
                console.log(`Veuillez saisir 1, 2, 3 ou 99 pou accéder aux services\n`);
                menu();
                break;
        }
    });
}
