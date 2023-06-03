import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// SRC
import { User } from '../../users/entities/user.entity';
import { Sneaker } from '../../sneakers/entities/sneaker.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  star: number;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.comments, {
    eager: true,
    onDelete: 'SET NULL',
  })
  user: User;

  @ManyToOne(() => Sneaker, (book) => book.comments, {
    onDelete: 'SET NULL',
  })
  book: Sneaker;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
