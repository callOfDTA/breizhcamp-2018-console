// tableau qui contiendra toutes les sessions du BreizhCamp
var talks = [];

exports.init = function(callback) {
  var request = require("request");

  request(
    "http://www.breizhcamp.org/json/others.json",
    { json: true },
    function(err, res, body) {
      if (err) {
        return console.log("Erreur", err);
      }
      talks = talks.concat(body);
      // body contient les données récupérées
      //console.log("Ok", talks);

      request(
        "http://www.breizhcamp.org/json/talks.json",
        { json: true },
        function(err, res, body) {
          if (err) {
            return console.log("Erreur", err);
          }
          talks = talks.concat(body);

          // body contient les données récupérées
          //console.log("Ok", talks);
          callback(talks.length);
        }
      );
    }
  );

  
  // TODO effectuer les requêtes HTTP permettant de récupérer les données du BreizhCamp

  // TODO     => une fois les données récupérées, alimenter la variable talks

  // TODO         => invoquer la callback avec le nombre de sessions récupérées
};
