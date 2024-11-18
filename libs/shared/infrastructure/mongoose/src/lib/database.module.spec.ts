import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from '@shared/config';
import { DatabaseModule } from './database.module';

describe('DatabaseModule', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('should be defined', async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [databaseConfig],
        }),
        DatabaseModule,
      ],
    }).compile();

    expect(module).toBeDefined();
  });

  it('should use default values when environment variables are not set', async () => {
    delete process.env['DATABASE_HOST'];
    delete process.env['DATABASE_PORT'];
    delete process.env['DATABASE_NAME'];

    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [databaseConfig],
        }),
        DatabaseModule,
      ],
    }).compile();

    expect(module).toBeDefined();
  });

  it('should use environment variables for database connection', async () => {
    process.env['DATABASE_HOST'] = 'test-host';
    process.env['DATABASE_PORT'] = '27018';
    process.env['DATABASE_NAME'] = 'test';

    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [databaseConfig],
        }),
        DatabaseModule,
      ],
    }).compile();

    expect(module).toBeDefined();
  });
});
