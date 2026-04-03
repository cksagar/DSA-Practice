import express from 'express';
import { connectMongoDB } from './connection.js';
import userRoutes from './routes/user.routes.js';
import { routeAccessMiddleware } from './middlewares/route-access.middleware.js';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

connectMongoDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    });

    app.use(express.json());
    app.use(routeAccessMiddleware);

    app.use('/api/users', userRoutes);

   
