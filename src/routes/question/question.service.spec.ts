import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QuestionService } from './question.service';

describe('QuestionService', () => {
  let service: QuestionService;
  let prismaService: PrismaService;
  const fakeQuestions = [
    {
      id: 10,
      categoryId: 1,
      subCategoryId: 1,
      question: 'testing',
      answer: 'testing',
      createdAt: '2023-07-19T02:27:48.773Z',
    },
  ];
  const mockPrismaService = {
    create: jest.fn().mockReturnValue(fakeQuestions[0]),
    findUnique: jest.fn().mockReturnValue(null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        {
          provide: PrismaService,
          useValue: {
            question: {
              create: jest.fn().mockReturnValue(fakeQuestions[0]),
              findUnique: jest.fn().mockReturnValue(null),
            },
          },
        },
      ],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create endpoint', () => {
    it('should create a question', async () => {
      const createQuestionDto: CreateQuestionDto = {
        answer: 'testing',
        categoryId: 1,
        question: 'testing',
        subCategoryId: 1,
      };
      const question = await service.create(createQuestionDto);
      expect(question).toEqual({
        id: 10,
        categoryId: 1,
        subCategoryId: 1,
        question: 'testing',
        answer: 'testing',
        createdAt: '2023-07-19T02:27:48.773Z',
      });
    });
    it('should throw a conflict error when creating question', async () => {
      jest
        .spyOn(prismaService.question, 'findUnique')
        .mockImplementationOnce((): any => {
          return {
            id: 10,
            categoryId: 1,
            subCategoryId: 1,
            question: 'testing',
            answer: 'testing',
            createdAt: '2023-07-19T02:27:48.773Z',
          };
        });
      const createQuestionDto: CreateQuestionDto = {
        answer: 'testing',
        categoryId: 1,
        question: 'testing',
        subCategoryId: 1,
      };
      try {
        const question = await service.create(createQuestionDto);
      } catch (err) {
        expect(err).toEqual(
          new HttpException('Question already exist', HttpStatus.CONFLICT),
        );
      }
    });
  });
});
