import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateProjectObjectiveDto,
  UpdateProjectObjectiveDto,
  ReadProjectObjectiveDto,
} from './dto';
import { ProjectObjectiveService } from './project-objective.service';

@Controller('project-objectives')
export class ProjectObjectiveController {
  constructor(
    private readonly projectObjectiveService: ProjectObjectiveService,
  ) {}

  @Post()
  async create(
    @Body() createDto: CreateProjectObjectiveDto,
  ): Promise<ReadProjectObjectiveDto> {
    return this.projectObjectiveService.create(createDto);
  }

  @Get()
  async findAll(): Promise<ReadProjectObjectiveDto[]> {
    return this.projectObjectiveService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ReadProjectObjectiveDto> {
    const projectObjective = await this.projectObjectiveService.findOne(id);
    if (!projectObjective) {
      throw new NotFoundException(`Project Objective with ID ${id} not found`);
    }
    return projectObjective;
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdateProjectObjectiveDto,
  ): Promise<ReadProjectObjectiveDto> {
    return this.projectObjectiveService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.projectObjectiveService.remove(id);
  }
}
