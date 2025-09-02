import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('city')
export class City {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 60, nullable: false })
    name: string;

    @Column({ length: 2, nullable: false })
    ibge: string;
}
