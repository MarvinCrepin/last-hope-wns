import express from 'express';
import cors from 'cors';

require('dotenv').config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start Server
app.listen(process.env.PORT, () => console.log('Server started on 5000')); // eslint-disable-line no-console
