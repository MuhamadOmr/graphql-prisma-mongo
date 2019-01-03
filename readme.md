# pushlog backend!

pushlog based on:

- graphql
- prisma
- mongodb
- jwt for authentication
- joi for validation

# start

make `docker.env` file:

```
PRISMA_ENDPOINT=http://prisma:4466
API_ENDPOINT=http://localhost:4444
FRONTEND_ENDPOINT=http://localhost:5555
PORT=4444
PRISMA_SECRET=secret123
APP_SECRET=secret1234
```

**run docker containers**

```sh
docker-compose up --build
```

access playground at **API_ENDPOINT**

test a query
make `docker.env` file:

```GraphQL
query {
  users {
    name
  }
}
```
