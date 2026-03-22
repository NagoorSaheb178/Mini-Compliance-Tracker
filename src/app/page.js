import Link from 'next/link';
import { ArrowRight, Users, CheckSquare, AlertCircle } from 'lucide-react';
import dbConnect from '@/lib/mongodb';
import Client from '@/models/Client';
import Task from '@/models/Task';

export default async function Home() {
  await dbConnect();

  const clientCount = await Client.countDocuments();
  const taskCount = await Task.countDocuments();
  const overdueCount = await Task.countDocuments({
    status: 'Pending',
    due_date: { $lt: new Date() }
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome Back</h2>
        <p className="text-zinc-500 dark:text-zinc-400">Here's an overview of your compliance tracking.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 sm:p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 ease-in-out hover:-translate-y-1 active:scale-95 touch-manipulation flex flex-col items-center justify-center text-center">
          <Users className="w-8 h-8 text-blue-500 mb-3" />
          <div className="text-3xl font-bold">{clientCount}</div>
          <div className="text-sm font-medium text-zinc-500 mt-1 uppercase tracking-wider">Total Clients</div>
        </div>

        <div className="p-5 sm:p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 ease-in-out hover:-translate-y-1 active:scale-95 touch-manipulation flex flex-col items-center justify-center text-center">
          <CheckSquare className="w-8 h-8 text-green-500 mb-3" />
          <div className="text-3xl font-bold">{taskCount}</div>
          <div className="text-sm font-medium text-zinc-500 mt-1 uppercase tracking-wider">Total Tasks</div>
        </div>

        <div className="p-5 sm:p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 ease-in-out hover:-translate-y-1 active:scale-95 touch-manipulation flex flex-col items-center justify-center text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mb-3" />
          <div className="text-3xl font-bold text-red-600 dark:text-red-400">{overdueCount}</div>
          <div className="text-sm font-medium text-zinc-500 mt-1 uppercase tracking-wider">Overdue Tasks</div>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Link
          href="/clients"
          prefetch={true}
          className="inline-flex w-full md:w-auto items-center justify-center px-6 py-4 rounded-xl bg-zinc-900 text-white font-semibold shadow-sm hover:bg-zinc-800 hover:shadow dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-all duration-200 active:scale-95 touch-manipulation"
        >
          View All Clients
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
