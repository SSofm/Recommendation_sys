import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// SRC
import { SneakersController } from './sneakers.controller';
import { Sneaker } from './entities/sneaker.entity';
import { ImagesModule } from '../images/images.module';
import { CartsModule } from '../carts/carts.module';
import { CartItemsModule } from '../cart-items/cart-items.module';
import { ProductTypesModule } from '../product-types/product-types.module';
import { SneakersService } from './sneakers.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sneaker]),
    forwardRef(() => ImagesModule),
    forwardRef(() => CartsModule),
    forwardRef(() => CartItemsModule),
    ProductTypesModule,
  ],
  controllers: [SneakersController],
  providers: [SneakersService],
  exports: [SneakersService],
})
export class SneakersModule {}
