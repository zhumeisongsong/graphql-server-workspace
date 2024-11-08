import { subgraphsConfig } from './subgraphs-config';
import { userSubGraph } from './applications-config';

describe('subgraphsConfig', () => {
  it('should have the correct configuration for the user subgraph', () => {
    expect(subgraphsConfig).toHaveLength(1);
    expect(subgraphsConfig[0]).toEqual({
      name: userSubGraph.name,
      url: `${userSubGraph.host}:${userSubGraph.port}/graphql`,
    });
  });
});
