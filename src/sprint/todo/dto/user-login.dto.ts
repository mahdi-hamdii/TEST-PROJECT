import { IsNotEmpty } from 'class-validator';

export class LoginDeveloperDto {
  @IsNotEmpty()
  readonly developername: string;

  @IsNotEmpty()
  readonly password: string;
}
