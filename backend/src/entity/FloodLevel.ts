import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
