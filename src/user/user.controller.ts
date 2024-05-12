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
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, ReadUserDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ReadUserDto> {
    const user = await this.userService.create(createUserDto);
    return this.userService.transformToReadDto(user);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ReadUserDto> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.userService.transformToReadDto(user);
  }

  @Get()
  async findAll(): Promise<ReadUserDto[]> {
    const users = await this.userService.findAll();
    return users.map((user) => this.userService.transformToReadDto(user));
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ReadUserDto> {
    const updatedUser = await this.userService.update(id, updateUserDto);
    return this.userService.transformToReadDto(updatedUser);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.userService.remove(id);
  }
}
