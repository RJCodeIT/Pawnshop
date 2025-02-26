import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from './customer.model';

// Definicja typu enum dla TransactionType
export enum TransactionType {
  PAWN = 'pawn',
  SALE = 'sale',
  REDEEMED = 'redeemed',
  SOLD = 'sold',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  productName!: string;

  @Column({ type: 'text', nullable: false })
  productDescription!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  category!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  brand?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  productModel?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  serialNumber?: string;

  @Column({ type: 'int', nullable: true })
  yearOfProduction?: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  technicalCondition!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  purchasePrice!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  salePrice?: number;

  @Column({ type: 'varbinary', length: 'max', nullable: true })
  productImage?: Buffer;

  @Column({ type: 'text', nullable: true })
  additionalNotes?: string;

  // Typ enum mapowany na varchar
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  transactionType!: TransactionType;

  @Column({ type: 'date', nullable: false })
  dateOfReceipt!: Date;

  @Column({ type: 'date', nullable: true })
  redemptionDeadline?: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  loanValue?: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  interestRate?: number;

  @ManyToOne(() => Customer, (customer) => customer.products, { nullable: false })
  client!: Customer;
}
