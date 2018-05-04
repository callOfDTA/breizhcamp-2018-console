var service = require('./service');
var request = require('request');
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var menu = function () {
    rl.question("1. Rafraichir les données \n2. Lister les sessions \n99. Quitter \n", function (saisie) {

        switch (saisie) {
            case "1":

                service.init(function (callback) {
                    console.log(callback," : données mises à jours .....\n");
                })

                break;
            case "2":
                service.listerSessions(function (talk) {
                    talk.forEach(element =>
                        console.log(element.name, " (", element.speakers, ")")
                    )
                });
                break;

            case "99":
                rl.close();
                break;

            default:
                console.log("L'option que vous avez choisis est incorrect \n");
                break;
        }
        if(saisie!=99) menu();
    })

}

exports.start = function () {
    service.init(function (nb) {
        console.log('[init]')
        menu();
    });
};