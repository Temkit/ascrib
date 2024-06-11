import { Test, TestingModule } from '@nestjs/testing';
import { ProviderController } from './provider.controller';
import { ProviderService } from './provider.service';
import { Provider } from './provider.entity';
import { NotFoundException } from '@nestjs/common';

describe('ProviderController (remove)', () => {
  let controller: ProviderController;
  let service: ProviderService;
  let provider: Provider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProviderController],
      providers: [
        {
          provide: ProviderService,
          useValue: {
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProviderController>(ProviderController);
    service = module.get<ProviderService>(ProviderService);
    provider = new Provider();
    provider.id = 1;
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);
  });

  it('should call remove method with correct id', async () => {
    await controller.remove(1);
    expect(service.remove).toHaveBeenCalledWith(1);
  });

  it('should return undefined when provider is successfully removed', async () => {
    const result = await controller.remove(1);
    expect(result).toBeUndefined();
  });

  it('should throw NotFoundException when provider does not exist', async () => {
    jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());
    await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
  });

  it('should throw error when remove method throws an error', async () => {
    jest
      .spyOn(service, 'remove')
      .mockRejectedValue(new Error('An error occurred'));
    await expect(controller.remove(1)).rejects.toThrow('An error occurred');
  });
});
