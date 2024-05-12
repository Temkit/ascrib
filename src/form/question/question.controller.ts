// src/question/question.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ReadQuestionDto } from './dto/read-question.dto';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async create(
    @Body() createQuestionDto: CreateQuestionDto,
  ): Promise<ReadQuestionDto> {
    const question = await this.questionService.create(createQuestionDto);
    return this.questionService.transformToReadDto(question);
  }

  @Get()
  async findAll(): Promise<ReadQuestionDto[]> {
    return this.questionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ReadQuestionDto> {
    return this.questionService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateQuestionDto: CreateQuestionDto,
  ): Promise<ReadQuestionDto> {
    const updatedQuestion = await this.questionService.update(
      id,
      updateQuestionDto,
    );
    return this.questionService.transformToReadDto(updatedQuestion);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.questionService.remove(id);
  }
}
