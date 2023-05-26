import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  star: number;

  @IsString()
  content: string;
}
