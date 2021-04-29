import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import './database';
import { router } from './routes';

const app = express();
//Para restringir acesso no cors app.use(cors({origin:'http://localhost:3000'}))
app.use(cors())
app.use(express.json());
app.use(router)


app.listen(3333, () => console.log("Server is running!"));