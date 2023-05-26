import { IsString, IsNotEmpty, IsObject, IsOptional } from 'class-validator';
import { Cart } from '../../carts/entities/cart.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  age: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  cart: Cart;
}
