import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

interface Payload {
  sub: string
}


const verifyToken = (req: Request): JwtPayload => {
  const authToken = req.headers.authorization;

  if (!authToken) {
    throw new Error('Token não fornecido');
  }

  const parts = authToken.split(' ')

  if (parts.length !== 2) throw new Error('Token Mal Fomado');

  const [prefix, token] = parts


  try {
    const decodedToken = verify(token, process.env.SECRET_JWT as string) as Payload

    return decodedToken as JwtPayload;
  } catch (error) {
    throw new Error('Token inválido');
  }
};

const Permission = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const decodedToken = verifyToken(req);

      if (!roles.includes(decodedToken.role)) {
        return res.status(403).json({ message: 'Acesso negado' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  };
};

export default Permission;
