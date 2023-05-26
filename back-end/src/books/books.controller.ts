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
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { CartIdDTO } from '../carts/dto/cart-id.dto';
import { CartItemDTO } from '../carts/dto/cart-item.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiTagsAndBearer } from '../../libs/core/src/docs/swagger.decorator';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Books')
@ApiTagsAndBearer('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('create-new-book')
  @UseGuards(JwtAuthGuard)
  create(@Body() createBookDto: CreateBookDto, @Body() images: string[]) {
    return this.booksService.create(createBookDto, images);
  }

  @Post('add-single-book-into-cart/:bookId')
  addSingleBookIntoCart(
    @Body() cartItemDto: CartItemDTO,
    @Param('bookId') bookId: number,
  ) {
    return this.booksService.addSingleBookIntoCart(cartItemDto, bookId);
  }

  @Get('get-all-books')
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.booksService.findOne(+id);
  }

  // @Get('get-all-books-of-cart/:cartId')
  // findBooksInCart(@Param('cartId') cartId: number) {
  //   return this.booksService.findBooksInCart(cartId);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete('remove-single-book-from-cart/:bookId')
  removeSingleBookFromCart(
    @Body() cart: CartIdDTO,
    @Param('bookId') bookId: number,
  ) {
    return this.booksService.removeSingleBookFromCart(cart.cartId, bookId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
