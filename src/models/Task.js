import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: [true, 'Please provide a client ID'],
    },
    title: {
        type: String,
        required: [true, 'Please provide a task title'],
        maxlength: [150, 'Title cannot be more than 150 characters'],
    },
    description: {
        type: String,
    },
    category: {
        type: String,
        required: [true, 'Please provide a category'],
    },
    due_date: {
        type: Date,
        required: [true, 'Please provide a due date'],
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending',
    },
    priority: {
        type: String,
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium',
    },
}, { timestamps: true });

export default mongoose.models.Task || mongoose.model('Task', TaskSchema);
