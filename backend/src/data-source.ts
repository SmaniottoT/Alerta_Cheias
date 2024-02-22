import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Benchmark } from "./entity/FloodLevel";
import { UserToBenchmark } from "./entity/UserToFloodLevel";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Smaniotto!96",
  database: "alerta_cheias",
  synchronize: true,
  logging: false,
  entities: [User, Benchmark, UserToBenchmark],
  migrations: [],
  subscribers: [],
});
