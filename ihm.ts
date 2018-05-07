
import Service from './service'
import * as request from 'request-promise-native'
import * as readline from 'readline'
import {Presentateur, Session} from './domains'


const service = new Service()
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const menu = () => {
    rl.question(`
    1. Rafraichir les données
    2. Lister les sessions
    3. Lister les présentateurs
    4. Rehercher
    99. Quitter
    `,  (saisie:string) => {
            switch (saisie) {
                case "1":
                    service.init().then((nb:any)=> {
                        console.log(`${nb} : données mises à jours .....`);
                        menu()
                    })
                    break;
                case "2":
                    service.listerSessions().then((talk:Session[]) => {
                        talk.forEach((el:Session) =>
                            console.log(`${el.titre} ( ${el.description} )`)
                        )
                        menu()
                    });
                    break;
                case "3":
                    service.listerPresentateurs().then( (presentateurs:Presentateur[]) =>{
                        presentateurs.forEach(element => console.log(element))
                        menu()
                    });
                    break;
                case "4":
                    rl.question(`Quel mot recherchez-vous ? :`, (s:string) => {
                        
                    })
                    menu()
                    break;
                case "99":
                    rl.close();
                    break;
                default:
                    console.log(`L'option que vous avez choisis est incorrect `);
                    menu()
                    break;
            }
        })
}

export function start() {
    service.init().then((nb:any)=> {
        console.log(`${nb} : données mises à jours .....`);
        menu()
    })
};