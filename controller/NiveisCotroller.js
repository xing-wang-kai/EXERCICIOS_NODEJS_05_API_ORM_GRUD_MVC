const database = require("../models");

class NiveisController{
    //this method find all values
    static async FindAllNiveis(req, res){
        try{
            const Values = await database.Niveis.findAll();
            return res.status(200).json(Values);

        }
        catch(error){
            res.status(400).json(error.message)
        }
    }
    //this method find values by id
    static async FindByIDNiveis(req, res){
        const { id } = req.params;
        try{
            const Values = await database.Niveis.findOne({where: { id: Number.parseInt(id)}});
            return res.status(200).json(Values);
        }
        catch(error){
            return res.status(400).json(error.message)
        }
    }
    //this method patch new values in the table
    static async UpdateTableNiveis(req, res){
        const Value = req.body;
        const { id } = req.params;
        try{
            await database.Niveis.update(Value, {where: {id: Number.parseInt(id)}});
            const values = await database.Niveis.findOne({where: {id: Number.parseInt(id)}})
            return res.status(200).json(values);
        }catch(error){
            return res.status(400).json(error.message);
        }
        
    }
    //this method post new values in the table
    static async CreateValueNiveis(req, res){
        const value = req.body;
        try{
            const values = await database.Niveis.create(value);
            return res.status(200).json(value);
        }catch(error){
            return res.status(400).json(value);
        }
    }  
    //this method delete one item int the table
    static async DeleteNiveis(req, res){
        const { id } = req.params;
        try{
            await database.Niveis.destroy({where: {id: Number.parseInt(id)}});
            const newres = {messagem: `dados deletados com sucesso no id ${id}`};
            res.status(200).json(newres);
        }catch(error){
            return res.status(400).json(error.message)
        }
    }
}

module.exports = NiveisController;