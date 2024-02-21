import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notifier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  benchmarkId: number;
}
