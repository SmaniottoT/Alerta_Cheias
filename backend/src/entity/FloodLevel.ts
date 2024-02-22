import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

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
}
