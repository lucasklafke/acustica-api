import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
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
    return `This action returns all question`;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
