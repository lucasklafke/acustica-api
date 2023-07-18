import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  username: string;
  @IsNotEmpty()
  password: string;
}
