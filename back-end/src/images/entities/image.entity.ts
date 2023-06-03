import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// SRC
import { Sneaker } from '../../sneakers/entities/sneaker.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true })
  url: string;

  @ManyToOne(() => Sneaker, (sneaker) => sneaker.images, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  sneaker: Sneaker;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
