import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare} from 'bcryptjs';
import { sign } from 'jsonwebtoken';


interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {

  async execute({email, password}: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    //Verificar se o email existe
    const user = await usersRepositories.findOne({
      email
    });

    if(!user) {
      throw new Error("Incorrect Email/Password")
    }

    // Verificar se a senha está correta
    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch){
      throw new Error("Incorrect Email/Password")
    }

    // Gerar Token
    const token = sign({
      email: user.email
    }, "81479f0f303fa39bac125a32ca6c80ef", {
      subject: user.id,
      expiresIn: "5d"
    })

    return token;
  }
}

export { AuthenticateUserService }