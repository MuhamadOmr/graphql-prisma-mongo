require('dotenv').config()
const createServer = require('./createServer');

const server = createServer();

server.express.use();
// TODO Use express middlware to populate current user

server.start({
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  deets => {
    console.log(`Server is now running on port http://localhost:${+deets.port}`);
  }
);
