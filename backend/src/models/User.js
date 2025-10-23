import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: { type: String },
    username: { type: String, required: true },
    passwordHash: { type: String },
    email: { type: String, default: null, unique: true },
    phoneNumber: { type: String, default: null, unique: true },
    googleId: { type: String, sparse: true },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN', 'MANAGER', 'DRIVER', 'MEMBER'],
        default: 'MEMBER',
    },
    tokenVersion: { type: Number, default: 1 },
    walletId: { type: Schema.Types.ObjectId, required: true },
});

userSchema.index({ username: 1 });

export default model('User', userSchema);
