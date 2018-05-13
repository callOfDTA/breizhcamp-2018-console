//const ihm = require("./ihm");
import Ihm from "./ihm";

class index {
  interface = new Ihm();
  start() {
    this.interface.start();
  }
}
console.log("** Application BreizhCamp 2018 **");
let ind = new index();
ind.start();
