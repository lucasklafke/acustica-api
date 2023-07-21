import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './routes/question/question.module';
import { AuthModule } from './routes/auth/auth.module';
import { UserModule } from './routes/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './routes/category/category.module';
@Module({
  imports: [
    QuestionModule,
    AuthModule,
    UserModule,
    CategoryModule,
    ConfigModule.forRoot(),
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
