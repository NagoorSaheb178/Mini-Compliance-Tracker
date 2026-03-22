export const dynamic = 'force-dynamic';

import dbConnect from '@/lib/mongodb';
import Client from '@/models/Client';
import ClientList from '@/components/ClientList';

export default async function ClientsPage() {
    await dbConnect();

    const clientsDoc = await Client.find({}).sort({ company_name: 1 }).lean();

    const clients = clientsDoc.map(c => ({
        ...c,
        _id: c._id.toString()
    }));

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-1">Clients</h2>
                    <p className="text-zinc-500 dark:text-zinc-400">Manage compliance tasks by selecting a client below.</p>
                </div>
            </div>

            <ClientList clients={clients} />
        </div>
    );
}
