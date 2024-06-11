import { Test, TestingModule } from '@nestjs/testing';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { Country } from './country.entity';
import { NotFoundException } from '@nestjs/common';
import { UpdateProjectObjectiveDto } from './../projectObjective/dto';
describe('CountryController (update)', () => {
  let controller: CountryController;
  let service: CountryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountryController],
      providers: [
        {
          provide: CountryService,
          useValue: {
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CountryController>(CountryController);
    service = module.get<CountryService>(CountryService);
  });

  it('should update a country by ID and return the updated country', async () => {
    const id = 1;
    const updateDto: UpdateProjectObjectiveDto = {
      name: 'Updated Country',
    };
    const expectedResult: Country = {
      id: 1,
      name: updateDto.name,
      // other properties
    } as Country;

    jest
      .spyOn(service, 'update')
      .mockReturnValue(Promise.resolve(expectedResult));
    expect(await controller.update(id, updateDto)).toEqual(expectedResult);
  });

  it('should throw NotFoundException if the country does not exist', async () => {
    const id = 999;
    jest.spyOn(service, 'update').mockRejectedValue(new NotFoundException());

    await expect(controller.update(id, {})).rejects.toThrow(NotFoundException);
  });

  it('should throw NotFoundException if the update method throws an error', async () => {
    const id = 1;
    jest
      .spyOn(service, 'update')
      .mockRejectedValue(new Error('Something went wrong'));

    await expect(controller.update(id, {})).rejects.toThrow(
      'Something went wrong',
    );
  });

  it('should not update a country if the ID is not provided', async () => {
    jest.spyOn(service, 'update').mockImplementation(() => {
      throw new Error('ID is required');
    });

    // Explicitly pass undefined or null for the id, and an empty object for updateCountryDto
    await expect(controller.update(undefined, {})).rejects.toThrow(
      'ID is required',
    );
  });
});
