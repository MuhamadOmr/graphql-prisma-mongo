# backend!

based on:

- graphql
- prisma
- mongodb
- jwt for authentication
- joi for validation
- docker

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

**available queries**

```GraphQL
query {
  users {
    name
  }
}
# Write your query or mutation here
mutation {
  signup(email:"mo@mo.com", password:"123456",name:"moahamd"){
    name
    token
    id
    email

  }
}

mutation {
  signin(email:"mo@mo.com", password:"123456"){
    name
    token
    id
    email

  }
}

query{
  me{
    name
    token
  }
}
```
