const Servicos = require('./Servicos.js');
const database = require('../models');

class PessoasServicos extends Servicos{
    constructor(){
        super('Pessoas')
    }
    async buscarRegisAtivos(where = {}){
        return database[this.modelsName].findAll({where: { ...where }})
    }
    async BuscarTodosRegistros(where ={}){
        return database[this.modelsName].scope('todos').findAll({where: { ...where }});
    }
}

module.exports = PessoasServicos;