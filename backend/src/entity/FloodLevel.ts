import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { UserToBenchmark } from "./UserToFloodLevel";

@Entity()
export class Benchmark {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("decimal")
  floodLevel: number;

  @Column()
  street: string;

  @Column("decimal")
  lat: number;

  @Column("decimal")
  long: number;

  @ManyToMany(() => User, (User) => User.id)
  user: User[];

  @OneToMany(
    () => UserToBenchmark,
    (userToBenchmark) => userToBenchmark.benchmark
  )
  userToBenchmark: UserToBenchmark[];
}
