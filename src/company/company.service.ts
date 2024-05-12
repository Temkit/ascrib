import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './company.entity';
import { CreateCompanyDto, UpdateCompanyDto, ReadCompanyDto } from './dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<ReadCompanyDto> {
    const company = this.companyRepository.create(createCompanyDto);
    await this.companyRepository.save(company);
    return this.transformToReadDto(company);
  }

  async findAll(): Promise<ReadCompanyDto[]> {
    const companies = await this.companyRepository.find({
      relations: ['users', 'providers'],
    });
    return companies.map((company) => this.transformToReadDto(company));
  }

  async findOne(id: number): Promise<ReadCompanyDto> {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['users', 'providers'],
    });
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return this.transformToReadDto(company);
  }

  async update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<ReadCompanyDto> {
    const company = await this.companyRepository.preload({
      id: id,
      ...updateCompanyDto,
    });
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    await this.companyRepository.save(company);
    return this.transformToReadDto(company);
  }

  async remove(id: number): Promise<void> {
    const result = await this.companyRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
  }

  public transformToReadDto(company: Company): ReadCompanyDto {
    return {
      ...company,
      users: company.users, // Assuming users is loaded with the company
      providers: company.providers, // Assuming providers is loaded with the company
    };
  }
}
