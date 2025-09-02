import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { City } from "../cities/city.entity"; // <-- caminho corrigido

@Entity('customer')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60, nullable: false })
  name: string;

  @Column({ length: 250, nullable: false })
  address: string;

  @Column({ length: 8, nullable: false })
  zipcode: string;

  @Column({ type: 'uuid', nullable: false })
  cityId: string;

  @ManyToOne(() => City, { onDelete: 'CASCADE' }) // <-- sem inverse side
  @JoinColumn({ name: 'cityId' })
  city: City;
}
