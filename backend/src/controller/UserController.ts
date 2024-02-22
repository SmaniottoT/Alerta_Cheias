import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import { UsernameTakenException } from "../exceptions/UsernameTakenException";
import { EmptyInputException } from "../exceptions/EmptyInputException";
import { Benchmark } from "../entity/FloodLevel";
import { UserToBenchmark } from "../entity/UserToFloodLevel";

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
    const associatedBenchmarkRepository =
      AppDataSource.getRepository(UserToBenchmark);
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
    const associatedUserBenchmark = new UserToBenchmark();
    associatedUserBenchmark.userId = userId;
    associatedUserBenchmark.benchmarkId = benchmarkId;
    associatedUserBenchmark.alert = 1;
    return await associatedBenchmarkRepository.save(associatedUserBenchmark);
  }

  async getAssociatedBenchmarks(userId: number) {
    const associatedBenchmarkRepository =
      AppDataSource.getRepository(UserToBenchmark);
    const associatedList = await associatedBenchmarkRepository.find({
      where: { userId: userId },
      order: {},
    });
    return associatedList;
  }

  async disassociateUserToBenchmark(userId: number, benchmarkId: number) {
    const associatedBenchmarkRepository =
      AppDataSource.getRepository(UserToBenchmark);
    const benchmarkToDisassociate = await associatedBenchmarkRepository.findOne(
      {
        where: {
          userId: userId,
          benchmarkId: benchmarkId,
        },
      }
    );
    if (!benchmarkToDisassociate) {
      throw new Error("Unable to find User or Benchmark to disassociate.");
    }
    const disassociatedBenchmark = associatedBenchmarkRepository.delete(
      benchmarkToDisassociate
    );
    return disassociatedBenchmark;
  }
}
