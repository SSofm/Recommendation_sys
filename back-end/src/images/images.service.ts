import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';

// SRC
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';
import { SneakersService } from '../sneakers/sneakers.service';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @Inject(forwardRef(() => SneakersService))
    private sneakersService: SneakersService,
  ) {}
  async create(createImageDto: CreateImageDto) {
    return await this.imageRepository.save(createImageDto);
  }

  async updatedCoverImages(bookId, listImageUrls: string[]) {
    const sneaker = await this.sneakersService.findOne(bookId);
    for (const element of listImageUrls) {
      const image = new Image();
      image.url = element;
      image.sneaker = sneaker;
      await this.imageRepository.save(image);
    }
  }

  async findAll() {
    return this.imageRepository.find();
  }

  async findOne(id: number) {
    return this.imageRepository.findOneBy({ id });
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return this.imageRepository.update({ id }, updateImageDto);
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }

  async testDeleteFile(fileName: string) {
    const filePath = '../front-end/public/images/' + fileName;
    await fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        return err;
      }
    });
  }
}
