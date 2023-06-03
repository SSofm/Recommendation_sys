import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// SRC
import { CartItemsService } from './cart-items.service';
import { CartItemsController } from './cart-items.controller';
import { CartItem } from './entities/cart-item.entity';
import { SneakersModule } from '../sneakers/sneakers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartItem]),
    forwardRef(() => SneakersModule),
  ],
  controllers: [CartItemsController],
  providers: [CartItemsService],
  exports: [CartItemsService],
})
export class CartItemsModule {}
