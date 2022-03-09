const { Router } = require('express');
const { FindByIDMatricula } = require('../controller/PessoasController.js');
const Controller = require('../controller/PessoasController.js');

const router = Router()

router.get("/atendimentos", Controller.FindAll);
router.get("/atendimentos/:id", Controller.FindByID);
router.patch("/atendimentos/:id", Controller.UpdateTable);
router.post("/atendimentos", Controller.CreateValue);
router.delete("/atendimentos/:id", Controller.Delete);

router.get("/atendimentos/:estudanteId/matriculas/:matriculaId", FindByIDMatricula);
router.post("/atendimentos/:id/matriculas", Controller.CreateValueMatricula);
router.patch('/atendimentos/:estudanteId/matriculas/:matriculaId', Controller.UpdateTableMatricula);
router.delete('/atendimentos/:estudanteId/matriculas/:matriculaId', Controller.DeleteMatriculas)


module.exports = router;