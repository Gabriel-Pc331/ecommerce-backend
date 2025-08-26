import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('categoty')
export class category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 60, nullable: false })
    name: string;
}