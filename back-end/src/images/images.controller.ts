import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageFileFilter } from './FileFilter';
import { editFileName } from './EditFileName';
import { ApiTagsAndBearer } from '../../libs/core/src/docs/swagger.decorator';
@ApiTagsAndBearer('Images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('create-new-image')
  create(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }

  @Post('updated-images-for-book/:bookId')
  updatedCoverImages(
    @Param('bookId') bookId: number,
    @Body() listImageUrls: string[],
  ) {
    return this.imagesService.updatedCoverImages(bookId, listImageUrls);
  }

  @Post('upload-files')
  @UseInterceptors(
    FilesInterceptor('file', 20, {
      storage: diskStorage({
        destination: '../front-end/public/images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  handleUpload(@UploadedFiles() files: Array<Express.Multer.File>) {
    const listImagePaths: string[] = [];
    for (const element of files) {
      listImagePaths.push(element.path);
    }
    return listImagePaths;
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }

  @Delete('test-delete-file/:fileName')
  testDeleteFileLocal(@Param('fileName') fileName: string) {
    console.log('file name in image controller is: ', fileName);

    return this.imagesService.testDeleteFile(fileName);
  }
}
