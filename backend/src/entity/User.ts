import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Benchmark } from "./FloodLevel";
import { UserToBenchmark } from "./UserToFloodLevel";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Benchmark, (Benchmark) => Benchmark.id)
  @JoinTable()
  benchmark: Benchmark[];

  @OneToMany(() => UserToBenchmark, (userToBenchmark) => userToBenchmark.user)
  userToBenchmark: UserToBenchmark[];
}
