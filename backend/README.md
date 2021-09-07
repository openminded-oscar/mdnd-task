# Mdnd-task backend
## Start the application first time:
1) Run script inside `/local` folder that will start Postgresql inside Docker
2) Run `npm run migrate` to apply schema to database
3) ```npm run start ```
4) Open http://127.0.0.1:3000 in your browser.

## Rebuild the project

To incrementally build the project:

```sh
npm run build
```

To force a full build by cleaning up cached artifacts:

```sh
npm run rebuild
```

## Useful commands

- `npm run migrate`: Migrate database schemas for models
- `npm run openapi-spec`: Generate OpenAPI spec into a file
- `npm run docker:build`: Build a Docker image for this application
- `npm run docker:run`: Run this application inside a Docker container
### Tests
```sh
npm test
```
