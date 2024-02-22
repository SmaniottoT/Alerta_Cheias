import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Benchmark } from "./FloodLevel";
import { User } from "./User";
import { UserToBenchmark } from "./UserToFloodLevel";

@Entity()
export class Notifier {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserToBenchmark, (userToBenchmark) => userToBenchmark.user)
  benchmark: number;

  @ManyToOne(() => UserToBenchmark, (userToBenchmark) => userToBenchmark.benchmark)
  user: number;
}
