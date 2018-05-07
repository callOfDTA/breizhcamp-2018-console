
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let Service = require('./service');

let service = new Service();

exports.start = function() {
    service.init()
    .then(length => console.log(`[init] ${length} sessions trouvées.`)
        , error => console.log(error))
    .then(console.log(`Données mises à jour`))
    .then(menu());
};

function menu(){
    rl.question(`*********************************
    1. Rafraichir les données
    2. Lister les sessions
    3. Lister les présentateurs
    4. Rechercher une session
    99. Quitter
    `, (saisie) => {
        switch(saisie){
            case '1' :
                service.init()
                    .then(length => console.log(`[init] ${length} sessions trouvées.`)
                        , error => console.log(error))
                    .then(console.log(`Données mises à jour`))
                    .then(() => menu());
                break;

            case '2' :
                service.listerSessions()
                    .then(talks => talks.forEach((element) => {
                        console.log(`${element.name} (${element.speakers})`);
                    }), error => console.log(error))
                    .then(() => menu());
                break;

            case '3':
                service.listerPresentateur()
                    .then(speakers => speakers.forEach((element) => {
                        console.log(`${element.innerHTML}`);
                    }), error => console.log(error))
                    .then(() => menu());
                break;

            case '4':
                menu();
                break;

            case '99' :
                rl.close();
                break;
            
            default :
                console.log(`mauvais choix`);
                menu();
                break;
        }
    });
}
