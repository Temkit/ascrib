import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { ProviderService } from './provider.service';
import { Provider } from './provider.entity';

@Controller('providers')
export class ProviderController {
  constructor(private providerService: ProviderService) {}

  @Get()
  async findAll(): Promise<Provider[]> {
    return this.providerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Provider> {
    return this.providerService.findOne(id);
  }

  @Post()
  async create(
    @Body() createProviderDto: CreateProviderDto,
  ): Promise<Provider> {
    return this.providerService.create(createProviderDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProviderDto: UpdateProviderDto,
  ): Promise<Provider> {
    return this.providerService.update(id, updateProviderDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number): Promise<void> {
    if (!id || typeof id !== 'number' || id <= 0) {
      throw new Error('Invalid ID provided');
    }
    await this.providerService.remove(id);
  }
}
