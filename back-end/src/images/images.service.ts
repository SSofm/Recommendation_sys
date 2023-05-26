import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { BooksService } from '../books/books.service';
import * as fs from 'fs';
@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @Inject(forwardRef(() => BooksService))
    private booksService: BooksService,
  ) {}
  async create(createImageDto: CreateImageDto) {
    return await this.imageRepository.save(createImageDto);
  }

  async updatedCoverImages(bookId, listImageUrls: string[]) {
    const book = await this.booksService.findOne(bookId);
    for (const element of listImageUrls) {
      const image = new Image();
      image.url = element;
      image.book = book;
      await this.imageRepository.save(image);
    }
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
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
