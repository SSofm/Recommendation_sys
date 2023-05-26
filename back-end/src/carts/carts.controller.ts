import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartsService } from './carts.service';
// import { UpdateCartDto } from './dto/update-cart.dto';
import { CartIdDTO } from './dto/cart-id.dto';
import { ApiTagsAndBearer } from '../../libs/core/src/docs/swagger.decorator';
@ApiTagsAndBearer('Carts')
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  create() {
    return this.cartsService.create();
  }

  @Get('get-all-carts')
  findAll() {
    return this.cartsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
  //   return this.cartsService.update(+id, updateCartDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartsService.remove(+id);
  }
}
