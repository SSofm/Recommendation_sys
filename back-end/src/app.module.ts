import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { configEnvPath } from './common/helper/env.helper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigSerivce } from './common/shared/typeorm/typeorm.service';
import { ImagesModule } from './images/images.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MulterModule } from '@nestjs/platform-express';
import { CommentsModule } from './comments/comments.module';
import { CartsModule } from './carts/carts.module';
import { InvoicesModule } from './invoices/invoices.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(configEnvPath),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigSerivce }),
    EventEmitterModule.forRoot(),
    MulterModule.register({
      dest: './files',
    }),
    BooksModule,
    UsersModule,
    ImagesModule,
    CommentsModule,
    CartsModule,
    InvoicesModule,
    CartItemsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
