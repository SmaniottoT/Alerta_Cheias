import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserToFloodLevel {
    @PrimaryGeneratedColumn()
        public UserToFloodLevelId: number,

    }
}