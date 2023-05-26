import { IsNotEmpty, IsNumber } from 'class-validator';

export class CartItemDTO {
  @IsNotEmpty()
  @IsNumber()
  cartId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
