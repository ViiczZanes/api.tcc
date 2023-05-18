import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors'
import cors from 'cors'
import morgan from 'morgan'
import { router } from './routes';

let PORT = process.env.PORT ? Number(process.env.PORT) : 3333

const app = express();

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(router)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) return res.status(400).json({ error: err.message })

    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error.'
    })
})

app.listen(PORT, () => console.log(`Servidor Rodando em: http://localhost:${PORT}`))