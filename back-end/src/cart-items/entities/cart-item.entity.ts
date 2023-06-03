import { Sneaker } from '../../sneakers/entities/sneaker.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from '../../carts/entities/cart.entity';
import { Invoice } from '../../invoices/entities/invoice.entity';
@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ default: 0, nullable: true })
  saleOff: number;

  @ManyToOne(() => Cart, (cart) => cart.cartitems, {
    onDelete: 'SET NULL',
  })
  cart: Cart;

  @ManyToOne(() => Invoice, (invoice) => invoice.cartitems, {
    onDelete: 'SET NULL',
  })
  invoice: Invoice;

  @ManyToOne(() => Sneaker, (sneaker) => sneaker.cartItems, {
    onDelete: 'SET NULL',
  })
  sneaker: Sneaker;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
