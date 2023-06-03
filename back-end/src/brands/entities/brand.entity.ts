import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Sneaker } from '../../sneakers/entities/sneaker.entity';
import { ProductType } from '../../product-types/entities/product-type.entity';

@Entity()
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '', nullable: true })
  desc: string;

  @Column({ default: '', nullable: true })
  titleDesc: string;

  @OneToMany(() => ProductType, (productType) => productType.brand)
  productTypes: ProductType[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
