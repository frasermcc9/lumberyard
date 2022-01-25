import { Test, TestingModule } from '@nestjs/testing';
import { ProjectStoreService } from './project-store.service';

describe('ProjectStoreService', () => {
  let service: ProjectStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectStoreService],
    }).compile();

    service = module.get<ProjectStoreService>(ProjectStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
