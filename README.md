# GraphqlFederationWorkspace

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is almost ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/nx-api/nest?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve gateway
```

To create a production bundle:

```sh
npx nx build gateway
```

To see all available targets to run for a project, run:

```sh
npx nx show project gateway
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/nest:app xxx
```

To generate a new library, use:

```sh
npx nx g @nx/node:lib xxx
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Architecture

| Layer                        | Description                                                                                                                                                                                                                                                                                                                                                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| interface-adapters           | It should not contain complex business logic.<br/> Responsible for receiving and processing requests from clients. These requests are interactions with external systems that need to be converted into operations that conform to the business logic through adapters.<br/>Relies on the Application layer for core business logic, avoiding direct interaction with databases or other external systems. |
| resolver(interface-adapters) | Handles GraphQL queries and mutations by converting them into calls to the application layer.<br/> Responsible for input validation and response formatting specific to GraphQL.                                                                                                                                                                                                                           |
| dto(interface-adapters)      | Define DTOs for GraphQL schema.                                                                                                                                                                                                                                                                                                                                                                            |
| infrastructure               | Implements the technical capabilities needed to support the higher layers of the application.<br/> Handles database connections, external service integrations, and other technical concerns.<br/> Contains concrete implementations of repository interfaces defined in the domain layer.                                                                                                                 |

| mongoose(infrastructure) | Implements the repository interfaces defined in the domain layer using Mongoose as the ODM (Object Document Mapper).<br/> Includes Mongoose Schema definitions, database connection management, and concrete implementations of repository interfaces (e.g., MongooseUsersRepository).<br/> Adding validation in the Mongoose schema ensures that any data persisted to the database adheres to the required constraints. This helps maintain data integrity and prevents invalid or duplicate entries at the database level. |
| service(application) | As the core of the application layer, it mainly interacts with the domain layer and interface-adapter layer.<br/> If you migrate to a non-NestJS architecture in the future (e.g. other frameworks or microservices), the application tier code can be left unaffected. |
| use-case(application) | Define business use cases and encapsulate business logic.<br/> Implementing validation in the use-case layer allows you to enforce business logic and provide immediate feedback to users or calling services. This is where you can handle complex validation rules and provide detailed error messages.|
| entity(domain) | Define core business entities and business rules.<br/> Maintain entity independence from database and framework. |
| repository(domain) | Interfaces (or abstract classes), which define methods for manipulating data without concern for specific database implementations.<br/> By defining this interface, we can decouple database access: the specific details of data access will be done by implementation classes, such as specific implementations using tools like Mongoose, TypeORM, Prisma, and so on. |

## Useful links

Move a project to another folder in the workspace:

`nx g @nx/workspace:move --project xxx --destination root/xxx/xxx`

Learn more:

- [Learn more about this workspace setup](https://nx.dev/nx-api/nest?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:

- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
