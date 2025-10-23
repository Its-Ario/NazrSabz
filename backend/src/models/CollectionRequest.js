import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema(
    {
        requester: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },

        collector: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
            index: true,
        },

        items: [
            {
                name: { type: String, required: true },
                weight: { type: Number, default: 1, min: 1 },
                notes: String,
            },
        ],

        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: String,
            location: {
                type: { type: String, enum: ['Point'], default: 'Point' },
                coordinates: { type: [Number], default: [0, 0] },
            },
        },

        status: {
            type: String,
            enum: ['pending', 'assigned', 'in_progress', 'completed', 'cancelled'],
            default: 'pending',
            index: true,
        },

        scheduledAt: { type: Date, default: null },
        completedAt: { type: Date, default: null },

        notes: { type: String, trim: true },
        priority: { type: String, enum: ['normal', 'high'], default: 'normal' },

        metadata: {
            weight: Number,
            category: String,
        },
    },
    {
        timestamps: true,
    }
);

requestSchema.index({ 'address.location': '2dsphere' });

requestSchema.methods.assignCollector = async function (collectorId) {
    if (this.status !== 'pending') throw new Error('Order is not pending');
    this.collector = collectorId;
    this.status = 'assigned';
    await this.save();
};

requestSchema.methods.markCompleted = async function () {
    this.status = 'completed';
    this.completedAt = new Date();
    await this.save();
};

export default mongoose.model('CollectionRequest', requestSchema);
