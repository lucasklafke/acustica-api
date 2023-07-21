import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(private readonly PrismaService: PrismaService) {}
  async create(createQuestionDto: CreateQuestionDto) {
    const question = await this.PrismaService.question.findUnique({
      where: {
        question: createQuestionDto.question,
      },
    });
    if (question)
      throw new HttpException('Question already exist', HttpStatus.CONFLICT);

    return this.PrismaService.question.create({
      data: createQuestionDto,
    });
  }

  findAll() {
    return this.PrismaService.question.findMany({});
  }

  findOne(id: number) {
    return this.PrismaService.question.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.PrismaService.question.findFirst({
      where: {
        id,
      },
    });
    if (!question)
      throw new HttpException('question not found', HttpStatus.BAD_REQUEST);

    const questionAlreadyExist = await this.PrismaService.question.findUnique({
      where: {
        question: updateQuestionDto.question,
      },
    });
    if (questionAlreadyExist && questionAlreadyExist.id !== question.id)
      throw new HttpException('Question already exist', HttpStatus.CONFLICT);
    return this.PrismaService.question.update({
      data: updateQuestionDto,
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    const question = await this.PrismaService.question.findUnique({
      where: {
        id,
      },
    });
    if (!question)
      throw new HttpException('question not found', HttpStatus.BAD_REQUEST);
    return this.PrismaService.question.delete({
      where: {
        id,
      },
    });
  }
}
