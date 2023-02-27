/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    //Параметр нужен для проверки, существования user с таким id
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, //игнорируем невалидные токены (если прошел срок валидности)
      secretOrKey: 'test', //Расшифровка токена
    });
  }

  async validate(payload: { id: number; email: string }) {
    const user = await this.userService.findOne(payload.id);

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    return {
      id: user.id,
      email: user.email,
    };
  }
}
