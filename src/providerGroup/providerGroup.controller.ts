import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { ProviderGroupService } from './provider-group.service';
import {
  CreateProviderGroupDto,
  UpdateProviderGroupDto,
  ReadProviderGroupDto,
} from './dto';

@Controller('provider-groups')
export class ProviderGroupController {
  constructor(private readonly providerGroupService: ProviderGroupService) {}

  @Post()
  async create(
    @Body() createProviderGroupDto: CreateProviderGroupDto,
  ): Promise<ReadProviderGroupDto> {
    const providerGroup = await this.providerGroupService.create(
      createProviderGroupDto,
    );
    return this.providerGroupService.transformToReadDto(providerGroup);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ReadProviderGroupDto> {
    const providerGroup = await this.providerGroupService.findOne(id);
    if (!providerGroup) {
      throw new NotFoundException(`ProviderGroup with ID ${id} not found`);
    }
    return this.providerGroupService.transformToReadDto(providerGroup);
  }

  @Get()
  async findAll(): Promise<ReadProviderGroupDto[]> {
    const providerGroups = await this.providerGroupService.findAll();
    return providerGroups.map((providerGroup) =>
      this.providerGroupService.transformToReadDto(providerGroup),
    );
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProviderGroupDto: UpdateProviderGroupDto,
  ): Promise<ReadProviderGroupDto> {
    const updatedProviderGroup = await this.providerGroupService.update(
      id,
      updateProviderGroupDto,
    );
    if (!updatedProviderGroup) {
      throw new NotFoundException(`ProviderGroup with ID ${id} not found`);
    }
    return this.providerGroupService.transformToReadDto(updatedProviderGroup);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.providerGroupService.remove(id);
  }
}
