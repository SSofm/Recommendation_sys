import { PartialType } from '@nestjs/mapped-types';

// SRC
import { CreateImageDto } from './create-image.dto';

export class UpdateImageDto extends PartialType(CreateImageDto) {}
