import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CountryService } from './country.service';
import { CreateCountryDto, UpdateCountryDto } from './dto';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  async create(@Body() createCountryDto: CreateCountryDto) {
    return await this.countryService.create(createCountryDto);
  }

  @Get()
  async findAll() {
    return await this.countryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.countryService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCountryDto: UpdateCountryDto,
  ) {
    if (!id || typeof id !== 'number' || id <= 0) {
      throw new Error('NotFoundException ID is required');
    }

    return await this.countryService.update(id, updateCountryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    if (!id || typeof id !== 'number' || id <= 0) {
      throw new Error('NotFoundException ID is required');
    }
    return await this.countryService.remove(id);
  }
}
