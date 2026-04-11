import dotenv from 'dotenv';
import app from './app.js';
import connectMongoDB from './db/index.js';

// load environment variables
dotenv.config({
  path: './.env',
});
const port = process.env.PORT || 3000;

// connect to MongoDB
connectMongoDB()
  .then(async () => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  });
