import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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

  @OneToMany(
    () => UserToBenchmark,
    (userToBenchmark) => userToBenchmark.benchmark
  )
  userToBenchmark: UserToBenchmark[];
}
