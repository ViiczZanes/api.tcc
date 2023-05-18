import { Request, Response, NextFunction, response } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
  sub: string
}

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization

  if (!authToken) return res.status(401).send({ error: 'Token nao fornecido' })

  const parts = authToken.split(' ')

  if (parts.length !== 2) return res.status(401).send({ error: 'Erro no Token' })

  const [prefix, token] = parts

  if (!/^Bearer$/i.test(prefix)) return res.status(401).send({ error: 'Token Mal Formatado' })

  try {
    const { sub } = verify(token, process.env.SECRET_JWT as string) as Payload

    req.user_id = sub
    return next()

  } catch (err) {
    return res.status(401).send({ error: err })
  }

}

export default AuthMiddleware