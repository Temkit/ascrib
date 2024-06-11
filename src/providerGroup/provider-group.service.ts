// src/providerGroup/provider-group.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProviderGroup } from './provider-group.entity';
import {
  CreateProviderGroupDto,
  UpdateProviderGroupDto,
  ReadProviderGroupDto,
} from './dto';

@Injectable()
export class ProviderGroupService {
  constructor(
    @InjectRepository(ProviderGroup)
    private readonly providerGroupRepository: Repository<ProviderGroup>,
  ) {}

  async create(
    createProviderGroupDto: CreateProviderGroupDto,
  ): Promise<ProviderGroup> {
    const providerGroup = this.providerGroupRepository.create(
      createProviderGroupDto,
    );
    return this.providerGroupRepository.save(providerGroup);
  }

  async findAll(): Promise<ReadProviderGroupDto[]> {
    const providerGroups = await this.providerGroupRepository.find();
    return providerGroups.map((group) => this.transformToReadDto(group));
  }

  async findOne(id: number): Promise<ReadProviderGroupDto> {
    const providerGroup = await this.providerGroupRepository.findOneBy({ id });
    if (!providerGroup) {
      throw new NotFoundException(`ProviderGroup with ID ${id} not found`);
    }
    return this.transformToReadDto(providerGroup);
  }
  async update(
    id: number,
    updateDto: UpdateProviderGroupDto,
  ): Promise<ReadProviderGroupDto> {
    const providerGroup = await this.providerGroupRepository.findOneBy({ id });

    if (!providerGroup) {
      throw new NotFoundException(`ProviderGroup with ID ${id} not found`);
    }

    // Manually update the properties of the providerGroup entity
    Object.assign(providerGroup, updateDto);

    await this.providerGroupRepository.save(providerGroup);
    return this.transformToReadDto(providerGroup);
  }

  async remove(id: number): Promise<void> {
    const result = await this.providerGroupRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ProviderGroup with ID ${id} not found`);
    }
  }

  // Method to transform a ProviderGroup entity to a ReadProviderGroupDto
  public transformToReadDto(
    providerGroup: ReadProviderGroupDto,
  ): ReadProviderGroupDto {
    return {
      id: providerGroup.id,
      code: providerGroup.code,
      nom: providerGroup.nom,
    };
  }
}
