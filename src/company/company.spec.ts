describe('CompanyController', () => {
  let controller: CompanyController;
  let service: CompanyService;
  let repository: Repository<Company>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        CompanyService,
        {
          provide: getRepositoryToken(Company),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
    service = module.get<CompanyService>(CompanyService);
    repository = module.get<Repository<Company>>(getRepositoryToken(Company));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a new company record and return that', async () => {
      const companyDto: CreateCompanyDto = {
        code: 'COMP123',
        raisonSociale: 'Test Company',
        siret: '12345678901234',
        typeGeneral: 1,
        orias: '12345',
        oriasVerifie: true,
        dateDebutOrias: new Date(),
      };
      const expectedResult: ReadCompanyDto = {
        id: 1,
        ...companyDto,
      };
      jest
        .spyOn(service, 'create')
        .mockImplementation(async () => expectedResult);

      expect(await controller.create(companyDto)).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return an array of companies', async () => {
      const result: ReadCompanyDto[] = [];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single company object', async () => {
      const id = 1;
      const result: ReadCompanyDto = {
        id,
        code: 'COMP123',
        raisonSociale: 'Test Company',
        siret: '12345678901234',
        typeGeneral: 1,
        orias: '12345',
        oriasVerifie: true,
        dateDebutOrias: new Date(),
      };

      jest.spyOn(service, 'findOne').mockImplementation(async () => result);

      expect(await controller.findOne('1')).toEqual(result);
    });

    it('should throw NotFoundException if company does not exist', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(controller.findOne('999')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a company', async () => {
      const companyDto: UpdateCompanyDto = {
        raisonSociale: 'Updated Company Name',
      };
      const expectedResult: ReadCompanyDto = {
        id: 1,
        code: 'COMP123',
        raisonSociale: 'Updated Company Name',
        siret: '12345678901234',
        typeGeneral: 1,
        orias: '12345',
        oriasVerifie: true,
        dateDebutOrias: new Date(),
      };

      jest
        .spyOn(service, 'update')
        .mockImplementation(async () => expectedResult);

      expect(await controller.update('1', companyDto)).toEqual(expectedResult);
    });

    it('should throw NotFoundException if company does not exist', async () => {
      const companyDto: UpdateCompanyDto = {
        raisonSociale: 'Updated Company Name',
      };

      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());

      await expect(controller.update('999', companyDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should delete a company', async () => {
      jest.spyOn(service, 'remove').mockImplementation(async () => undefined);

      await expect(controller.remove('1')).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if company does not exist', async () => {
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());

      await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
    });
  });
});
import { Test, TestingModule } from '@nestjs/testing';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateCompanyDto, UpdateCompanyDto, ReadCompanyDto } from './dto';

describe('CompanyController', () => {
  let controller: CompanyController;
  let service: CompanyService;
  let repository: Repository<Company>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        CompanyService,
        {
          provide: getRepositoryToken(Company),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            preload: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
    service = module.get<CompanyService>(CompanyService);
    repository = module.get<Repository<Company>>(getRepositoryToken(Company));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a new company record and return that', async () => {
      const createCompanyDto: CreateCompanyDto = {
        code: 'COMP123',
        raisonSociale: 'Test Company',
        siret: '12345678901234',
        typeGeneral: 5, // Assuming "Agent" type here
        orias: '12345',
        oriasVerifie: true,
        dateDebutOrias: new Date('2020-01-01'),
      };

      const expectedResult: ReadCompanyDto = {
        id: 1,
        ...createCompanyDto,
        users: [],
        providers: [],
      };

      jest.spyOn(service, 'create').mockResolvedValueOnce(expectedResult);

      expect(await controller.create(createCompanyDto)).toEqual(expectedResult);
    });
  });

  describe('findAll', () => {
    it('should return an array of companies', async () => {
      const expectedResult: ReadCompanyDto[] = [
        {
          id: 1,
          code: 'COMP123',
          raisonSociale: 'Test Company',
          siret: '12345678901234',
          typeGeneral: 5,
          orias: '12345',
          oriasVerifie: true,
          dateDebutOrias: new Date('2020-01-01'),
          users: [],
          providers: [],
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValueOnce(expectedResult);

      expect(await controller.findAll()).toBe(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a single company object', async () => {
      const id = 1;
      const expectedResult: ReadCompanyDto = {
        id,
        code: 'COMP123',
        raisonSociale: 'Test Company',
        siret: '12345678901234',
        typeGeneral: 5,
        orias: '12345',
        oriasVerifie: true,
        dateDebutOrias: new Date('2020-01-01'),
        users: [],
        providers: [],
      };

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(expectedResult);

      expect(await controller.findOne(id.toString())).toEqual(expectedResult);
    });

    it('should throw NotFoundException if company does not exist', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(controller.findOne('999')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a company', async () => {
      const updateCompanyDto: UpdateCompanyDto = {
        raisonSociale: 'Updated Company Name',
      };
      const id = 1;
      const expectedResult: ReadCompanyDto = {
        id,
        code: 'COMP123',
        raisonSociale: 'Updated Company Name',
        siret: '12345678901234',
        typeGeneral: 5,
        orias: '12345',
        oriasVerifie: true,
        dateDebutOrias: new Date('2020-01-01'),
        users: [],
        providers: [],
      };

      jest.spyOn(service, 'update').mockResolvedValueOnce(expectedResult);

      expect(await controller.update(id.toString(), updateCompanyDto)).toEqual(
        expectedResult,
      );
    });

    it('should throw NotFoundException if company does not exist for update', async () => {
      const updateCompanyDto: UpdateCompanyDto = {
        raisonSociale: 'Updated Company Name',
      };
      jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());

      await expect(controller.update('999', updateCompanyDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should delete a company', async () => {
      jest.spyOn(service, 'remove').mockResolvedValueOnce(undefined);
      await expect(controller.remove('1')).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if company does not exist for deletion', async () => {
      jest.spyOn(service, 'remove').mockRejectedValue(new NotFoundException());

      await expect(controller.remove('999')).rejects.toThrow(NotFoundException);
    });
  });
});
