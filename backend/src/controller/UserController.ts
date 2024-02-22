import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import { UsernameTakenException } from "../exceptions/UsernameTakenException";
import { EmptyInputException } from "../exceptions/EmptyInputException";

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
    if (!username || !name || !email || !password) {
      throw new EmptyInputException();
    }
    if (userExists) {
      throw new UsernameTakenException();
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

  async associateUserBenchmark(userId: number, benchmarkId: number) {
    const associatedBenchmarkRepository = AppDataSource.getRepository(Notifier);
    const userRepository = AppDataSource.getRepository(User);
    const benchmarkRepository = AppDataSource.getRepository(Benchmark);

    const user = await userRepository.find({
      where: { id: userId },
    });
    const benchmark = await benchmarkRepository.find({
      where: { id: benchmarkId },
    });

    if (!user || !benchmark) {
      throw new Error("User or Benchmark not found.");
    }
    const associatedBenchmarkExists =
      await associatedBenchmarkRepository.existsBy({
        userId,
        benchmarkId,
      });

    if (associatedBenchmarkExists) {
      throw new Error("Benchmark is already associated with the User.");
    }
    // const associatedUserBenchmark = new Notifier(); isso aqui tem que ser a nova entidade many to many UserBenchmark
    associatedUserBenchmark.userId = userId;
    associatedUserBenchmark.benchmarkId = benchmarkId;
    return await associatedBenchmarkRepository.save(associatedUserBenchmark);
  }

  async getAssociatedBenchmarks(userId: number) {
    const associatedBenchmarkRepository =
      AppDataSource.getMongoRepository(Notifier);
    const associatedList = await associatedBenchmarkRepository.find({
      where: { id: userId },
      order: {},
    });
    return associatedList;
  }
}
