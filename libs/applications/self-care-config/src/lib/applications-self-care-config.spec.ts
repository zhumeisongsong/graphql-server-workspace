import { applicationsSelfCareConfig } from './applications-self-care-config';

describe('applicationsSelfCareConfig', () => {
  it('should work', () => {
    expect(applicationsSelfCareConfig()).toEqual(
      'applications-self-care-config',
    );
  });
});
