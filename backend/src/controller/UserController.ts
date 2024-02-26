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

  async getUsers() {
    const userRepository = AppDataSource.getRepository(User);
    const userList = await userRepository.find();
    return userList;
  }

  async getUser(userId: number) {
    const userRepository = AppDataSource.getRepository(User);
    const foundUser = await userRepository.findOne({
      where: { id: userId },
    });
    return foundUser;
  }

  async updateUser(
    userId: number,
    email: string,
    photo: string,
    password: string
  ) {
    const userRepository = AppDataSource.getRepository(User);
    const userToUpdate = await this.getUser(userId);
    if (!userToUpdate) {
      throw new Error("User not found.");
    }
    userToUpdate.email = email;
    userToUpdate.photo = photo;
    userToUpdate.password = await bcrypt.hash(password, 10);

    return await userRepository.save(userToUpdate);
  }

  async associateUserBenchmark(userId: number, benchmarkId: number) {
    const associatedBenchmarkRepository =
      AppDataSource.getRepository(UserToBenchmark);
    const benchmarkRepository = AppDataSource.getRepository(Benchmark);

    const foundUser = await this.getUser(userId);

    const foundBenchmark = await benchmarkRepository.findOne({
      where: { id: benchmarkId },
    });

    if (!foundUser || !foundBenchmark) {
      throw new Error("User or Benchmark not found.");
    }
    const associatedBenchmarkExists =
      await associatedBenchmarkRepository.findOne({
        where: { user: { id: userId }, benchmark: { id: benchmarkId } },
      });

    if (associatedBenchmarkExists) {
      throw new Error("Benchmark is already associated with the User.");
    }
    const associatedUserBenchmark = new UserToBenchmark();
    associatedUserBenchmark.user = foundUser;
    associatedUserBenchmark.benchmark = foundBenchmark;
    associatedUserBenchmark.alert = 1;
    return await associatedBenchmarkRepository.save(associatedUserBenchmark);
  }

  async getAssociatedBenchmarks(userId: number) {
    const associatedBenchmarkRepository =
      AppDataSource.getRepository(UserToBenchmark);
    const userRepository = AppDataSource.getRepository(User);

    const foundUser = await userRepository.findOne({
      where: { id: userId },
    });

    if (!foundUser) {
      throw new Error("User or Benchmark not found.");
    }

    const associatedList = await associatedBenchmarkRepository.find({
      where: { user: foundUser },
      order: {},
      relations: { user: true, benchmark: true },
    });
    return associatedList;
  }

  async disassociateUserToBenchmark(userId: number, benchmarkId: number) {
    const associatedBenchmarkRepository =
      AppDataSource.getRepository(UserToBenchmark);
    const userRepository = AppDataSource.getRepository(User);
    const benchmarkRepository = AppDataSource.getRepository(Benchmark);

    const foundUser = await userRepository.findOne({
      where: { id: userId },
    });
    const foundBenchmark = await benchmarkRepository.findOne({
      where: { id: benchmarkId },
    });

    if (!foundUser || !foundBenchmark) {
      throw new Error("User or Benchmark not found.");
    }
    const benchmarkToDisassociate = await associatedBenchmarkRepository.findOne(
      {
        where: {
          user: foundUser,
          benchmark: foundBenchmark,
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
