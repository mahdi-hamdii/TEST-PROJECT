import { IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateSprintDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsNotEmpty()
  userId: string;
}
