const { Router } = require('express');
const Controller = require('../controller/NiveisCotroller.js');

const router = Router()

router.get("/niveis", Controller.FindAllNiveis);
router.get("/niveis/:id", Controller.FindByIDNiveis);
router.patch("/niveis/:id", Controller.UpdateTableNiveis);
router.post("/niveis", Controller.CreateValueNiveis);
router.delete("/niveis/:id", Controller.DeleteNiveis);

module.exports = router;