import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from './team.entity';
import { CreateTeamDto, UpdateTeamDto, ReadTeamDto } from './dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
  ) {}

  // Create a new team
  async create(createTeamDto: CreateTeamDto): Promise<ReadTeamDto> {
    const team = this.teamRepository.create(createTeamDto);
    const savedTeam = await this.teamRepository.save(team);
    return this.transformToReadDto(savedTeam);
  }

  // Find all teams
  async findAll(): Promise<ReadTeamDto[]> {
    const teams = await this.teamRepository.find({
      relations: ['teamLeader', 'providers', 'teamMembers'],
    });
    return teams.map((team) => this.transformToReadDto(team));
  }

  // Find a team by ID
  // Find a team by ID using findOneBy
  async findOne(id: number): Promise<ReadTeamDto> {
    const team = await this.teamRepository.findOneBy({ id: id });
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    // Ensure to load relations separately if needed, here is a placeholder implementation
    // This would ideally be done more efficiently depending on your setup and requirements
    await this.teamRepository.findOne({
      where: { id: id },
      relations: ['teamLeader', 'providers', 'teamMembers'],
    });
    return this.transformToReadDto(team);
  }

  // Update a team
  async update(id: number, updateTeamDto: UpdateTeamDto): Promise<ReadTeamDto> {
    const team = await this.teamRepository.preload({
      id: id,
      ...updateTeamDto,
    });
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    const updatedTeam = await this.teamRepository.save(team);
    return this.transformToReadDto(updatedTeam);
  }

  // Delete a team
  async remove(id: number): Promise<void> {
    const result = await this.teamRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
  }

  // Helper method to transform team entity to ReadTeamDto
  public transformToReadDto(team: Team): ReadTeamDto {
    const { id, code, name, teamLeader, providers, teamMembers } = team;
    return { id, code, name, teamLeader, providers, teamMembers };
  }
}
