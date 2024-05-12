import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './country.entity';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { ReadCountryDto } from './dto/read-country.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  // Create a new country
  async create(createCountryDto: CreateCountryDto): Promise<ReadCountryDto> {
    const country = this.countryRepository.create(createCountryDto);
    await this.countryRepository.save(country);
    return this.toReadDto(country);
  }

  // Read a country by ID
  async findOne(id: number): Promise<ReadCountryDto> {
    const country = await this.countryRepository.findOne({
      where: { id: id },
    });
    if (!country) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
    return this.toReadDto(country);
  }

  // Update a country by ID
  async update(
    id: number,
    updateCountryDto: UpdateCountryDto,
  ): Promise<ReadCountryDto> {
    const country = await this.countryRepository.preload({
      id: id,
      ...updateCountryDto,
    });
    if (!country) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
    await this.countryRepository.save(country);
    return this.toReadDto(country);
  }

  // Delete a country by ID
  async remove(id: number): Promise<void> {
    const result = await this.countryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
  }

  // Read all countries
  async findAll(): Promise<ReadCountryDto[]> {
    const countries = await this.countryRepository.find();
    return countries.map((country) => this.toReadDto(country));
  }

  private toReadDto(country: Country): ReadCountryDto {
    // Implement transformation logic to convert a Country entity to ReadCountryDto
    // Assuming ReadCountryDto has properties that match the necessary data of the Country entity
    return {
      id: country.id,
      name: country.name,
      iso_code: country.iso_code,
    };
  }
}
