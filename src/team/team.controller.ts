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
import { CreateTeamDto, UpdateTeamDto, ReadTeamDto } from './dto';
import { TeamService } from './team.service';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async create(@Body() createTeamDto: CreateTeamDto): Promise<ReadTeamDto> {
    const team = await this.teamService.create(createTeamDto);
    return this.teamService.transformToReadDto(team);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ReadTeamDto> {
    const team = await this.teamService.findOne(id);
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return this.teamService.transformToReadDto(team);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTeamDto: UpdateTeamDto,
  ): Promise<ReadTeamDto> {
    const team = await this.teamService.update(id, updateTeamDto);
    return this.teamService.transformToReadDto(team);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.teamService.remove(id);
  }

  // Additional methods for handling other routes can be added here
}
