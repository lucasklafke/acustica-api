import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly PrismaService: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.PrismaService.category.findUnique({
      where: { category: createCategoryDto.category },
    });
    if (category)
      throw new HttpException('Category already exists', HttpStatus.CONFLICT);

    return this.PrismaService.category.create({
      data: createCategoryDto,
    });
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
