import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';


interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next:NextFunction) {
  const authToken = request.headers.authorization;

  // Validar se o token está preenchido
  if(!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try{
    // Validação do token
  const { sub } = verify(token, "81479f0f303fa39bac125a32ca6c80ef") as IPayload;

  // Recuperar informações do usuário  
  request.user_id = sub

    return next();
  }catch (err) {
    return response.status(401).end();
  }



}
