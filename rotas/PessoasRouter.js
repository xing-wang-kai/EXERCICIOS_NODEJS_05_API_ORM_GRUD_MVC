const { Router } = require('express');
const { FindByIDMatricula, FindbyIdTurmas } = require('../controller/PessoasController.js');
const Controller = require('../controller/PessoasController.js');

const router = Router()

router.get("/atendimentos", Controller.FindAll);
router.get("/atendimentos/validar", Controller.FindAllAtived)
router.get("/atendimentos/:id", Controller.FindByID);
router.get('/atendimentos/:id/MatriculaConfimadas', Controller.findOneMatriculasConfirmadas)
router.patch("/atendimentos/:id", Controller.UpdateTable);
router.post("/atendimentos", Controller.CreateValue);
router.delete("/atendimentos/:id", Controller.Delete);
router.post('/atendimentos/:id/restaurar', Controller.Restaurar)


router.get("/atendimentos/:estudanteId/matriculas/:matriculaId", FindByIDMatricula);
router.get('/atendimentos/matriculas/:id/confirmados', FindbyIdTurmas);
router.post("/atendimentos/:id/matriculas", Controller.CreateValueMatricula);
router.patch('/atendimentos/:estudanteId/matriculas/:matriculaId', Controller.UpdateTableMatricula);
router.delete('/atendimentos/:estudanteId/matriculas/:matriculaId', Controller.DeleteMatriculas)
router.post('/atendimentos/:estudanteId/matriculas/:matriculaId', Controller.RestaurarMatriculas)


module.exports = router;