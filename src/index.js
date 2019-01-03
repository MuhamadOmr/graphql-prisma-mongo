require("dotenv").config();
const createServer = require("./createServer");

const server = createServer();

// server.express.use();
// TODO Use express middlware to populate current user

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_ENDPOINT
    }
  },
  options => {
    console.log(
      `Server is now running on port http://localhost:${+options.port}`
    );
  }
);
