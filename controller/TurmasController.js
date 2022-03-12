const database = require("../models");

class TurmasController{
    //this method find all values
    static async FindAllTurmas(req, res){
        try{
            const Values = await database.Turmas.findAll();
            return res.status(200).json(Values);

        }
        catch(error){
            res.status(400).json(error.message)
        }
    }
    //this method find values by id
    static async FindByIDTurmas(req, res){
        const { id } = req.params;
        try{
            const Values = await database.Turmas.findOne({where: { id: Number.parseInt(id)}});
            return res.status(200).json(Values);
        }
        catch(error){
            return res.status(400).json(error.message)
        }
    }
    //this method patch new values in the table
    static async UpdateTableTurmas(req, res){
        const Value = req.body;
        const { id } = req.params;
        try{
            await database.Turmas.update(Value, {where: {id: Number.parseInt(id)}});
            const values = await database.Turmas.findOne({where: {id: Number.parseInt(id)}})
            return res.status(200).json(values);
        }catch(error){
            return res.status(400).json(error.message);
        }
        
    }
    //this method post new values in the table
    static async CreateValueTurmas(req, res){
        const value = req.body;
        try{
            const values = await database.Turmas.create(value);
            return res.status(200).json(value);
        }catch(error){
            return res.status(400).json(value);
        }
    }  
    //this method delete one item int the table
    static async DeleteTurmas(req, res){
        const { id } = req.params;
        try{
            await database.Turmas.destroy({where: {id: Number.parseInt(id)}});
            const newres = {messagem: `dados deletados com sucesso no id ${id}`};
            res.status(200).json(newres);
        }catch(error){
            return res.status(400).json(error.message)
        }
    }
    //this method retoure one data
    static async Restaurar(req, res){
        const { id } = req.params;
        try{
            const value = database.Turmas.restore({where: {id: Number.parseInt(id)}})
            return res.status(200).json({mensagem: `código ${ id } restaurado com sucesso!`})

        }catch(error){
            res.status(500).json(error.message)
        }
    }
}

module.exports = TurmasController;