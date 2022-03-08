const { Router } = require('express');
const Controller = require('../controller/PessoasController.js');

const router = Router()

router.get("/atendimentos", Controller.FindAll);
router.get("/atendimentos/:id", Controller.FindByID);
router.patch("/atendimentos/:id", Controller.UpdateTable);
router.post("/atendimentos", Controller.CreateValue);
router.delete("/atendimentos/:id", Controller.Delete);

module.exports = router;