import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateDeveloperDto {
  @IsNotEmpty()
  developername: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
