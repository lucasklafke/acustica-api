import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { filter } from 'rxjs';
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

  async findAll(filters: { main: boolean; all: boolean }) {
    if (filters.main) {
      return this.PrismaService.category.findMany({
        where: {
          parentId: null,
        },
      });
    }
    if (filters.all) return this.PrismaService.category.findMany({});

    const categories = await this.PrismaService.category.findMany({});
    const questions = await this.PrismaService.question.findMany({});
    return buildCategoryTree(categories, questions);
  }

  findOne(id: number) {
    return this.PrismaService.category.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = this.PrismaService.category.findUnique({
      where: {
        id,
      },
    });
    if (!category)
      throw new HttpException('category not found', HttpStatus.NOT_FOUND);
    return this.PrismaService.category.update({
      where: {
        id,
      },
      data: updateCategoryDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}

function buildCategoryTree(categories, questions) {
  const categoryMap = new Map();
  const categoryTree = [];

  // Mapear os IDs das categorias para seus objetos correspondentes
  categories.forEach((category) => {
    categoryMap.set(category.id, { ...category, children: [], questions: [] });
  });

  // Mapear as perguntas para suas categorias correspondentes
  questions.forEach((question) => {
    const categoryId = question.categoryId;
    const category = categoryMap.get(categoryId);
    if (category) {
      category.questions.push(question);
    }
  });

  // Construir a árvore de categorias iterativamente
  categoryMap.forEach((category) => {
    const parentId = category.parentId;
    if (parentId === null) {
      categoryTree.push(category);
    } else {
      const parentCategory = categoryMap.get(parentId);
      if (parentCategory) {
        parentCategory.children.push(category);
      }
    }
  });

  return categoryTree;
}
