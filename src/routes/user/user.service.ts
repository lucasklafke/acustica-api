import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

// This should be a real class/interface representing a user entity
export type User = {
  id: number;
  username: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(private readonly PrismaService: PrismaService) {}

  async findOne(id: number) {
    return this.PrismaService.user.findUnique({
      where: {
        id,
      },
    });
  }
}
