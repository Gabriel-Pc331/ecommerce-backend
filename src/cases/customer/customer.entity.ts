import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { City } from "../cities/entities/city.entity";

@Entity('costumer')
export class Costumer {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 60, nullable: false })
    name: string;

    @Column({ length: 250 })
    address: string;

    @Column({ length: 8 })
    zipcode: string;

    @ManyToOne(() => City, { eager: true, nullable: false })
    city: City;
}