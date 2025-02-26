import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

// Definicja typu Role jako enum
export enum Role {
  ADMIN = "admin",
  EMPLOYEE = "employee",
}

@Entity("employees")
export class Employee {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  firstName!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  lastName!: string;

  @Column({ type: "varchar", length: 11, nullable: false, unique: true })
  pesel!: string;

  @Column({ type: "date", nullable: false })
  dateOfBirth!: Date;

  @Column({ type: "varchar", length: 255, nullable: false })
  street!: string;

  @Column({ type: "varchar", length: 10, nullable: false })
  houseNumber!: string;

  @Column({ type: "varchar", length: 6, nullable: false })
  postalCode!: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  city!: string;

  @Column({ type: "varchar", length: 3, nullable: false })
  idSeries!: string;

  @Column({ type: "varchar", length: 10, nullable: false, unique: true })
  idNumber!: string;

  @Column({ type: "varchar", length: 15, nullable: false })
  phoneNumber!: string;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 50, nullable: false, unique: true })
  login!: string;

  @Column({ type: "varchar", nullable: false })
  password!: string;

  // Typ role jako varchar z mapowaniem na enum
  @Column({ type: "varchar", length: 20, nullable: false })
  role!: Role;
}
