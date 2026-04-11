import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import { routeAccessMiddleware } from './middlewares/route-access.middleware.js';
import healthcheckRouter from './routes/healthcheck.routes.js';
const app = express();

// express middleware
// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// serve static files
app.use(express.static('public'));

// cors middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(',') || 'http://localhost:4200',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// middlewares to check if the user is authenticated
app.use(routeAccessMiddleware);

// healthcheck route
app.use('/api/v1/healthcheck', healthcheckRouter);

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'welcome to the api' });
});

// routes to handle user requests
app.use('/api/users', userRoutes);

export default app;
