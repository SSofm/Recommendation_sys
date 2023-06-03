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
import { ApiConsumes } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';

// SRC
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { diskStorage } from 'multer';
import { imageFileFilter } from './FileFilter';
import { editFileName } from './EditFileName';

// CORE
import {
  ApiCreateOperation,
  ApiListOperation,
  ApiRetrieveOperation,
  ApiTagsAndBearer,
  ApiUpdateOperation,
} from '@core/docs/swagger.decorator';

@ApiTagsAndBearer('Images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('create-new-image')
  @ApiCreateOperation({
    summary: 'Create new image',
  })
  create(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }

  @Post('updated-images-for-sneaker/:sneakerId')
  @ApiUpdateOperation({
    summary: 'Update image for sneaker',
  })
  updatedCoverImages(
    @Param('sneakerId') sneakerId: number,
    @Body() listImageUrls: string[],
  ) {
    return this.imagesService.updatedCoverImages(sneakerId, listImageUrls);
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
  @ApiConsumes('multipart/form-data')
  handleUpload(@UploadedFiles() files: Array<Express.Multer.File>): string[] {
    const listImagePaths: string[] = [];
    for (const element of files) {
      listImagePaths.push(element.path);
    }
    return listImagePaths;
  }

  @Get()
  @ApiListOperation({
    summary: 'Get all image',
  })
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  @ApiRetrieveOperation()
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
