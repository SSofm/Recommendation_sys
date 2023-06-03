import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// SRC
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { Image } from './entities/image.entity';
import { SneakersModule } from '../sneakers/sneakers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]),
    forwardRef(() => SneakersModule),
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
  exports: [ImagesService],
})
export class ImagesModule {}
