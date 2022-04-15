import express from 'express';
import cors from 'cors';

const { connectDB } = require('./db_connection');
// import { graphqlHTTP } from 'express-graphql';

require('dotenv').config();

const app = express();

connectDB();

const { PORT } = process.env;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// app.use(
//   '/graphql',
//   graphqlHTTP({
//     schema,
//     graphiql: true,
//   })
// );

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start Server
app.listen(PORT, () => console.log(`Server started on ${PORT}`)); // eslint-disable-line no-console
