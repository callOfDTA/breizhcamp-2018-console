import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
import Service  from './service';
import { Session, Presentateur } from './domains';

let service = new Service();

exports.start = () => {
    service.init()
    .then(length => console.log(`[init] ${length} sessions trouvées.`)
        , error => console.log(error))
    .then(() => console.log(`Données mises à jour`))
    .then(() => menu());
};

function menu(){
    rl.question(`*********************************
    1. Rafraichir les données
    2. Lister les sessions
    3. Lister les présentateurs
    4. Rechercher une session
    99. Quitter
    `, (saisie:any) => {
        switch(saisie){
            case '1' :
                service.init()
                    .then(length => console.log(`[init] ${length} sessions trouvées.`)
                        , error => console.log(error))
                    .then(() => console.log(`Données mises à jour`))
                    .then(() => menu());
                break;

            case '2' :
                const talks = service.listerSessions();
                talks.forEach((element:any) => {
                    console.log(`${element.name} (${element.speakers})`);
                });
                menu();
                break;

            case '3':
                service.listerPresentateur()
                    .then(speakers => speakers.forEach((element:any) => {
                        console.log(`${element.name}`);
                    }), error => console.log("Errr",error))
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
