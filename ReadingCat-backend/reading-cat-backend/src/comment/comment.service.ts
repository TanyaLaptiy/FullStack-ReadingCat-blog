import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  create(createCommentDto: CreateCommentDto, userId: number) {
    return this.commentRepository.save({
      text: createCommentDto.text,
      postId: { id: createCommentDto.postId },
      ownerId: { id: userId },
    });
  }

  async findAllByPostId(postId: number) {
    const data = await this.commentRepository.find({
      relations: ['ownerId', 'postId'],
      where: { postId: { id: postId } },
      loadRelationIds: {
        //Что бы в объекте передовался id поста, и весь объект пользователя, написавший этот комментарий
        relations: ['postId'],
      },
    });
    if (!data) {
      throw new NotFoundException("Comments aren't found");
    }
    return data;
  }

  async findAll() {
    const data = await this.commentRepository.find({
      relations: ['ownerId', 'postId'],
      order: { id: 'DESC' },
      take: 7,
      loadRelationIds: {
        relations: ['postId'],
      },
    });
    if (!data) {
      throw new NotFoundException("Comments aren't found");
    }
    return data;
  }

  async findOne(id: number) {
    const data = await this.commentRepository.findOne({
      relations: ['ownerId'],
      where: { id: id },
    });

    if (!data) {
      throw new NotFoundException("Comment isn't found");
    }
    return data;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    // const data = await this.commentRepository.update(id, updateCommentDto);
    // if (data.affected == 0) {
    //   throw new NotFoundException('Update failed');
    // }
    // return await this.commentRepository.findOne({ where: { id: id } });
  }

  async remove(id: number) {
    const data = await this.commentRepository.delete(id);
    if (data.affected == 0) {
      throw new NotFoundException("Comment isn't deleted");
    }
    return data;
  }
}
