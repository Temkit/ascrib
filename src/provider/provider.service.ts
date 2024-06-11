import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from './provider.entity';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) {}

  async findAll(): Promise<Provider[]> {
    return this.providerRepository.find({
      relations: [
        'users',
        'company',
        'pays',
        'equipe',
        'objectif_projet',
        'groupes',
      ],
    });
  }

  async findOne(id: number): Promise<Provider> {
    try {
      const provider = await this.providerRepository.findOneOrFail({
        where: { id },
        relations: [
          'users',
          'company',
          'pays',
          'equipe',
          'objectif_projet',
          'groupes',
        ],
      });
      return provider;
    } catch (error) {
      throw new NotFoundException(`Provider with ID ${id} not found`);
    }
  }

  async create(createProviderDto: CreateProviderDto): Promise<Provider> {
    const provider = this.providerRepository.create(createProviderDto);
    return this.providerRepository.save(provider);
  }

  async update(
    id: number,
    updateProviderDto: UpdateProviderDto,
  ): Promise<Provider> {
    const provider = await this.findOne(id);
    this.providerRepository.merge(provider, updateProviderDto);
    return this.providerRepository.save(provider);
  }

  async remove(id: number): Promise<void> {
    if (!id || typeof id !== 'number' || id < 1) {
      throw new NotFoundException(`Provider with ID ${id} not found`);
    }
    const result = await this.providerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Provider with ID ${id} not found`);
    }
  }
}
