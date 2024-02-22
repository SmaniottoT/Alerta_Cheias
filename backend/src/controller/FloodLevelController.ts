import axios from "axios";
import { AppDataSource } from "../data-source";
import { Benchmark } from "../entity/FloodLevel";

export class FloodLevelController {
  async createBenchmark(
    floodLevel: number,
    street: string,
    lat: number,
    long: number
  ) {
    const benchmarkRepository = AppDataSource.getRepository(Benchmark);
    const benchmarkExists = await benchmarkRepository.existsBy({
      floodLevel,
      street,
      lat,
      long,
    });

    if (benchmarkExists) {
      throw new Error("Benchmark already exists in the database.");
    }

    const benchmark = new Benchmark();
    benchmark.floodLevel = floodLevel;
    benchmark.street = street;
    benchmark.lat = lat;
    benchmark.long = long;

    return await benchmarkRepository.save(benchmark);
  }

  async getBenchmark() {
    const benchmarkRepository = AppDataSource.getRepository(Benchmark);
    const benchmarkList = await benchmarkRepository.find();
    return benchmarkList;
  }
}
