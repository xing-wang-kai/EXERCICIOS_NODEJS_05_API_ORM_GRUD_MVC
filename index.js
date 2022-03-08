
const express = require('express');
const app = express();

const router = require('./rotas')

router(app)

const port = 3001
app.listen( port, ()=>{
    console.log(`Conectado com sucesso na porta ${port}`)
} );