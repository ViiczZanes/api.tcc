import express from 'express';

let PORT = 3333

const app = express();


app.listen(PORT, ()=> console.log(`Servidor Rodando em: http://localhost:${PORT}`))