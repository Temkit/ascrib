import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProviderGroupService } from './provider-group.service';
import { ProviderGroupController } from './providerGroup.controller';
import { ProviderGroup } from './provider-group.entity';
import { CreateProviderGroupDto, UpdateProviderGroupDto } from './dto';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

describe('ProviderGroupModule', () => {
  let providerGroupService: ProviderGroupService;
  let providerGroupController: ProviderGroupController;
  let mockProviderGroupRepository: Partial<Repository<ProviderGroup>>;

  beforeEach(async () => {
    // Mock ProviderGroupRepository
    mockProviderGroupRepository = {
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest
        .fn()
        .mockImplementation((providerGroup) =>
          Promise.resolve({ id: Date.now(), ...providerGroup }),
        ),
      find: jest.fn().mockResolvedValue([]),
      findOneBy: jest.fn().mockImplementation(({ id }) =>
        Promise.resolve({
          id,
          code: 'XYZ',
          nom: 'Test Group',
        }),
      ),
      delete: jest.fn().mockResolvedValue({ affected: 1 }),
    };

    // Create testing module
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProviderGroupController],
      providers: [
        ProviderGroupService,
        {
          provide: getRepositoryToken(ProviderGroup),
          useValue: mockProviderGroupRepository,
        },
      ],
    }).compile();

    providerGroupService =
      module.get<ProviderGroupService>(ProviderGroupService);
    providerGroupController = module.get<ProviderGroupController>(
      ProviderGroupController,
    );
  });

  it('should be defined', () => {
    expect(providerGroupService).toBeDefined();
    expect(providerGroupController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new provider group', async () => {
      const createGroupDto: CreateProviderGroupDto = {
        code: 'ABC123',
        nom: 'New Provider Group',
      };
      const result = await providerGroupController.create(createGroupDto);

      expect(result).toEqual({
        id: expect.any(Number),
        ...createGroupDto,
      });
      expect(mockProviderGroupRepository.create).toHaveBeenCalledWith(
        createGroupDto,
      );
      expect(mockProviderGroupRepository.save).toHaveBeenCalledWith(
        createGroupDto,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of provider groups', async () => {
      const result = await providerGroupController.findAll();
      expect(result).toEqual([]);
      expect(mockProviderGroupRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single provider group', async () => {
      const id = 1;
      const result = await providerGroupController.findOne(id);
      expect(result).toEqual({
        id,
        code: 'XYZ',
        nom: 'Test Group',
      });
      expect(mockProviderGroupRepository.findOneBy).toHaveBeenCalledWith({
        id,
      });
    });

    it('should throw NotFoundException if ID not found', async () => {
      jest
        .spyOn(mockProviderGroupRepository, 'findOneBy')
        .mockResolvedValueOnce(undefined);
      expect(providerGroupController.findOne(9999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a provider group', async () => {
      const updateGroupDto: UpdateProviderGroupDto = {
        nom: 'Updated Name',
      };
      const id = 1;
      const result = await providerGroupController.update(id, updateGroupDto);

      expect(result).toEqual({
        id,
        code: 'XYZ',
        nom: 'Updated Name',
      });
      expect(mockProviderGroupRepository.findOneBy).toHaveBeenCalledWith({
        id,
      });
      expect(mockProviderGroupRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if ID not found for update', async () => {
      jest
        .spyOn(mockProviderGroupRepository, 'findOneBy')
        .mockResolvedValueOnce(undefined);
      const id = 999; // Non-existent ID
      expect(
        providerGroupController.update(id, { nom: 'Updated Name' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a provider group', async () => {
      const result = await providerGroupController.remove(1);
      expect(result).toBeUndefined();
      expect(mockProviderGroupRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if ID not found for delete', async () => {
      jest
        .spyOn(mockProviderGroupRepository, 'delete')
        .mockResolvedValueOnce({ affected: 0, raw: {} }); // Replace '{}' with the actual raw result
      expect(providerGroupController.remove(9999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
