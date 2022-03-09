
const bodyparser = require('body-parser');
const Prouter = require('./PessoasRouter.js');
const Nrouter = require('./NiveisRouter.js');
const Trouter = require("./TurmasRouter.js");

module.exports = app =>{
    
    app.use(bodyparser.json());

    app.use(Prouter)
    app.use(Nrouter)
    app.use(Trouter)
}