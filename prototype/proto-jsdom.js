let jsdom = require('jsdom');

// récupération de la page HTML exemple
let fs = require('fs');
let pageHTML = fs.readFileSync('./prototype/unePage.html').toString();

let dom = new jsdom.JSDOM(pageHTML);
let langs = dom.window.document.querySelectorAll("li");
langs.forEach(function(lg) {
    console.log(lg.innerHTML);
});