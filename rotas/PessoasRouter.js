const { Router } = require('express');
const { FindByIDMatricula, FindbyIdTurmas } = require('../controller/PessoasController.js');
const Controller = require('../controller/PessoasController.js');

const router = Router()

router.get("/atendimentos", Controller.FindAll);
router.get("/atendimentos/validar", Controller.FindAllAtived);
router.get("/atendimentos/:id", Controller.FindByID);


router.patch("/atendimentos/:id", Controller.UpdateTable);
router.post("/atendimentos", Controller.CreateValue);
router.delete("/atendimentos/:id", Controller.Delete);
router.post('/atendimentos/:id/restaurar', Controller.Restaurar)


router.get("/atendimentos/:estudanteId/matriculas/:matriculaId", FindByIDMatricula);
router.get('/atendimentos/matriculas/:id/confirmados', FindbyIdTurmas);
router.get('/atendimentos/:id/confirmados', Controller.findOneMatriculasConfirmadas);
router.get('/atendimentos/:id/byturmas', Controller.FindByIDTurma)

router.post("/atendimentos/:id/matriculas", Controller.CreateValueMatricula);
router.patch('/atendimentos/:estudanteId/matriculas/:matriculaId', Controller.UpdateTableMatricula);
router.patch('/atendimentos/:id/desativar', Controller.destivaPessoasEMatriculas)

router.delete('/atendimentos/:estudanteId/matriculas/:matriculaId', Controller.DeleteMatriculas)
router.post('/atendimentos/:estudanteId/matriculas/:matriculaId', Controller.RestaurarMatriculas)


module.exports = router;