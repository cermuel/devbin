import express, {Application, Request, Response, NextFunction} from 'express';
import { Server } from "socket.io";
import { createServer } from "http";
import { connectDB } from "./db/connect";
require('express-async-errors');
require('dotenv').config();
const app: Application = express();


const http = createServer(app);
const io = new Server(http);

import authRoutes from './auth/auth.routes';
import userRoutes from './users/user.routes';
import { errorHandlerMiddleware } from './middlewares/error.middleware';
import { notFound } from './middlewares/not-found.middleware';
import { authenticateUser } from './middlewares/auth';
import cors from 'cors';

app.use(cors<Request>());
app.use(express.json());
app.use('/api/auth', authRoutes)
app.use('/api/users', authenticateUser, userRoutes)

app.get('/', (req: Request, res: Response, next: NextFunction) => {

    
    res.send("Hello world!");
})



io.on<'connection'>('connection', (socket)=>{
  console.log('connect')
})

app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000;

const start = async (req?: Request, res?: Response) => {
  try {
    await connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/samo');
    http.listen(port, () => {
        console.log('Example app listening on port 5000!');
    })
  } catch (error) {
    console.log(error);
  }
};

start();
