import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { NotFoundException } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  describe('remove()', () => {
    it('should remove the user successfully', async () => {
      const userId = 1;
      jest.spyOn(service, 'remove').mockResolvedValue();

      await expect(controller.remove(userId)).resolves.toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(userId);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      const invalidUserId = '999'; // string
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());
      await expect(controller.remove(+invalidUserId)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an error if service throws an error', async () => {
      const userId = 1;
      const errorMessage = 'Unexpected error';
      jest.spyOn(service, 'remove').mockRejectedValue(new Error(errorMessage));

      await expect(controller.remove(userId)).rejects.toThrow(errorMessage);
      expect(service.remove).toHaveBeenCalledWith(userId);
    });

    it('should handle null value for user id', async () => {
      const userId = null;
      jest
        .spyOn(service, 'remove')
        .mockRejectedValue(new Error('Invalid user id'));

      await expect(controller.remove(userId)).rejects.toThrow(
        'Invalid user id',
      );
      expect(service.remove).not.toHaveBeenCalled();
    });
  });
});
