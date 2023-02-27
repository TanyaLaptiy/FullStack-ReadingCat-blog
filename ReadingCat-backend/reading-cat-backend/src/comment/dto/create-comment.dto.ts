import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  text: string;

  @IsNotEmpty()
  postId: number;

  //   @IsNotEmpty()
  //   ownerId: number;
}
