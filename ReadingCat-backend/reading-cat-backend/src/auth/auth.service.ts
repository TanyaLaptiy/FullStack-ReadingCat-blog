import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
// import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    // private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private authRepository: Repository<User>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.authRepository.findOne({
      where: { password: password, email: email },
    });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, id: user.id };
    const { password, ...userData } = user;
    return {
      ...userData,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createAuthDto: CreateUserDto) {
    try {
      const { password, ...user } = await this.authRepository.save(
        createAuthDto,
      );

      // const { password, ...user } = await this.userService.create(createAuthDto);

      // const payload = { email: user.email, id: user.id };
      // const { password, ...userData } = user;
      return {
        ...user,
        access_token: this.jwtService.sign(user),
      };
    } catch (e) {
      throw new UnauthorizedException("Email isn't unique");
    }
  }
}
