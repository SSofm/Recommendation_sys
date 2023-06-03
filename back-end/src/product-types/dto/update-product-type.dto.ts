import { PartialType } from '@nestjs/swagger';

// SRC
import { CreateProductTypeDto } from './create-product-type.dto';

export class UpdateProductTypeDto extends PartialType(CreateProductTypeDto) {}
