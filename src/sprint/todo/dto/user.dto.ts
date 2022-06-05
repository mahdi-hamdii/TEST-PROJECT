import { IsNotEmpty, IsEmail } from 'class-validator';

export class DeveloperDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  developername: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  createdOn?: Date;
}
