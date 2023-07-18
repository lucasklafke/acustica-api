import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './routes/question/question.module';
import { AuthModule } from './routes/auth/auth.module';
import { UserModule } from './routes/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './routes/category/category.module';
import { SubCategoryModule } from './routes/sub-category/sub-category.module';
@Module({
  imports: [
    QuestionModule,
    AuthModule,
    UserModule,
    CategoryModule,
    SubCategoryModule,
    ConfigModule.forRoot(),
    CategoryModule,
    SubCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
