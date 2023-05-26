import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Image } from '../../images/entities/image.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { Cart } from '../../carts/entities/cart.entity';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';
@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  desc: string;

  @Column()
  category: string;

  @Column()
  releasedDate: Date;

  @Column()
  pages: number;

  @Column({ nullable: true })
  stars: number;

  @Column({ nullable: true })
  price: number;

  @OneToMany(() => Image, (image) => image.book, {
    eager: true,
  })
  images: Image[];

  @OneToMany(() => Comment, (comment) => comment.book, {
    eager: true,
  })
  comments: Comment[];
  @OneToMany(() => CartItem, (cartItem) => cartItem.book)
  cartItems: CartItem[];
}
