import { Module, forwardRef } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { UsersModule } from '../users/users.module';
import { SneakersModule } from '../sneakers/sneakers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart]),
    forwardRef(() => UsersModule),
    forwardRef(() => SneakersModule),
  ],
  controllers: [CartsController],
  providers: [CartsService],
  exports: [CartsService],
})
export class CartsModule {}
