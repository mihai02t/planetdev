import mongoose, { Model, Document } from 'mongoose';

export interface IUser extends Document {
    googleID: string;
    name: string;
};

const userSchema = new mongoose.Schema({
    googleID: {
        type: String,
        unique: true
    },
    name: {
        type: String
    }
}, {
    timestamps: true
});

const User: Model<IUser> = mongoose.model('User', userSchema);

export default User;