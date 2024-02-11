import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import bcrypt from "bcrypt";


export class UserController {
  async createUser(
    username: string,
    name: string,
    email: string,
    password: string
  ) {
    const userRepository = AppDataSource.getRepository(User);
    const userExists = await userRepository.existsBy({
      username,
    });
    if (userExists) {
      throw new Error(
        "Username already in use. Please, choose a diferent username."
      );
    }
    const user = new User();
    user.username = username;
    user.name = name;
    user.email = email;
    user.password = await bcrypt.hash(password, 10);

    return await userRepository.save(user);
  }

  async getUser() {
    const userRepository = AppDataSource.getRepository(User);
    const userList = await userRepository.find();
    return userList;
  }
}
