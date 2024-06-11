// src/question/question.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { NotFoundException } from '@nestjs/common';

describe('QuestionController', () => {
  let controller: QuestionController;
  let service: QuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
      providers: [
        {
          provide: QuestionService,
          useValue: {
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<QuestionController>(QuestionController);
    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('remove', () => {
    it('should remove a question successfully', async () => {
      const questionId = 1;
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      await expect(controller.remove(questionId)).resolves.toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(questionId);
    });

    it('should throw NotFoundException if question does not exist', async () => {
      const questionId = 999;
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());

      await expect(controller.remove(questionId)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an error if question service throws an error', async () => {
      const questionId = 1;
      const errorMessage = 'Database error';
      jest.spyOn(service, 'remove').mockRejectedValue(new Error(errorMessage));

      await expect(controller.remove(questionId)).rejects.toThrow(errorMessage);
    });

    it('should handle negative question id', async () => {
      const questionId = -1;
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());

      await expect(controller.remove(questionId)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should handle zero question id', async () => {
      const questionId = 0;
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());

      await expect(controller.remove(questionId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
