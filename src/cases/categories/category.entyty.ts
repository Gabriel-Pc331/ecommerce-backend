import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export class category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 60, nullable: false })
    name: string;
}