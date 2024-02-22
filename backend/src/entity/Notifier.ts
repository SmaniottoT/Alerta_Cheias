import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Benchmark } from "./FloodLevel";
import { User } from "./User";

@Entity()
export class Notifier {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Benchmark, (benchmark) => benchmark.id)
  benchmarkId: number;

  @ManyToOne(() => User, (user) => user.id)
  userId: number;
}
