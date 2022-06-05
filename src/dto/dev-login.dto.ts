import { IsNotEmpty } from 'class-validator';

export class LoginDeveloperDto {
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  readonly password: string;
}
