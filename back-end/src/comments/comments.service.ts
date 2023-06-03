import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// SRC
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { SneakersService } from '../sneakers/sneakers.service';
import { Sneaker } from '../sneakers/entities/sneaker.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @Inject(forwardRef(() => SneakersService))
    private booksService: SneakersService,

    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  async create(bookId: number, createCommentDto: CreateCommentDto) {
    const book: Sneaker = await this.booksService.findOne(bookId);
    const user: User = await this.usersService.findOne(createCommentDto.userId);
    const dummy_comment = {
      content: createCommentDto.content,
    };

    const comment = new Comment();

    comment.book = book;
    comment.user = user;

    comment.star = createCommentDto.star;
    comment.content = createCommentDto.content;

    return await this.commentRepository.save(comment);
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return this.commentRepository.findOneBy({ id });
  }

  async getAllCommentsByUserId(userId: number) {
    const user = await this.usersService.findOne(userId);

    return this.commentRepository.findBy(user);
  }

  // update(id: number, updateCommentDto: UpdateCommentDto) {
  //   return `This action updates a #${id} comment`;
  // }

  remove(id: number): string {
    return `This action removes a #${id} comment`;
  }
}
