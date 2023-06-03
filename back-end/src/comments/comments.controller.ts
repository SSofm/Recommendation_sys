import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// SRC
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

// CORE
import { ApiTagsAndBearer } from '@core/docs/swagger.decorator';

@ApiTagsAndBearer('Comments')
@Controller('comments')
@UseGuards(AuthGuard())
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('create-new-comment/:bookId')
  create(
    @Param('bookId') bookId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.commentsService.create(bookId, createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }
  @Get('get-all-comments-by-userId/:userId')
  getAllComments(@Param('userId') userId: number) {
    return this.commentsService.getAllCommentsByUserId(userId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
  //   return this.commentsService.update(+id, updateCommentDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
