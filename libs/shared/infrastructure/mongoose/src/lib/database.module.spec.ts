import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from '@shared/config';
import { DatabaseModule } from './database.module';

describe('DatabaseModule', () => {
  it('should be defined', () => {
    expect(DatabaseModule).toBeDefined();
  });

  // TODO: Add tests for the database module
});
