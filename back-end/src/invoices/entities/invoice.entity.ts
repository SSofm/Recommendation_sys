import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_at: Date;
}
