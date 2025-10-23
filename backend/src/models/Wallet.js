import { Schema, model } from 'mongoose';

const walletSchema = Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        balance: { type: Number, default: 0, min: 0 },
    },
    { timestamps: false }
);

walletSchema.index({ userId: 1 });

export default model('Wallet', walletSchema);
