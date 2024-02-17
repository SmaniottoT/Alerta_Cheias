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
      lat,
      long
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

  async fetchCurrentLevel() {
    try {
      const response = await axios.post(
        "https://monitoramento.defesacivil.sc.gov.br/graphql",
        {
          operationName: "ListaEstacoes",
          variables: {},
          query: `query ListaEstacoes {\n  estacoes {\n    nome\n    nivel_rio\n       }\n}`,
        }
      );
      console.log(response);
    } catch (error) {
      throw new Error(`Failed to fetch current River Level: ${error}`);
    }
  }

  //   PRECISO DE UMA FUNÇÃO QUE A PARTIR DO POST ACIMA CONSIGA DISTINGUIR A ESTAÇÃO POR NOME, CONFORME OS PRESETS (if no html Timbó, buscar nome = "DCSC Timbó 1")

  async compareRiverLevel(benchmark: number, currentRiverLevel: number) {
    if (currentRiverLevel < benchmark) {
      console.log("Not flooding");
    } else {
      console.log("Flooding");
    }
  }
}
