
const bodyparser = require('body-parser');
const Prouter = require('./PessoasRouter.js')

module.exports = app =>{
    
    app.use(bodyparser.json());

    app.use(Prouter)
}