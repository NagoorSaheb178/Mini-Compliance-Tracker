import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: [true, 'Please provide a company name'],
        maxlength: [100, 'Name cannot be more than 100 characters'],
    },
    country: {
        type: String,
        required: [true, 'Please provide a country'],
    },
    entity_type: {
        type: String,
        required: [true, 'Please provide an entity type'],
    },
}, { timestamps: true });

export default mongoose.models.Client || mongoose.model('Client', ClientSchema);
