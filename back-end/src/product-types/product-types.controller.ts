import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

// SRC
import { ProductTypesService } from './product-types.service';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// CORE
import { ApiTagsAndBearer } from '@core/docs/swagger.decorator';

@ApiTagsAndBearer('Product Types')
@UseGuards(JwtAuthGuard)
@Controller('product-types')
export class ProductTypesController {
  constructor(private readonly productTypesService: ProductTypesService) {}

  @Post('create-new-product-type')
  create(@Body() createProductTypeDto: CreateProductTypeDto) {
    return this.productTypesService.create(createProductTypeDto);
  }

  @Get('get-all-product-types')
  findAll() {
    return this.productTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productTypesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductTypeDto: UpdateProductTypeDto,
  ) {
    return this.productTypesService.update(+id, updateProductTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productTypesService.remove(+id);
  }
}
