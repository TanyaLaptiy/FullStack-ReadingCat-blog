import { IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @Length(3)
  fullName: string;

  @IsEmail()
  email: string;

  @Length(10)
  password?: string;
}
