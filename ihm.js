const serv = require('./service');
const request = require('request-promise-native');
const readline = require('readline');

const service = new serv.service();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const menu = () => {
    rl.question(`
    1. Rafraichir les données
    2. Lister les sessions
    3. Lister les présentateurs
    99. Quitter
    `, function (saisie) {
            switch (saisie) {
                case "1":
                    service.init().then(nb=> {
                        console.log(`${nb} : données mises à jours .....`);
                        menu()
                    })
                    break;
                case "2":
                    service.listerSessions().then(talk => {
                        talk.forEach(element =>
                            console.log(`${element.name} ( ${element.speakers} )`)
                        )
                        menu()
                    });
                    break;
                case "3":
                    service.listerPresentateurs().then( presentateurs =>{
                        presentateurs.forEach(element => console.log(element))
                        menu()
                    });
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

exports.start = () => {
    service.init().then(nb=> {
        console.log(`${nb} : données mises à jours .....`);
        menu()
    })
};