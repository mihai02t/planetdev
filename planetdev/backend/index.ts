import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import passport from 'passport';
import morgan from 'morgan';

import * as strategies from './auth/strategies';

import auth from './auth';

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const port = process.env.port || 5000;

app.use(cors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
}));
app.use(express.json());

app.use(morgan('dev'));

app.use(passport.initialize());
passport.use(strategies.GooglePassport);

if(process.env.ATLAS_URI !== undefined) {
    mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
}
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connection opened successfully");
});
connection.on('error', () => {
    console.log("Error");
});

app.use('/api/auth', auth);

app.get('/', (_, res) => {
    res.send("API is healthy");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
