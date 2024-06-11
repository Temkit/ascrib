import { Test, TestingModule } from '@nestjs/testing';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { NotFoundException } from '@nestjs/common';

describe('TeamController', () => {
  let controller: TeamController;
  let service: TeamService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamController],
      providers: [
        {
          provide: TeamService,
          useValue: {
            findOne: jest.fn(),
            transformToReadDto: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TeamController>(TeamController);
    service = module.get<TeamService>(TeamService);
  });

  it('should throw NotFoundException when trying to retrieve a non-existent team', async () => {
    const nonExistentId = 999;
    jest.spyOn(service, 'findOne').mockResolvedValue(undefined);

    await expect(controller.findOne(nonExistentId)).rejects.toThrow(
      NotFoundException,
    );
    expect(service.findOne).toHaveBeenCalledWith(nonExistentId);
  });

  it('should throw NotFoundException with correct message when trying to retrieve a non-existent team', async () => {
    const nonExistentId = 999;
    jest.spyOn(service, 'findOne').mockResolvedValue(undefined);

    await expect(controller.findOne(nonExistentId)).rejects.toThrowError(
      `Team with ID ${nonExistentId} not found`,
    );
  });

  it('should not call transformToReadDto when trying to retrieve a non-existent team', async () => {
    const nonExistentId = 999;
    jest.spyOn(service, 'findOne').mockResolvedValue(undefined);
    jest.spyOn(service, 'transformToReadDto').mockImplementation(() => {
      throw new Error('This should not be called');
    });

    await expect(controller.findOne(nonExistentId)).rejects.toThrow(
      NotFoundException,
    );
    expect(service.transformToReadDto).not.toHaveBeenCalled();
  });

  it('should not call findOne method when trying to retrieve a non-existent team and service throws an error', async () => {
    const nonExistentId = 999;
    const errorMessage = 'Service error';
    jest.spyOn(service, 'findOne').mockRejectedValue(new Error(errorMessage));

    await expect(controller.findOne(nonExistentId)).rejects.toThrow(
      errorMessage,
    );
    expect(service.findOne).toHaveBeenCalledWith(nonExistentId);
  });

  it('should not call transformToReadDto method when trying to retrieve a non-existent team and service throws an error', async () => {
    const nonExistentId = 999;
    const errorMessage = 'Service error';
    jest.spyOn(service, 'findOne').mockRejectedValue(new Error(errorMessage));
    jest.spyOn(service, 'transformToReadDto').mockImplementation(() => {
      throw new Error('This should not be called');
    });

    await expect(controller.findOne(nonExistentId)).rejects.toThrow(
      errorMessage,
    );
    expect(service.transformToReadDto).not.toHaveBeenCalled();
  });
});
