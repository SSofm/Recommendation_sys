import {
  forwardRef,
  Inject,
  Injectable,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Image } from '../images/entities/image.entity';
import { ImagesService } from '../images/images.service';
import { DummyBook } from './dto/dummy-book';
import { CartsService } from '../carts/carts.service';
import { CartItem } from '../cart-items/entities/cart-item.entity';
import { CartItemDTO } from '../carts/dto/cart-item.dto';
import { CartItemsService } from '../cart-items/cart-items.service';
@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @Inject(forwardRef(() => ImagesService))
    private imagesService: ImagesService,

    @Inject(forwardRef(() => CartsService))
    private cartsService: CartsService,
    @Inject(forwardRef(() => CartItemsService))
    private cartItemsService: CartItemsService,
  ) {}
  async create(createBookDto: CreateBookDto, images: string[]) {
    const checkBook = await this.bookRepository.findOneBy({
      title: createBookDto.title,
    });

    if (checkBook) {
      throw new HttpException('Book title already exists', HttpStatus.CONFLICT);
    }
    const book = new Book();
    if (images) {
      const tmp_images = (images as unknown as DummyBook).imagePaths;
      if (tmp_images) {
        const listImages: Image[] = [];
        for (const element of tmp_images) {
          const tmp_image = new Image();
          tmp_image.url = element;
          await this.imagesService.create(tmp_image);
          listImages.push(tmp_image);
        }
        book.images = listImages;
      }
    }
    book.title = createBookDto.title;
    book.author = createBookDto.author;
    book.desc = createBookDto.desc;
    book.category = createBookDto.category;
    book.pages = createBookDto.pages;
    book.releasedDate = createBookDto.releasedDate;
    book.price = createBookDto.price;
    return await this.bookRepository.save(book);
  }

  async create_with_out_images(createBookDto: CreateBookDto) {
    return await this.bookRepository.save(createBookDto);
  }

  async addSingleBookIntoCart(cartItemDto: CartItemDTO, bookId: number) {
    const cart = await this.cartsService.findOne(cartItemDto.cartId);
    const book = await this.findOne(bookId);

    const cartItem = new CartItem();
    cartItem.cart = cart[0];
    cartItem.quantity = cartItemDto.quantity;
    cartItem.book = book;
    await this.cartItemsService.create(cartItem);
  }

  findAll() {
    return this.bookRepository.find();
  }

  async findOne(id: number) {
    return await this.bookRepository.findOneBy({ id });
  }

  // async findBooksInCart(cartId: number) {
  //   const cart = await this.cartsService.findOne(cartId);
  //   const listCart: Cart[] = [cart];
  //   return await this.bookRepository.findBy({ carts: listCart });
  // }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.bookRepository.update({ id }, updateBookDto);
  }

  async remove(id: number) {
    const book = await this.bookRepository.findOneBy({ id });
    for (let i = 0; i < book.images.length; i++) {
      // const filePath =
      //   '../front-end/public/images/' + book.images[i].url.split('\\').pop();
      await this.imagesService.testDeleteFile(
        book.images[i].url.split('\\').pop(),
      );
    }

    return await this.bookRepository.delete({ id });
  }

  async removeSingleBookFromCart(cartId, bookId: number) {
    const cart = await this.cartsService.findOne(cartId);
    const filter = cart[0].cartitems.filter((item) => item.book.id != bookId);
    cart[0].cartitems = filter;
    return await this.cartsService.createWithBody(cart);
  }

  /* 
    async addSingleBookIntoCart(cartItemDto: CartItemDTO, bookId: number) {
    const cart = await this.cartsService.findOne(cartItemDto.cartId);
    const book = await this.findOne(bookId);

    const cartItem = new CartItem();
    cartItem.cart = cart[0];
    cartItem.quantity = cartItemDto.quantity;
    cartItem.book = book;
    await this.cartItemsService.create(cartItem);
  }
  */
}
