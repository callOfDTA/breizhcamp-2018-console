// importation de la librairie request
// recherche par défaut dans le répertoire node_modules
var request = require('request')

// Envoie de la requête http
request('https://jsonplaceholder.typicode.com/posts', { json: true }, function(err, res, body) {
    if (err) { return console.log('Erreur', err); }

    // body contient les données récupérées
    console.log('Ok', body);
});