import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// SRC
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandRepository: Repository<Brand>,
  ) {}
  create(createBrandDto: CreateBrandDto) {
    return this.brandRepository.save(createBrandDto);
  }

  findAll() {
    return this.brandRepository.find({
      relations: {
        productTypes: {
          sneakers: true,
        },
      },
    });
  }

  async findOne(id: number) {
    const brand = await this.brandRepository.findOne({
      where: { id },
      relations: {
        productTypes: {
          sneakers: true,
        },
      },
    });
    if (!brand) {
      throw new HttpException('Not found brand', HttpStatus.NOT_FOUND);
    }
    return brand;
  }

  async getBrandByName(name: string) {
    const sneaker = await this.brandRepository.findOneBy({ name });
    if (!sneaker) {
      throw new HttpException('Not found brand', HttpStatus.NOT_FOUND);
    }
    return sneaker;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return this.brandRepository.update(id, updateBrandDto);
  }

  remove(id: number) {
    return this.brandRepository.delete(id);
  }
}
