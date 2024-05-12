import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserResponseService } from './user-response.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { ReadResponseDto } from './dto/read-response.dto';

@Controller('user-responses')
export class UserResponseController {
  constructor(private readonly userResponseService: UserResponseService) {}

  @Post()
  async create(
    @Body() createResponseDto: CreateResponseDto,
  ): Promise<ReadResponseDto> {
    const newResponse =
      await this.userResponseService.create(createResponseDto);
    return this.userResponseService.transformToReadDto(newResponse);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ReadResponseDto> {
    const response = await this.userResponseService.findOne(id);
    return this.userResponseService.transformToReadDto(response);
  }

  @Get()
  async findAll(): Promise<ReadResponseDto[]> {
    const responses = await this.userResponseService.findAll();
    return responses.map((response) =>
      this.userResponseService.transformToReadDto(response),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.userResponseService.remove(id);
  }
}
