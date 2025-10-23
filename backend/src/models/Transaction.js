import { Schema, model } from 'mongoose';

const transactionSchema = Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        action: { type: String, enum: ['withdraw', 'addition'], required: true },
        requestId: {
            type: Schema.Types.ObjectId,
            ref: 'CollectionRequest',
            required: function () {
                return this.action === 'addition';
            },
        },
        amount: { type: Number },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: false }
);

transactionSchema.index({ userId: 1 });
transactionSchema.index({ requestId: 1 });

export default model('Transaction', transactionSchema);
