import { sharedInfrastructureDeepseek } from './shared-infrastructure-deepseek';

describe('sharedInfrastructureDeepseek', () => {
  it('should work', () => {
    expect(sharedInfrastructureDeepseek()).toEqual(
      'shared-infrastructure-deepseek',
    );
  });
});
