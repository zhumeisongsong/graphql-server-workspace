import { ServiceEndpointDefinition } from '@apollo/gateway';

import { userAppConfig } from './applications.config';

export const subgraphsConfig: ServiceEndpointDefinition[] = [
  {
    name: userAppConfig.name,
    url: `${userAppConfig['host'] || ''}:${userAppConfig['port']}/graphql`,
  },
];
