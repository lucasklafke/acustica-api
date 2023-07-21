import { Category } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  categoryId: number;
  @IsString()
  @IsNotEmpty()
  question: string;
  @IsNotEmpty()
  answer: string;
}
