import { IsNotEmpty, IsNumber } from 'class-validator';

export class CartIdDTO {
  @IsNotEmpty()
  @IsNumber()
  cartId: number;
}
