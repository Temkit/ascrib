import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto, ReadUserDto } from './dto';

// Import the DTOs and entities from related modules
import { CompanyService } from '../company/company.service'; // Adjust the path as necessary
import { ProviderService } from '../provider/provider.service'; // Adjust the path as necessary
import { TeamService } from '../team/team.service'; // Adjust the path as necessary

// Import additional classes or interfaces as needed

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly companyService: CompanyService, // Assuming services are injected similarly
    private readonly providerService: ProviderService,
    private readonly teamService: TeamService,
  ) {}

  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  // Update existing user
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return await this.userRepository.save(user);
  }

  // Find a user by ID, ensuring relations are loaded correctly
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['company', 'provider', 'team'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  // Delete a user
  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  // Transform User entity to ReadUserDto by utilizing transformation logic from other services
  public transformToReadDto(user: User): ReadUserDto {
    return {
      id: user.id,
      username: user.username,
      code: user.code,
      code_externe: user.code_externe,
      token_publique: user.token_publique,
      ignore: user.ignore,
      date_fin: user.date_fin,
      offre: user.offre,
      is_prospect_reserved: user.is_prospect_reserved,
      connexion_interne_seulement: user.connexion_interne_seulement,
      ip_authorized: user.ip_authorized,
      company: user.company
        ? this.companyService.transformToReadDto(user.company)
        : null,
      provider: user.provider,
      team: user.team ? this.teamService.transformToReadDto(user.team) : null,
    };
  }

  // List all users
  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find({
      relations: ['company', 'provider', 'team'],
    });
    return users;
  }
}
