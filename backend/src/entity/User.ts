import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
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

  @OneToMany(() => UserToBenchmark, (userToBenchmark) => userToBenchmark.user)
  userToBenchmark: UserToBenchmark[];
}
