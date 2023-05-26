import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CommentsModule } from '../comments/comments.module';
import { CartsModule } from '../carts/carts.module';
import { TokenService } from './services/token.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => CommentsModule),
    forwardRef(() => CartsModule),
    JwtModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, TokenService],
  exports: [UsersService, TokenService],
})
export class UsersModule {}
