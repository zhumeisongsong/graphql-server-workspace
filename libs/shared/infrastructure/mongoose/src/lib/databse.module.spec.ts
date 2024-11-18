import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseModule } from './database.module';

describe('DatabaseModule', () => {
  it('should configure MongoDB connection using config service values', async () => {
    const mockConfigService = {
      get: jest.fn().mockReturnValue({
        host: 'test-host',
        port: 27017,
        name: 'test-db'
      })
    };

    const module = await Test.createTestingModule({
      imports: [DatabaseModule],
    })
    .overrideProvider(ConfigService)
    .useValue(mockConfigService)
    .compile();

    const mongooseModule = module.get(MongooseModule);
    expect(mongooseModule).toBeDefined();
    expect(mockConfigService.get).toHaveBeenCalledWith('database');
  });
});
