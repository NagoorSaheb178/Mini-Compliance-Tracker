import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
    company_name: String,
    country: String,
    entity_type: String,
});
const Client = mongoose.models.Client || mongoose.model('Client', ClientSchema);

const TaskSchema = new mongoose.Schema({
    client_id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    category: String,
    due_date: Date,
    status: String,
    priority: String,
});
const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

const seedData = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.error('No MONGODB_URI set');
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        await Client.deleteMany({});
        await Task.deleteMany({});
        console.log('Cleared existing data');

        const clients = await Client.insertMany([
            { company_name: 'Acme Corp', country: 'United States', entity_type: 'LLC' },
            { company_name: 'Globex Inc', country: 'Canada', entity_type: 'Corporation' },
            { company_name: 'Stark Industries', country: 'United States', entity_type: 'Corporation' },
            { company_name: 'Wayne Enterprises', country: 'United States', entity_type: 'LLC' },
            { company_name: 'Cyberdyne Systems', country: 'United Kingdom', entity_type: 'Corporation' }
        ]);
        console.log('Inserted Clients');

        await Task.insertMany([
            {
                client_id: clients[0]._id,
                title: 'Annual Tax Return',
                description: 'File state and federal taxes',
                category: 'Tax',
                due_date: new Date(new Date().setDate(new Date().getDate() - 5)),
                status: 'Pending',
                priority: 'High'
            },
            {
                client_id: clients[0]._id,
                title: 'Q1 Compliance Report',
                description: 'Submit quarterly compliance data to state board',
                category: 'Filing',
                due_date: new Date(new Date().setDate(new Date().getDate() + 10)),
                status: 'Pending',
                priority: 'Medium'
            },
            {
                client_id: clients[1]._id,
                title: 'Financial Audit 2023',
                description: 'External auditor review',
                category: 'Audit',
                due_date: new Date(new Date().setDate(new Date().getDate() - 2)),
                status: 'Pending',
                priority: 'High'
            },
            {
                client_id: clients[2]._id,
                title: 'Renew Business License',
                category: 'Filing',
                due_date: new Date(new Date().setDate(new Date().getDate() + 30)),
                status: 'Completed',
                priority: 'Low'
            }
        ]);
        console.log('Inserted Tasks');

        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedData();
