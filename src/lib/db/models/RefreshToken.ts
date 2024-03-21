import mongoose from 'mongoose';

const RefreshTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.
            Types.ObjectId,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: 60 * 60 * 24 * 60, // 60 days in seconds
        default: Date.now,
    },

});

export default mongoose.models.RefreshToken || mongoose.model('RefreshToken', RefreshTokenSchema);