import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CartItem } from '../../cart-items/entities/cart-item.entity';
@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CartItem, (cartitem) => cartitem.cart, {
    eager: true,
  })
  cartitems: CartItem[];
}
