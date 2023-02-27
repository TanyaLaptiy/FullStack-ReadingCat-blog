import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto, userId: number) {
    const secondTitle = createPostDto.text.find(
      (obj) => obj.type === 'paragraph',
    )?.data?.text;
    return this.postRepository.save({
      title: createPostDto.title,
      secondTitle: secondTitle || '',
      text: createPostDto.text,
      tags: createPostDto.tags,
      ownerId: { id: userId },
    });
  }

  async findAll() {
    const data = await this.postRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
    if (!data) {
      throw new NotFoundException("Posts aren't found");
    }
    return data;
  }

  async findOne(id: number) {
    const data = this.postRepository.createQueryBuilder();
    await data
      .whereInIds(id)
      .update()
      .set({ views: () => 'views + 1' })
      .execute();
    if (!data) {
      throw new NotFoundException("Post isn't found");
    }
    const post = await this.postRepository.findOne({
      relations: ['ownerId'],
      where: { id: id },
    });
    return post;
  }

  async findPopular() {
    const data = this.postRepository.createQueryBuilder('Posts');
    data.orderBy('views', 'DESC');
    data.limit(8);
    const [items, count] = await data.getManyAndCount();

    return { items, count };
  }

  async search(searchPostDto: SearchPostDto) {
    const data = this.postRepository.createQueryBuilder('Posts');
    if (searchPostDto.views) {
      data.orderBy('views', searchPostDto.views);
    }
    if (searchPostDto.title) {
      data.andWhere(`Posts.title ILIKE :title`);
    }
    if (searchPostDto.text) {
      data.andWhere(`Posts.text ILIKE :text`);
    }
    if (searchPostDto.tag) {
      data.andWhere(`Posts.tags ILIKE :tag`);
    }
    data.setParameters({
      title: `%${searchPostDto.title}%`,
      text: `%${searchPostDto.text}%`,
      tag: `%${searchPostDto.tag}%`,
      views: searchPostDto.views || 'DESC',
    });
    data.limit(searchPostDto.limit || 0);
    data.take(searchPostDto.take || 8);

    const [items, count] = await data.getManyAndCount();

    return { items, count };
  }

  async update(id: number, userId: number, updatePostDto: UpdatePostDto) {
    const secondTitle = updatePostDto.text.find(
      (obj) => obj.type === 'paragraph',
    )?.data?.text;
    const data = await this.postRepository.update(id, {
      title: updatePostDto.title,
      secondTitle: secondTitle || '',
      text: updatePostDto.text,
      tags: updatePostDto.tags,
      ownerId: { id: userId },
    });

    if (data.affected == 0) {
      throw new NotFoundException('Update failed');
    }
    return await this.postRepository.findOne({
      relations: ['ownerId'],
      where: { id: id },
    });
  }

  async remove(id: number, userId: number) {
    const post = await this.postRepository.findOne({
      relations: ['ownerId'],
      where: { id: id },
    });

    if (post.ownerId.id !== userId) {
      throw new ForbiddenException('Access closed');
    }

    const data = await this.postRepository.delete(id);
    if (data.affected == 0) {
      throw new NotFoundException("Post isn't deleted");
    }

    return data;
  }
}
