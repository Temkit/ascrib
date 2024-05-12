import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { AnswerOption } from './entities/answer-option.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, AnswerOption]), // Registering the entities with TypeOrm
  ],
  controllers: [QuestionController], // Registering the controller
  providers: [QuestionService], // Registering the service
  exports: [QuestionService], // Exporting the service for use in other modules, if necessary
})
export class QuestionModule {}
