import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Benchmark } from "./FloodLevel";

@Entity()
export class UserToBenchmark {
  @PrimaryGeneratedColumn()
  public UserToBenchmarkId: number;

  @Column()
  public alert: number;

  @ManyToOne(() => User, (user) => user.userToBenchmark)
  public user: User;

  @ManyToOne(() => Benchmark, (benchmark) => benchmark.userToBenchmark)
  public benchmark: Benchmark;
}
