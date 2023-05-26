import { Book } from './../../books/entities/book.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
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

  @ManyToOne(() => Book, (book) => book.cartItems, {
    onDelete: 'SET NULL',
  })
  book: Book;
}
