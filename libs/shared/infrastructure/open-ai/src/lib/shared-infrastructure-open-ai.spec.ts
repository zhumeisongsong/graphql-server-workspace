import { sharedInfrastructureOpenAi } from './shared-infrastructure-open-ai';

describe('sharedInfrastructureOpenAi', () => {
  it('should work', () => {
    expect(sharedInfrastructureOpenAi()).toEqual(
      'shared-infrastructure-open-ai',
    );
  });
});
