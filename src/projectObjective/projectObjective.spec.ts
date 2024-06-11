import { Test, TestingModule } from '@nestjs/testing';
import { ProjectObjectiveController } from './project-objective.controller';
import { ProjectObjectiveService } from './project-objective.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProjectObjective } from './project-objective.entity';
import { Repository } from 'typeorm';
import { CreateProjectObjectiveDto, UpdateProjectObjectiveDto } from './dto';
import { NotFoundException } from '@nestjs/common';

describe('ProjectObjectiveController', () => {
    let controller: ProjectObjectiveController;
    let service: ProjectObjectiveService;
    let repository: Repository<ProjectObjective>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProjectObjectiveController],
            providers: [
                ProjectObjectiveService,
                {
                    provide: getRepositoryToken(ProjectObjective),
                    useClass: Repository,
                },
            ],
        }).compile();

        controller = module.get<ProjectObjectiveController>(ProjectObjectiveController);
        service = module.get<ProjectObjectiveService>(ProjectObjectiveService);
        repository = module.get(getRepositoryToken(ProjectObjective));
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(service).toBeDefined();
        expect(repository).toBeDefined();
    });

    describe('create()', () => {
        it('should successfully insert a new project objective', async () => {
            const dto: CreateProjectObjectiveDto = { name: 'New Objective' };
            const result: any = { id: 1, ...dto };

            jest.spyOn(service, 'create').mockImplementation(async () => result);

            expect(await controller.create(dto)).toEqual(result);
            expect(service.create).toHaveBeenCalledWith(dto);
        });
    });

    describe('findAll()', () => {
        it('should return an array of project objectives', async () => {
            const result: any[] = [{ id: 1, name: 'Objective 1' }];
            jest.spyOn(service, 'findAll').mockImplementation(async () => result);

            expect(await controller.findAll()).toEqual(result);
        });
    });

    describe('findOne()', () => {
        it('should return a single project objective', async () => {
            const result: any = { id: 1, name: 'Objective 1' };

            jest.spyOn(service, 'findOne').mockImplementation(async () => result);

            expect(await controller.findOne(1)).toEqual(result);
        });

        it('should throw NotFoundException', async () => {
            jest.spyOn(service, 'findOne').mockImplementation(async () => {
                throw new NotFoundException();
            });

            await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
        });
    });

    describe('update()', () => {
        it('should successfully update the project objective', async () => {
            const dto: UpdateProjectObjectiveDto = { name: 'Updated Objective' };
            
            const result: any = { id: 1, ...dto };

            jest.spyOn(service, 'update').mockImplementation(async () => result);

            expect(await controller.update(1, dto)).toEqual(result);
            expect(service.update).toHaveBeenCalledWith(1, dto);
        });

        it('should throw NotFoundException', async () => {
            jest.spyOn(service, 'update').mockImplementation(async () => {
                throw new NotFoundException();
            });

            await expect(controller.update(999, {})).rejects.toThrow(NotFoundException);
        });
    });

    describe('remove()', () => {
        it('should successfully remove the project objective', async () => {
            jest.spyOn(service, 'remove').mockImplementation(async () => undefined);

            await controller.remove(1);
            expect(service.remove).toHaveBeenCalledWith(1);
        });

        it('should throw NotFoundException on remove', async () => {
            jest.spyOn(service, 'remove').mockImplementation(async () => {
                throw new NotFoundException();
            });

            await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
        });
    });
});