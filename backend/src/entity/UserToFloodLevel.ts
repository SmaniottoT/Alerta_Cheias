import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserToFloodLevel {
  @PrimaryGeneratedColumn()
  public UserToFloodLevelId: number;

  @Column()
  public userId: number

  @Column()
  public benchmarkId: number

  @Column()
  public alert: number
  
}
