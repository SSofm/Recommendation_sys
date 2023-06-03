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
import { SneakersService } from './sneakers.service';
import { CreateSneakerDto } from './dto/create-sneaker.dto';
import { CartIdDTO } from '../carts/dto/cart-id.dto';
import { CartItemDTO } from '../carts/dto/cart-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// CORE
import { ApiTagsAndBearer } from '@core/docs/swagger.decorator';
import { UpdateSneakerDto } from './dto/update-sneaker.dto';

@ApiTagsAndBearer('Sneakers')
@Controller('sneakers')
export class SneakersController {
  constructor(private readonly sneakersService: SneakersService) {}

  @Post('create-new-sneaker')
  // @UseGuards(JwtAuthGuard)
  create(@Body() createSneakerDto: CreateSneakerDto, @Body() images: string[]) {
    return this.sneakersService.create(createSneakerDto, images);
  }

  @Post('add-single-sneaker-into-cart/:sneakerId')
  addSingleSneakerIntoCart(
    @Body() cartItemDto: CartItemDTO,
    @Param('sneakerId') bookId: number,
  ) {
    return this.sneakersService.addSingleBookIntoCart(cartItemDto, bookId);
  }

  @Get('get-all-sneakers')
  findAll() {
    return this.sneakersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.sneakersService.findOne(+id);
  }

  // @Get('get-all-books-of-cart/:cartId')
  // findBooksInCart(@Param('cartId') cartId: number) {
  //   return this.booksService.findBooksInCart(cartId);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateSneakerDto) {
    return this.sneakersService.update(+id, updateBookDto);
  }

  @Delete('remove-single-book-from-cart/:bookId')
  removeSingleBookFromCart(
    @Body() cart: CartIdDTO,
    @Param('bookId') bookId: number,
  ) {
    return this.sneakersService.removeSingleBookFromCart(cart.cartId, bookId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sneakersService.remove(+id);
  }
}
