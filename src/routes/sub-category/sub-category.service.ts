import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';

@Injectable()
export class SubCategoryService {
  constructor(private readonly PrismaService: PrismaService) {}

  async create(createSubCategoryDto: CreateSubCategoryDto) {
    const category = await this.PrismaService.category.findUnique({
      where: {
        id: createSubCategoryDto.categoryId,
      },
    });
    const subCategory = await this.PrismaService.subCategory.findUnique({
      where: { subCategory: createSubCategoryDto.subCategory },
    });

    if (!category)
      throw new HttpException('invalid category', HttpStatus.BAD_REQUEST);
    if (subCategory) {
      throw new HttpException(
        'subCategory already exists',
        HttpStatus.CONFLICT,
      );
    }

    return this.PrismaService.subCategory.create({
      data: createSubCategoryDto,
    });
  }

  findAll() {
    return `This action returns all subCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subCategory`;
  }

  update(id: number, updateSubCategoryDto: UpdateSubCategoryDto) {
    return `This action updates a #${id} subCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} subCategory`;
  }
}
