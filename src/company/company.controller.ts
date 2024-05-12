import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCompanyDto, UpdateCompanyDto, ReadCompanyDto } from './dto';
import { CompanyService } from './company.service';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(
    @Body() createCompanyDto: CreateCompanyDto,
  ): Promise<ReadCompanyDto> {
    return this.companyService.create(createCompanyDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReadCompanyDto> {
    return this.companyService.findOne(+id);
  }

  @Get()
  async findAll(): Promise<ReadCompanyDto[]> {
    return this.companyService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<ReadCompanyDto> {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.companyService.remove(+id);
  }
}
