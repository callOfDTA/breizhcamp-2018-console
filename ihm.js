var service = require('./service');

exports.start = function() {
    service.init(function(nb) {
        console.log('[init]', nb, 'sessions trouvées.')
    });
};