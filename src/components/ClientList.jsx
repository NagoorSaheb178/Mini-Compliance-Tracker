'use client';
import Link from 'next/link';

export default function ClientList({ clients }) {
    if (!clients || clients.length === 0) {
        return <div className="text-zinc-500">No clients found.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map(client => (
                <Link
                    key={client._id}
                    href={`/client/${client._id}`}
                    prefetch={true}
                    className="block p-5 sm:p-6 bg-white border border-zinc-200 rounded-xl shadow-sm hover:border-zinc-300 hover:shadow-md transition-all duration-200 ease-in-out hover:-translate-y-1 active:scale-95 touch-manipulation dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-600"
                >
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                        {client.company_name}
                    </h3>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400 flex flex-col gap-1">
                        <p><span className="font-medium mr-1">Country:</span>{client.country}</p>
                        <p><span className="font-medium mr-1">Type:</span>{client.entity_type}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
