import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// SRC
// import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { SneakersService } from '../sneakers/sneakers.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @Inject(forwardRef(() => SneakersService))
    private booksService: SneakersService,
  ) {}
  create() {
    const cart = new Cart();
    return this.cartRepository.save(cart);
  }
  createWithBody(createCartDto: CreateCartDto) {
    return this.cartRepository.save(createCartDto);
  }

  findAll() {
    return this.cartRepository.find();
  }

  findOne(id: number) {
    return this.cartRepository.find({
      where: {
        id: id,
      },
      relations: ['cartitems', 'cartitems.book'],
    });
  }

  // update(id: number, updateCartDto: UpdateCartDto) {
  //   return `This action updates a #${id} cart`;
  // }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
