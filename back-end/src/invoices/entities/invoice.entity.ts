import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// SRC
import { CartItem } from '../../cart-items/entities/cart-item.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CartItem, (cartitem) => cartitem.invoice, {
    eager: true,
  })
  cartitems: CartItem[];

  @ManyToOne(() => User, (user) => user.invoices)
  user: User;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
