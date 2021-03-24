import mongoose, { Model, Document } from 'mongoose';

export interface User extends Document {
    googleID: string;
    name: string;
    colour: string;
    points: number;
};

const userSchema = new mongoose.Schema({
    googleID: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        default: null
    },
    colour: {
        type: String,
        default: 'green'
    },
    points: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const UserDB: Model<User> = mongoose.model('User', userSchema);

export default UserDB;