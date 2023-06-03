import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// SRC
import { Brand } from '../../brands/entities/brand.entity';
import { Sneaker } from '../../sneakers/entities/sneaker.entity';

@Entity()
export class ProductType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  desc: string;

  @ManyToOne(() => Brand, (brand) => brand.productTypes)
  brand: Brand;

  @OneToMany(() => Sneaker, (sneaker) => sneaker.productType)
  sneakers: Sneaker[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
