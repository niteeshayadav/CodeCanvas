import mongoose from 'mongoose';

const snippetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    isPinned: {
        type: Boolean,
        default: false  
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Snippet = mongoose.model('Snippet', snippetSchema);

export default Snippet;