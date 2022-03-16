const database = require('../models');

class Services {
    constructor(modelsName){
        this.modelsName = modelsName;
    }

     async buscarRegistros(){
        return database[this.modelsName].findAll();

    }
}

module.exports = Services;