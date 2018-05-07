var jsdom = require('jsdom');

// récupération de la page HTML exemple
var fs = require('fs');
var pageHTML = fs.readFileSync('./prototype/unePage.html').toString();

var dom = new jsdom.JSDOM(pageHTML);
var langs = dom.window.document.querySelectorAll("li");
langs.forEach(function(lg) {
    console.log(lg.innerHTML);
});