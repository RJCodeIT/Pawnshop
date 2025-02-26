import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.model';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  firstName!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  lastName!: string;

  @Column({ type: 'varchar', length: 11, nullable: false, unique: true })
  pesel!: string;

  @Column({ type: 'date', nullable: false })
  dateOfBirth!: Date;

  @Column({ type: 'varchar', length: 255, nullable: false })
  street!: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  houseNumber!: string;

  @Column({ type: 'varchar', length: 6, nullable: false })
  postalCode!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  city!: string;

  @Column({ type: 'varchar', length: 3, nullable: false })
  idSeries!: string;

  @Column({ type: 'varchar', length: 10, nullable: false, unique: true })
  idNumber!: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phoneNumber?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @OneToMany(() => Product, (product) => product.client)
  products!: Product[];
}