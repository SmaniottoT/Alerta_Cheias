import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = "senha_secreta_que_NÃO_deve_ficar_salva_aqui";

// VER COM O IVENS COMO SALVAR ESSA INFO FORA DO CÓDIGO E TRAZER DE VOLTA

interface DecodedTokenPayload extends JwtPayload {
  userId: number;
}

export class SessionController {
  async login(username: string, password: string) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ username });

    if (!user) {
      throw new Error("Username or password invalid!");
    }
    const validPassword = await bcrypt.compare(password, (await user).password);

    if (!validPassword) {
      throw new Error("Username or password invalid!");
    }

    return jwt.sign({ userId: user.id }, SECRET_KEY);
  }

  verifyToken(token?: string) {
    if (!token) {
      throw new Error("User not authenticated!");
    }
    try {
      const jwtPayload = jwt.verify(token, SECRET_KEY) as DecodedTokenPayload;
      return jwtPayload;
    } catch (error) {
      throw new Error("Invalid token!");
    }
  }
}
