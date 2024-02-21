import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserNotFoundException } from "../exceptions/UserNotFoundException";
import { UnauthorizedUserException } from "../exceptions/UnauthUserException";
import { EmptyInputException } from "../exceptions/EmptyInputException";

const SECRET_KEY = "senha_secreta_que_NÃO_deve_ficar_salva_aqui";

// VER COM O IVENS COMO SALVAR ESSA INFO FORA DO CÓDIGO E TRAZER DE VOLTA

interface DecodedTokenPayload extends JwtPayload {
  userId: number;
}

export class SessionController {
  async login(username: string, password: string) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ username });

    if (!username || !password) {
      throw new EmptyInputException();
    }

    if (!user) {
      throw new UserNotFoundException();
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new UserNotFoundException();
    }

    return jwt.sign({ userId: user.id }, SECRET_KEY);
  }

  verifyToken(token?: string) {
    if (!token) {
      throw new UnauthorizedUserException();
    }
    try {
      const jwtPayload = jwt.verify(token, SECRET_KEY) as DecodedTokenPayload;
      return jwtPayload;
    } catch (error) {
      throw new UnauthorizedUserException();
    }
  }
}
