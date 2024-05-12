import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectObjective } from './project-objective.entity';
import {
  CreateProjectObjectiveDto,
  UpdateProjectObjectiveDto,
  ReadProjectObjectiveDto,
} from './dto';

@Injectable()
export class ProjectObjectiveService {
  constructor(
    @InjectRepository(ProjectObjective)
    private readonly projectObjectiveRepository: Repository<ProjectObjective>,
  ) {}

  async create(
    createProjectObjectiveDto: CreateProjectObjectiveDto,
  ): Promise<ReadProjectObjectiveDto> {
    const projectObjective = this.projectObjectiveRepository.create(
      createProjectObjectiveDto,
    );
    const savedProjectObjective =
      await this.projectObjectiveRepository.save(projectObjective);
    return this.transformToReadDto(savedProjectObjective);
  }

  async findAll(): Promise<ReadProjectObjectiveDto[]> {
    const projectObjectives = await this.projectObjectiveRepository.find();
    return projectObjectives.map((obj) => this.transformToReadDto(obj));
  }

  async findOne(id: number): Promise<ReadProjectObjectiveDto> {
    const projectObjective = await this.projectObjectiveRepository.findOne({
      where: { id },
      relations: ['providers'], // assuming you want to load related providers
    });
    if (!projectObjective) {
      throw new NotFoundException(`Project Objective with ID ${id} not found`);
    }
    return this.transformToReadDto(projectObjective);
  }

  async update(
    id: number,
    updateProjectObjectiveDto: UpdateProjectObjectiveDto,
  ): Promise<ReadProjectObjectiveDto> {
    const projectObjective = await this.projectObjectiveRepository.preload({
      id: id,
      ...updateProjectObjectiveDto,
    });
    if (!projectObjective) {
      throw new NotFoundException(`Project Objective with ID ${id} not found`);
    }
    await this.projectObjectiveRepository.save(projectObjective);
    return this.transformToReadDto(projectObjective);
  }

  async remove(id: number): Promise<void> {
    const result = await this.projectObjectiveRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Project Objective with ID ${id} not found`);
    }
  }

  private transformToReadDto(
    projectObjective: ProjectObjective,
  ): ReadProjectObjectiveDto {
    return {
      id: projectObjective.id,
      name: projectObjective.name,
    };
  }
}
