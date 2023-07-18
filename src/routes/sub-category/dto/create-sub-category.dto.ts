import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSubCategoryDto {
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsString()
  @IsNotEmpty()
  subCategory: string;
}
