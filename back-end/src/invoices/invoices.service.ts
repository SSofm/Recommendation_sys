import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}
  async create(createInvoiceDto: CreateInvoiceDto) {
    const user = await this.usersService.findOne(createInvoiceDto.userId);
    if (user.cart.cartitems.length !== 0) {
      const cartitems = user.cart.cartitems;
      const invoice = new Invoice();
      invoice.cartitems = cartitems;
      invoice.user = user;
      return await this.invoiceRepository.save(invoice);
    }
  }

  findAll() {
    return `This action returns all invoices`;
  }
  findAllInvoicesByUserId(userId: number) {
    return this.invoiceRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['cartitems', 'cartitems.book'],
    });
  }

  findOne(id: number) {
    return this.invoiceRepository.findOne({
      where: {
        id,
      },
      relations: ['cartitems', 'cartitems.book'],
    });
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: number) {
    return this.invoiceRepository.delete(id);
  }
}
