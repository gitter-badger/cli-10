# Floyd
The famework for building GraphQL backends, with first-class support for Typescript. You won't need to spend time trying to set up the GraphQL backend, Floyd will do it for you.

## Why
REST APIs are cumbersome to build and even tougher to deal with (for frontend developers). GraphQL eliminates most of the problems developers face while building and using APIs. See more benefits of GraphQL [here](https://graphql.org).

## Concepts
Floyd only has a few concepts you need to understand to get up and running with it. It is made to be as simple as possible to pick up and use.
### Components
A Floyd app is divided into multiple components, with each component having its own **Schema**, **Resolvers** and **Model**.
* Schema: It is a GraphQL schema with its own queries, mutations and subscriptions. Learn more [here](https://graphql.org/learn/schema/)
* Resolvers: These are the functions you write in code that map to the queries, mutations and subscriptions you have defined. Lern more [here](https://graphql.org/learn/execution/)
* Model: This is your Database model for your component. It is the **M** in MVC. In this file, you specify your model's databse schema and export the model object.

### Typescript
One of the advantages of GraphQL over REST is you can know beforehand exactly what the type and structure of the result will be. We wanted to extend this feature into all your app's code and hence we chose Typescript. Typescript helps you avoid a lot of the errors that might encounter during runtime in Javascript simply because you used the wrong type of object or didn't know what members the object has. Learn more [here](https://www.typescriptlang.org).

## Getting started

Install the Floyd CLI with npm:
```bash
npm install -g floyd-cli
```

Create your project in any directory you want using the `create` command:
```bash
floyd create <name> <path>
```

For example:
```bash
floyd create hello-world ~/playground
```
will create your project in `~/playground/hello-world/`

## Project structure
```
.
├── app
│   ├── app.config.json
│   ├── components
│   │   └── cat
│   │       ├── model.ts
│   │       ├── resolvers.ts
│   │       └── schema.graphql
│   ├── db.ts
│   ├── helpers.ts
│   ├── index.ts
│   ├── resolvers.ts
│   └── schema.graphql
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```
The app folder will contain all the code for your backend. `app.config.json` will contain all your configuration options, like database URL, name of all the components, etc. `schema.graphql` will contain the global types of your schema, i.e. types needed by more than one component's schema. Similarly, `resolvers.ts` will contain all the global resolvers that you might need, just make sure none (neither global nor component specific) of your resolver names collide, since all of them will be made available in the same scope.

## Contributing


## Code of Conduct
