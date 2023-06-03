import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

// SHARED
import { IProductType } from '@shared/interfaces/product-type/product-type.interface';

export class CreateSneakerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  desc?: string;

  @ApiProperty()
  @IsOptional()
  productType?: IProductType;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productCode: string;
}
