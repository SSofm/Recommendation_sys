import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateInvoiceDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
