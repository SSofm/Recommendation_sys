import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// SRC
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { ProductType } from './entities/product-type.entity';
import { BrandsService } from '../brands/brands.service';

@Injectable()
export class ProductTypesService {
  constructor(
    @InjectRepository(ProductType)
    private readonly repository: Repository<ProductType>,
    private readonly brandService: BrandsService,
  ) {}
  async create(createProductTypeDto: CreateProductTypeDto) {
    const brand = await this.brandService.findOne(createProductTypeDto.brandId);
    const productType = new ProductType();
    productType.name = createProductTypeDto.name.toLowerCase();
    productType.desc = createProductTypeDto.desc;
    productType.brand = brand;
    return this.repository.save(productType);
  }

  findAll() {
    return this.repository.find({
      relations: {
        sneakers: true,
      },
    });
  }

  async getProductTypeByName(name: string) {
    const productType = await this.repository.findOneBy({
      name: name.toLowerCase(),
    });
    if (!productType) {
      throw new HttpException('Not found product type', HttpStatus.NOT_FOUND);
    }
    return productType;
  }

  async findOne(id: number) {
    const productType = await this.repository.findOne({
      where: {
        id,
      },
      relations: {
        sneakers: true,
      },
    });
    if (!productType) {
      throw new HttpException('Not found product type', HttpStatus.NOT_FOUND);
    }
    return productType;
  }

  update(id: number, updateProductTypeDto: UpdateProductTypeDto) {
    return this.repository.update(id, updateProductTypeDto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
