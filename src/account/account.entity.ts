import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdOn: Date;

  @Column()
  owner: string;

  @Column({ type: 'datetime', nullable: true })
  updatedOn: Date | null;
}
