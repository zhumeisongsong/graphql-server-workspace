import { Test } from '@nestjs/testing';
import { GenerateSomeSelfCareTasksUseCase } from './generate-some-self-care-tasks.use-case';
import { SelfCareTasksService } from '../self-care-tasks.service';

describe('GenerateSomeSelfCareTasksUseCase', () => {
  let useCase: GenerateSomeSelfCareTasksUseCase;
  let selfCareTasksService: SelfCareTasksService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        GenerateSomeSelfCareTasksUseCase,
        {
          provide: SelfCareTasksService,
          useValue: {
            generateSome: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    useCase = moduleRef.get<GenerateSomeSelfCareTasksUseCase>(
      GenerateSomeSelfCareTasksUseCase,
    );
    selfCareTasksService = moduleRef.get<SelfCareTasksService>(
      SelfCareTasksService,
    );
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should call selfCareTasksService.generateSome with correct params', async () => {
      const selfCareTopics = [
        { id: '1', name: 'Topic 1' },
        { id: '2', name: 'Topic 2' },
      ];
      const count = 5;

      await useCase.execute(selfCareTopics, count);

      expect(selfCareTasksService.generateSome).toHaveBeenCalledWith(
        selfCareTopics,
        count,
      );
    });

  });
});
