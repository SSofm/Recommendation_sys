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
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// CORE
import {
  ApiCreateOperation,
  ApiDeleteOperation,
  ApiListOperation,
  ApiRetrieveOperation,
  ApiTagsAndBearer,
  ApiUpdateOperation,
} from '@core/docs/swagger.decorator';

@ApiTagsAndBearer('Brands')
// @UseGuards(JwtAuthGuard)
@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @ApiCreateOperation({
    summary: 'Create new brand',
  })
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  @Get()
  @ApiListOperation()
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  @ApiRetrieveOperation()
  findOne(@Param('id') id: string) {
    return this.brandsService.findOne(+id);
  }

  @Patch(':id')
  @ApiUpdateOperation()
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(+id, updateBrandDto);
  }

  @Delete(':id')
  @ApiDeleteOperation()
  remove(@Param('id') id: string) {
    return this.brandsService.remove(+id);
  }
}
