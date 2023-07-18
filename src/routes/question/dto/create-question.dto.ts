import { Category, SubCategory } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  categoryId: number;
  @IsNotEmpty()
  subCategoryId: number;
  @IsString()
  @IsNotEmpty()
  question: string;
  @IsNotEmpty()
  answer: string;
}
