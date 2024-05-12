// src/question/question.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { AnswerOption } from './entities/answer-option.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { ReadQuestionDto } from './dto/read-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
    @InjectRepository(AnswerOption)
    private readonly answerOptionRepository: Repository<AnswerOption>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = this.questionRepository.create(createQuestionDto);
    if (createQuestionDto.answerOptions) {
      question.answerOptions = createQuestionDto.answerOptions.map((option) =>
        this.answerOptionRepository.create(option),
      );
    }
    return this.questionRepository.save(question);
  }

  async findAll(): Promise<ReadQuestionDto[]> {
    const questions = await this.questionRepository.find({
      relations: ['answerOptions'],
    });
    return questions.map((question) => this.transformToReadDto(question));
  }

  async findOne(id: number): Promise<ReadQuestionDto> {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['answerOptions'],
    });
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return this.transformToReadDto(question);
  }

  async update(
    id: number,
    updateQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    const question = await this.questionRepository.preload({
      id: id,
      ...updateQuestionDto,
    });
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return this.questionRepository.save(question);
  }

  async remove(id: number): Promise<void> {
    const result = await this.questionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
  }

  public transformToReadDto(question: Question): ReadQuestionDto {
    return {
      id: question.id,
      text: question.text,
      answerOptions: question.answerOptions.map((option) => ({
        id: option.id,
        text: option.text,
      })),
    };
  }
}
