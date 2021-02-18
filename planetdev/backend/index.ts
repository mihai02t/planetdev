import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

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

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
