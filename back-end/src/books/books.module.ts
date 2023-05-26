import { Module, forwardRef } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { ImagesModule } from '../images/images.module';
import { CartsModule } from '../carts/carts.module';
import { CartItemsModule } from '../cart-items/cart-items.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    forwardRef(() => ImagesModule),
    forwardRef(() => CartsModule),
    forwardRef(() => CartItemsModule),
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
