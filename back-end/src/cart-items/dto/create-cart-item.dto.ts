import { IsNumber } from 'class-validator';
export class CreateCartItemDto {
  @IsNumber()
  quantity: number;
}
