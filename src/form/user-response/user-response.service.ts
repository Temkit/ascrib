import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserResponse } from './entities/user-response.entity';
import { CreateResponseDto } from './dto/create-response.dto';
import { ReadResponseDto } from './dto/read-response.dto';

@Injectable()
export class UserResponseService {
  constructor(
    @InjectRepository(UserResponse)
    private readonly userResponseRepository: Repository<UserResponse>,
  ) {}

  async create(createResponseDto: CreateResponseDto): Promise<UserResponse> {
    const response = this.userResponseRepository.create(createResponseDto);
    return await this.userResponseRepository.save(response);
  }

  async findOne(id: number): Promise<UserResponse> {
    const response = await this.userResponseRepository.findOneBy({ id });
    if (!response) {
      throw new NotFoundException(`UserResponse with ID ${id} not found`);
    }
    return response;
  }

  async findAll(): Promise<UserResponse[]> {
    return await this.userResponseRepository.find();
  }

  async update(id: number, updateResponseDto: any): Promise<UserResponse> {
    const response = await this.userResponseRepository.preload({
      id: id,
      ...updateResponseDto,
    });

    if (!response) {
      throw new NotFoundException(`UserResponse with ID ${id} not found`);
    }
    return this.userResponseRepository.save(response);
  }

  async remove(id: number): Promise<void> {
    const result = await this.userResponseRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`UserResponse with ID ${id} not found`);
    }
  }

  public transformToReadDto(userResponse: UserResponse): ReadResponseDto {
    return {
      id: userResponse.id,
      questionId: userResponse.questionId,
      responseDate: userResponse.responseDate,
    };
  }
}
