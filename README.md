# Web

```
SUBSCRIBE_ENDPOINT=ws://localhost:4000/subscriptions \
GRAPHQL_ENDPOINT=http://localhost:4000/graphql \
MATRIX_ENDPOINT=http://localhost:8008 \
yarn start
```

### Notes

- `rm -rf .cache` after change envs
- `get-graphql-schema http://localhost:4000/graphql > ./schema.graphql` update schema.graphql
