import dbConnect from '@/lib/mongodb';
import Client from '@/models/Client';
import Task from '@/models/Task';
import ClientTaskView from './ClientTaskView';
import { notFound } from 'next/navigation';

export default async function ClientDetailPage({ params }) {
    const { id } = await params;

    await dbConnect();
    const clientDoc = await Client.findById(id).lean();

    if (!clientDoc) {
        notFound();
    }

    const tasksDoc = await Task.find({ client_id: id }).sort({ due_date: 1 }).lean();

    const client = { ...clientDoc, _id: clientDoc._id.toString() };
    const tasks = tasksDoc.map(t => ({
        ...t,
        _id: t._id.toString(),
        client_id: t.client_id.toString(),
        due_date: new Date(t.due_date).toISOString(), // serialize date
    }));

    return <ClientTaskView client={client} initialTasks={tasks} />;
}
