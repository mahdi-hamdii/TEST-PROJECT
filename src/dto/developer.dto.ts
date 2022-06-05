import { IsNotEmpty, IsEmail } from 'class-validator';

export class DeveloperDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  createdOn?: Date;
}
