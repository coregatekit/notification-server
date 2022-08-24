import mongoose from 'mongoose';

export interface IUser {
  username: string;
  token: string;
}

interface UserDocument extends mongoose.Document {
  username: string;
  token: string;
}

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  token: {
    type: String,
  },
}, { timestamps: true });

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;