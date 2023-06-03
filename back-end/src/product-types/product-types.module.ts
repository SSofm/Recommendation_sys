import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// SRC
import { ProductTypesService } from './product-types.service';
import { ProductTypesController } from './product-types.controller';
import { ProductType } from './entities/product-type.entity';
import { BrandsModule } from '../brands/brands.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductType]), BrandsModule],
  controllers: [ProductTypesController],
  providers: [ProductTypesService],
  exports: [ProductTypesService],
})
export class ProductTypesModule {}
