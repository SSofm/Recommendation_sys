import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductTypeDto {
  @ApiProperty({ example: '' })
  @IsString()
  name: string;

  @ApiProperty({ example: '' })
  @IsString()
  @IsOptional()
  desc?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  brandId: number;
}
