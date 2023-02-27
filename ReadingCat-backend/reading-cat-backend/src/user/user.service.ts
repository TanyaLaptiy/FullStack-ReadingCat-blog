import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  [x: string]: any;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.comments', 'comment')
      .loadRelationCountAndMap('user.commentCount', 'user.comments')
      .getMany();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id: id } });
  }

  findByCriterias(criterias: LoginUserDto) {
    return this.userRepository.findOne({
      where: { password: criterias.password, email: criterias.email },
    });
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const data = await this.userRepository.update(id, updateUserDto);
    if (data.affected == 0) {
      throw new NotFoundException('Update failed');
    }
    return await this.userRepository.findOne({ where: { id: id } });
  }
  async search(searchUserDto: SearchUserDto) {
    const data = this.userRepository.createQueryBuilder('Users');
    if (searchUserDto.fullName) {
      data.andWhere(`Users.fullName ILIKE :fullName`);
    }
    if (searchUserDto.email) {
      data.andWhere(`Users.email ILIKE :email`);
    }
    data.setParameters({
      fullName: `%${searchUserDto.fullName}%`,
      email: `%${searchUserDto.email}%`,
    });
    data.limit(searchUserDto.limit || 0);
    data.take(searchUserDto.take || 8);

    const [items, count] = await data.getManyAndCount();

    return { items, count };
  }
}
