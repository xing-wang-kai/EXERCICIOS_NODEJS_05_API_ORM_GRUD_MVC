const database = require("../models");

class PessoasController{
    //this method find all values
    static async FindAll(req, res){
        try{
            const Values = await database.Pessoas.findAll();
            return res.status(200).json(Values);

        }
        catch(error){
            res.status(400).json(error.message)
        }
    }
    //this method find values by id
    static async FindByID(req, res){
        const { id } = req.params;
        try{
            const Values = await database.Pessoas.findOne({where: { id: Number.parseInt(id)}});
            return res.status(200).json(Values);
        }
        catch(error){
            return res.status(400).json(error.message)
        }
    }
    //this method patch new values in the table
    static async UpdateTable(req, res){
        const Value = req.body;
        const { id } = req.params;
        try{
            await database.Pessoas.update(Value, {where: {id: Number.parseInt(id)}});
            const values = await database.Pessoas.findOne({where: {id: Number.parseInt(id)}})
            return res.status(200).json(values);
        }catch(error){
            return res.status(400).json(error.message);
        }
        
    }
    //this method post new values in the table
    static async CreateValue(req, res){
        const value = req.body;
        try{
            const values = await database.Pessoas.create(value);
            return res.status(200).json(values);
        }catch(error){
            return res.status(400).json(value);
        }
    }  
    //this method delete one item int the table
    static async Delete(req, res){
        const { id } = req.params;
        try{
            await database.Pessoas.destroy({where: {id: Number.parseInt(id)}});
            const newres = {messagem: `dados deletados com sucesso no id ${id}`};
            res.status(200).json(newres);
        }catch(error){
            return res.status(400).json(error.message)
        }
    }
    //find all from matriculas
    static async FindByIDMatricula(req, res){
        const { estudanteId, matriculaId } = req.params;
        try{
            const Values = await database.Matriculas.findOne({where: { 
                id: Number.parseInt(matriculaId), 
                estudante_id: Number.parseInt(estudanteId)}
            });
            return res.status(200).json(Values);
        }
        catch(error){
            return res.status(400).json(error.message)
        }
    }
    //create a new from matriculas
    static async CreateValueMatricula(req, res){
        const { id } = req.params
        const value = {...req.body, estudante_id: Number.parseInt(id)};
        try{
            const values = await database.Matriculas.create(value);
            return res.status(200).json(values);
        }catch(error){
            return res.status(400).json(value);
        }
    } 
    //method take a old value then update that one
    static async UpdateTableMatricula(req, res){
        const Value = req.body;
        const { estudanteId, matriculaId } = req.params;
        try{
            await database.Matriculas.update(Value, {where: 
                {id: Number.parseInt(matriculaId),
                    estudante_id: Number.parseInt(estudanteId)
                    }});
            const values = await database.Matriculas.findOne({
                where: {id: Number.parseInt(matriculaId)}})
            return res.status(200).json(values);
        }catch(error){
            return res.status(400).json(error.message);
        }
        
    }
    //method Delete from matriculas
    static async DeleteMatriculas(req, res){
        const { estudanteId, matriculaId } = req.params;
        try{
            await database.Matriculas.destroy({where: {id: Number.parseInt(matriculaId)}});
            const newres = {messagem: `dados deletados com sucesso no id ${matriculaId}`};
            res.status(200).json(newres);
        }catch(error){
            return res.status(400).json(error.message)
        }
    }
}

module.exports = PessoasController;