const database = require("../models");
const Sequelize = require('sequelize');

const { PessoasServicos } = require('../servicos');
const pessoasServicos = new PessoasServicos();

class PessoasController{
    //this method find all values
    static async FindAllAtived(req, res){
        try{
            const Values = await pessoasServicos.buscarRegisAtivos();
            return res.status(200).json(Values);

        }
        catch(error){
            res.status(400).json(error.message)
        }
    }

    static async FindAll(req, res){
        try{
            const Values = await pessoasServicos.BuscarTodosRegistros();
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

     //this method find values by id
     static async FindbyIdTurmas(req, res){
        const { id } = req.params;
        try{
            const Values = await database.Matriculas.findAndCountAll({where: { 
                turmas_id: Number.parseInt(id),
                status: "confirmado",
                },
                limit: 20,
                order: [['estudante_id', 'ASC']]
            });
            return res.status(200).json(Values);
        }
        catch(error){
            return res.status(400).json(error.message)
        }
    }

    //this method find values by id
    static async findOneMatriculasConfirmadas(req, res){
        const { id } = req.params;
        try{
            const Values = await database.Pessoas.findOne({where: { id: Number.parseInt(id)}});
            const matriculas = await Values.getAulasMatriculadas();
            return res.status(200).json(matriculas);
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
    static async Restaurar(req, res){
        const { id } = req.params;
        try{
            await database.Pessoas.restore({where: {id: Number.parseInt(id)}})
            return res.status(200).json({mensagem: `c??digo ${ id } restaurado com sucesso!`})

        }catch(error){
            res.status(500).json(error.message)
        }
    }

    ///REFERECIAS DE MATRICULAS
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

    //find all from turmas where status: confirmado
    static async FindByIDTurma(req, res){
        const { id } = req.params;
        try{
            const Values = await database.Matriculas.findAndCountAll({where: { 
                turmas_id: Number.parseInt(id), 
                status: "confirmado",
                },
                limit: 3,
                orde: [['estudante_id', 'ASC']]
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
    static async RestaurarMatriculas(req, res){
        const { estudanteId, matriculaId } = req.params;
        try{
            
            await database.Matriculas.restore({where: {id: Number.parseInt(matriculaId)}})
            return res.status(200).json({mensagem: `c??digo ${ matriculaId } restaurado com sucesso!`})

        }catch(error){
            res.status(500).json(error.message)
        }
    }
    static async destivaPessoasEMatriculas(req, res){
        const { id } = req.params;
        try{
            database.sequelize.transaction(async (t)=>{
                await database.Pessoas.update({ativo: false}, {where: {id: Number.parseInt(id)}}, {transaction: t});
                await database.Matriculas.update({status: 'cancelado'}, {where: {estudante_id: Number.parseInt(id)}}, {transaction: t})
                res.status(200).json({mensagem: `O Estudante de n??mero ${id} teve sua matricula e status cancelados com sucesso`})
            })
            
        }catch(error){
            res.status(400).json(error.message)
        }
        
    }
    
}

module.exports = PessoasController;
