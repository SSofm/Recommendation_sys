import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// SRC
import { CreateSneakerDto } from './dto/create-sneaker.dto';
import { Sneaker } from './entities/sneaker.entity';
import { Image } from '../images/entities/image.entity';
import { ImagesService } from '../images/images.service';
import { DummyBook } from './dto/dummy-book';
import { CartsService } from '../carts/carts.service';
import { CartItem } from '../cart-items/entities/cart-item.entity';
import { CartItemDTO } from '../carts/dto/cart-item.dto';
import { CartItemsService } from '../cart-items/cart-items.service';
import { ProductTypesService } from '../product-types/product-types.service';
import { UpdateSneakerDto } from './dto/update-sneaker.dto';

@Injectable()
export class SneakersService {
  constructor(
    @InjectRepository(Sneaker)
    private readonly sneakerRepository: Repository<Sneaker>,
    @Inject(forwardRef(() => ImagesService))
    private imagesService: ImagesService,
    @Inject(forwardRef(() => CartsService))
    private cartsService: CartsService,
    @Inject(forwardRef(() => CartItemsService))
    private cartItemsService: CartItemsService,

    private readonly productTypeService: ProductTypesService,
  ) {}
  async create(createSneakerDto: CreateSneakerDto, images: string[]) {
    if (createSneakerDto.productCode) {
      const checkSneaker = await this.sneakerRepository.findOneBy({
        productCode: createSneakerDto.productCode,
      });

      if (checkSneaker) {
        throw new HttpException('Sneaker already exists', HttpStatus.CONFLICT);
      }
    }

    const sneaker = new Sneaker();
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
        sneaker.images = listImages;
      }
    }
    const productType = await this.productTypeService.getProductTypeByName(
      createSneakerDto.productType.name,
    );
    sneaker.name = createSneakerDto.name;
    sneaker.productType = productType;
    sneaker.productCode = createSneakerDto.productCode;
    sneaker.desc = createSneakerDto.desc;
    sneaker.price = createSneakerDto.price;
    return await this.sneakerRepository.save(sneaker);
  }

  // async create_with_out_images(createBookDto: CreateSneakerDto) {
  //   return await this.sneakerRepository.save(createBookDto);
  // }

  async addSingleBookIntoCart(cartItemDto: CartItemDTO, bookId: number) {
    const cart = await this.cartsService.findOne(cartItemDto.cartId);
    const sneaker = await this.findOne(bookId);

    const cartItem = new CartItem();
    cartItem.cart = cart[0];
    cartItem.quantity = cartItemDto.quantity;
    cartItem.sneaker = sneaker;
    await this.cartItemsService.create(cartItem);
  }

  findAll() {
    return this.sneakerRepository.find({
      relations: {
        productType: {
          brand: true,
        },
        images: true,
        comments: true,
      },
    });
  }

  async findOne(id: number) {
    const sneaker = await this.sneakerRepository.findOne({
      where: { id },
      relations: {
        productType: {
          brand: true,
        },
      },
    });
    if (!sneaker) {
      throw new HttpException('Not found sneaker', HttpStatus.NOT_FOUND);
    }
    return sneaker;
  }

  // async findBooksInCart(cartId: number) {
  //   const cart = await this.cartsService.findOne(cartId);
  //   const listCart: Cart[] = [cart];
  //   return await this.sneakerRepository.findBy({ carts: listCart });
  // }

  update(id: number, updateSneakerDto: UpdateSneakerDto) {
    return this.sneakerRepository.update({ id }, updateSneakerDto);
  }

  async remove(id: number) {
    const book = await this.sneakerRepository.findOneBy({ id });
    for (let i = 0; i < book.images.length; i++) {
      // const filePath =
      //   '../front-end/public/images/' + book.images[i].url.split('\\').pop();
      await this.imagesService.testDeleteFile(
        book.images[i].url.split('\\').pop(),
      );
    }

    return await this.sneakerRepository.delete({ id });
  }

  async removeSingleBookFromCart(cartId, bookId: number) {
    const cart = await this.cartsService.findOne(cartId);
    cart[0].cartitems = cart[0].cartitems.filter(
      (item) => item.sneaker.id != bookId,
    );
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
