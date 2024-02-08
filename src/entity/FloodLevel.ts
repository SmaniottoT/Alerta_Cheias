import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Benchmark {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("decimal")
  floodLevel: number;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  reference: string;
}
