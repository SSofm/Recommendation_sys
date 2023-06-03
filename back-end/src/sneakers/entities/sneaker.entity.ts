import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

// SRC
import { Image } from '../../images/entities/image.entity';
import { Comment } from '../../comments/entities/comment.entity';
import { CartItem } from 'src/cart-items/entities/cart-item.entity';
import { ProductType } from '../../product-types/entities/product-type.entity';

@Entity()
export class Sneaker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  productCode: string;

  @Column({ nullable: true })
  desc: string;

  @Column({ default: 0, nullable: true })
  stars: number;

  @Column({ nullable: true })
  price: number;

  @OneToMany(() => Image, (image) => image.sneaker, {
    eager: true,
  })
  images: Image[];

  @OneToMany(() => Comment, (comment) => comment.book, {
    eager: true,
  })
  comments: Comment[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.sneaker)
  cartItems: CartItem[];

  @ManyToOne(() => ProductType, (productType) => productType.sneakers)
  productType: ProductType;
}
