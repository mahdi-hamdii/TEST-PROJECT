import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateDeveloperDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
