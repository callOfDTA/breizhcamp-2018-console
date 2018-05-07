const ihm = require('./ihm');

class index {
    constructor() {
            console.log("** Application BreizhCamp 2018 **");
            this.interface = new ihm();
            this.interface.start();
          }
}

let index1 = new index();