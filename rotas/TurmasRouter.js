const { Router } = require('express');
const Controller = require('../controller/TurmasController.js');

const router = Router()

router.get("/turmas", Controller.FindAllTurmas);
router.get("/turmas/:id", Controller.FindByIDTurmas);
router.patch("/turmas/:id", Controller.UpdateTableTurmas);
router.post("/turmas", Controller.CreateValueTurmas);
router.delete("/turmas/:id", Controller.DeleteTurmas);

module.exports = router;