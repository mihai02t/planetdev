import mongoose, { Model, Document } from 'mongoose';

export interface ChallengeInUser {
    challengeId: mongoose.Types.ObjectId;
    code: string;
    completed: boolean;
}

export interface User extends Document {
    googleID: string;
    name: string;
    points: number;
    planetsUnlocked: number;
    challenges: ChallengeInUser[];
}

const challengeinUserSchema = new mongoose.Schema({
    challengeId: mongoose.SchemaTypes.ObjectId,
    code: String,
    completed: Boolean
});

const userSchema = new mongoose.Schema({
    googleID: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        default: null
    },
    points: {
        type: Number,
        default: 0
    },
    planetsUnlocked: {
        type: Number,
        default: 1
    },
    challenges: {
        type: [challengeinUserSchema]
    }
}, {
    timestamps: true
});

const UserDB: Model<User> = mongoose.model('User', userSchema);

export default UserDB;