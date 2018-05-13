import ihm from './ihm';

class index {       
  interface = new ihm();
    start() {
      this.interface.start();
    }              
}

console.log("** Application BreizhCamp 2018 **");
let index1 = new index();
index1.start();