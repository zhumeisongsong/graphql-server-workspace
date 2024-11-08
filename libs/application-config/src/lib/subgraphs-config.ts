import { ServiceEndpointDefinition } from '@apollo/gateway';

import { userSubGraph } from './applications-config';

export const subgraphsConfig: ServiceEndpointDefinition[] = [
  {
    name: userSubGraph.name,
    url: `${userSubGraph.host}:${userSubGraph.port}/graphql`,
  },
];
