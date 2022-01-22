import { Test, TestingModule } from "@nestjs/testing";
import { LogStoreService } from "./log.service";

describe("LogService", () => {
  let service: LogStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogStoreService],
    }).compile();

    service = module.get<LogStoreService>(LogStoreService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
