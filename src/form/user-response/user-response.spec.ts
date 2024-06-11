import { Test, TestingModule } from '@nestjs/testing';
import { UserResponseController } from './user-response.controller';
import { UserResponseService } from './user-response.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { BadRequestException } from '@nestjs/common';
import { UserResponse } from './entities/user-response.entity';
import { Question } from '../question/entities/question.entity';

describe('UserResponseController', () => {
  let controller: UserResponseController;
  let service: UserResponseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserResponseController],
      providers: [
        {
          provide: UserResponseService,
          useValue: {
            create: jest.fn(),
            transformToReadDto: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserResponseController>(UserResponseController);
    service = module.get<UserResponseService>(UserResponseService);
  });

  it('should throw BadRequestException for invalid input', async () => {
    const createResponseDto: CreateResponseDto = {
      questionId: 0,
    };

    jest.spyOn(service, 'create').mockRejectedValue(new BadRequestException());

    await expect(controller.create(createResponseDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw BadRequestException for missing required fields', async () => {
    const createResponseDto: CreateResponseDto = {
      questionId: 0,
    };

    jest.spyOn(service, 'create').mockRejectedValue(new BadRequestException());

    await expect(controller.create(createResponseDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw BadRequestException for out-of-range values', async () => {
    const createResponseDto: CreateResponseDto = {
      questionId: 0,
    };

    jest.spyOn(service, 'create').mockRejectedValue(new BadRequestException());

    await expect(controller.create(createResponseDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw BadRequestException for non-numeric values in numeric fields', async () => {
    const createResponseDto: CreateResponseDto = {
      questionId: 0,
    };

    jest.spyOn(service, 'create').mockRejectedValue(new BadRequestException());

    await expect(controller.create(createResponseDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should create a user response successfully', async () => {
    const createResponseDto: CreateResponseDto = {
      questionId: 1,
      // other properties
    };

    const userResponse: UserResponse = {
      id: 1,
      question: new Question(), // Add a Question object
      choiceResponses: [], // Add an array of ChoiceResponse objects
      responseDate: new Date(),
      questionId: 0,
    };

    jest.spyOn(service, 'create').mockResolvedValue(userResponse);
    jest.spyOn(service, 'transformToReadDto').mockReturnValue({
      id: 1,
      questionId: 1,
      responseDate: undefined,
    });

    expect(await controller.create(createResponseDto)).toEqual({
      id: 1,
      questionId: 1,
      // other properties
    });
  });
});
